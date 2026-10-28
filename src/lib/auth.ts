import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { prompt: 'consent', access_type: 'offline', response_type: 'code' },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'CLIENT',   // ← uppercase enum value
          onboarded: false, // ← required field
        };
      },
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user)            throw new Error('No user found with this email');
        if (!user.isActive)   throw new Error('Account is deactivated. Contact support');

        if (user.lockedUntil && user.lockedUntil > new Date()) {
          const mins = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
          throw new Error(`Account locked. Try again in ${mins} minutes`);
        }

        if (!user.password) throw new Error('Please sign in with Google');

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) {
          const attempts = user.loginAttempts + 1;
          if (attempts >= MAX_LOGIN_ATTEMPTS) {
            await prisma.user.update({
              where: { id: user.id },
              data: { loginAttempts: attempts, lockedUntil: new Date(Date.now() + LOCK_TIME) },
            });
            throw new Error('Too many failed attempts. Account locked for 15 minutes');
          }
          await prisma.user.update({ where: { id: user.id }, data: { loginAttempts: attempts } });
          throw new Error(`Invalid password. ${MAX_LOGIN_ATTEMPTS - attempts} attempts remaining`);
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { loginAttempts: 0, lockedUntil: null, lastLogin: new Date() },
        });

        return {
          id:        user.id,
          email:     user.email,
          name:      user.name,
          role:      user.role,
          image:     user.image,
          onboarded: user.onboarded, // ← read from DB
        };
      },
    }),
  ],

  pages: {
    signIn:  '/login',
    error:   '/login',
    newUser: '/onboarding', // ← new Google users land here automatically
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existing = await prisma.user.findUnique({ where: { email: user.email! } });
        if (existing) {
          await prisma.user.update({
            where: { id: existing.id },
            data: {
              name:          user.name  || existing.name,
              image:         user.image || existing.image,
              emailVerified: new Date(),
              lastLogin:     new Date(),
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, user, account, trigger, session }) {
      // First login — embed everything
      if (user) {
        token.id        = user.id;
        token.role      = user.role;
        token.email     = user.email!;
        token.name      = user.name;
        token.image     = user.image;
        token.onboarded = (user as any).onboarded ?? false;
      }

      if (account) token.provider = account.provider;

      // Google users: PrismaAdapter doesn't pass custom fields through user object,
      // so fetch onboarded from DB if it's missing on the token
      if (token.id && token.onboarded === undefined) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { onboarded: true, role: true },
        });
        if (dbUser) {
          token.onboarded = dbUser.onboarded;
          token.role      = dbUser.role;
        }
      }

      // Called from onboarding page after completing setup:
      // await update({ onboarded: true })
      if (trigger === 'update' && session?.onboarded !== undefined) {
        token.onboarded = session.onboarded;
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id        = token.id       as string;
        session.user.role      = token.role     as string;
        session.user.onboarded = token.onboarded as boolean;
        session.user.provider  = token.provider as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/clients/dashboard`;
    },
  },

  session: {
    strategy:  'jwt',
    maxAge:    30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  events: {
    async signIn({ user }) {
      if (user.email) {
        await prisma.user.update({
          where: { email: user.email },
          data:  { lastLogin: new Date() },
        }).catch(() => {});
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};