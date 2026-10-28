// src/middleware.ts (client app)
//
// Three jobs:
//   1. Block unauthenticated users from /clients/* → redirect to /login
//   2. Block non-CLIENT roles from /clients/* → redirect to /login
//   3. Block un-onboarded users from /clients/* → redirect to /onboarding
//
// The /onboarding route itself is always accessible to logged-in users
// so they can complete setup.

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If no token at all, withAuth already redirects to signIn page.
    // We only reach here when a token exists.

    // Block admin/staff from accessing client portal
    const role = token?.role as string | undefined;
    if (
      pathname.startsWith('/clients') &&
      role &&
      !['CLIENT'].includes(role)
    ) {
      // Admin accidentally hitting the client URL → redirect to login
      return NextResponse.redirect(new URL('/login?error=WrongPortal', req.url));
    }

    // Block un-onboarded clients from the dashboard
    // Allow /onboarding itself through so they can complete setup
    const onboarded = token?.onboarded as boolean | undefined;
    if (
      pathname.startsWith('/clients') &&
      onboarded === false
    ) {
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }

    // Allow already-onboarded users trying to visit /onboarding
    // to skip it and go straight to dashboard
    if (pathname === '/onboarding' && onboarded === true) {
      return NextResponse.redirect(new URL('/clients/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true = let the middleware function above run
      // Return false = redirect to signIn immediately
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // /onboarding needs a logged-in user (but not necessarily onboarded)
        if (pathname === '/onboarding') {
          return !!token;
        }

        // /clients/* needs a logged-in user
        if (pathname.startsWith('/clients')) {
          return !!token;
        }

        // Everything else (landing page, login, register) is public
        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  // Run middleware on client dashboard routes AND the onboarding page
  matcher: ['/clients/:path*', '/onboarding'],
};