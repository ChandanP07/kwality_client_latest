'use client';

// app/login/page.tsx (client app)
// Updated to pass `identifier` instead of `email` to match the new
// unified CredentialsProvider in auth.ts which accepts both username
// and email in a single field.

import React, { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Printer,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  Users,
  TrendingUp,
  Shield,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ identifier: '', password: '' });

  const error = searchParams?.get('error');
  const callbackUrl = searchParams?.get('callbackUrl') || '/clients/dashboard';
  

  // Already logged in → go to dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.onboarded === false) {
        router.push('/onboarding');
      } else {
        router.push('/clients/dashboard');
      }
    }
  }, [status, session, router]);

  // Surface NextAuth errors
  useEffect(() => {
    if (!error) return;
    const messages: Record<string, string> = {
      OAuthAccountNotLinked: 'This email is already registered with a different sign-in method.',
      AccessDenied: 'Access denied.',
      WrongPortal: 'Admin accounts cannot access the client portal.',
      CredentialsSignin: 'Invalid email or password.',
    };
    toast.error(messages[error] ?? 'Authentication error. Please try again.');
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      toast.error('Please enter your email and password.');
      return;
    }
    const payload = {
    email: formData.identifier.trim(),
    password: formData.password,
    redirect: false,
    callbackUrl,
    };
    console.log('Submitting credentials to NextAuth:', payload);
    setLoading(true);
    try {
      const result = await signIn('credentials',payload)

      // console.log("CALLBACKURL :",callbackUrl)
      if (result?.error) {
        // NextAuth passes the thrown error message through result.error
        toast.error(result.error.replace('Error: ', ''));
      } else if (result?.ok) {
        toast.success('Welcome back!');
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn('google', { callbackUrl, redirect: true });
    } catch {
      toast.error('Failed to sign in with Google.');
      setGoogleLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left: Login form ── */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Printer className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">PrintCare</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
            <p className="text-gray-600">
              Manage your printers, orders and complaints.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as any)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-all"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as any)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-all"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-gray-900 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleSubmit}
              disabled={loading || googleLoading}
              className="w-full py-3.5 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
            >
              {loading ? (
                <><Loader2 className="h-5 w-5 animate-spin mr-2" />Logging in...</>
              ) : (
                'Login'
              )}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Google sign-in */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-4"
          >
            {googleLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </>
            )}
          </motion.button>

          {/* Register link */}
          <p className="text-center text-sm text-gray-600">
            New to PrintCare?{' '}
            <a href="/register" className="text-gray-900 font-medium hover:underline">
              Create an account
            </a>
          </p>
        </motion.div>
      </div>

      {/* ── Right: Illustration ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-12 relative overflow-hidden"
      >
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-30" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-indigo-200 rounded-full opacity-30" />

        <div className="relative z-10 text-center max-w-lg">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="relative mx-auto w-64 h-64 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Printer className="h-10 w-10 text-white" />
                </div>
                <p className="font-semibold text-gray-900 text-lg">PrintCare Portal</p>
                <p className="text-sm text-gray-500 mt-1">Your print management hub</p>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl"
              >
                <Users className="h-7 w-7 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-2 -right-6 w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl"
              >
                <TrendingUp className="h-7 w-7 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-8 w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-xl"
              >
                <Shield className="h-7 w-7 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Everything in one place
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Orders, complaints, bills and assets — all managed from your dashboard.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {['Real-time tracking', 'Instant invoices', 'Complaint management'].map((f, i) => (
              <span key={i} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-md">
                <CheckCircle2 className="inline h-4 w-4 text-green-500 mr-1" />
                {f}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
