'use client';

// app/onboarding/page.tsx
// Shown to new CLIENT users after their first login (Google or email).
// They must fill in firmName + industry before accessing the dashboard.
// On submit → calls POST /api/client/onboarding → updates session token
// → middleware stops redirecting → sends user to /clients/dashboard

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Printer,
  Building2,
  Briefcase,
  Phone,
  ArrowRight,
  Loader2,
  CheckCircle2,
  LogOut,
} from 'lucide-react';

const INDUSTRIES = [
  'Accounting & Finance',
  'Architecture & Construction',
  'Automotive',
  'Banking & Insurance',
  'Education & Training',
  'Government & Public Sector',
  'Healthcare & Pharmaceuticals',
  'Hospitality & Tourism',
  'IT & Software',
  'Legal & Compliance',
  'Logistics & Supply Chain',
  'Manufacturing',
  'Media & Advertising',
  'Real Estate',
  'Retail & E-commerce',
  'Telecommunications',
  'Textile & Garments',
  'Other',
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export default function OnboardingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1); // 1 = firm details, 2 = success
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firmName: '',
    industry: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // If already onboarded, skip straight to dashboard
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.onboarded) {
      router.replace('/clients/dashboard');
    }
  }, [status, session, router]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firmName.trim()) newErrors.firmName = 'Firm name is required';
    if (formData.firmName.trim().length < 2) newErrors.firmName = 'Firm name must be at least 2 characters';
    if (!formData.industry) newErrors.industry = 'Please select an industry';
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/client/onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firmName: formData.firmName.trim(),
          industry: formData.industry,
          phone: formData.phone.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong. Please try again.');
        return;
      }

      // Refresh the JWT so onboarded: true is reflected immediately
      await update({ onboarded: true });

      setStep(2);

      // Auto-redirect after showing success screen
      setTimeout(() => {
        router.replace('/clients/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Onboarding error:', err);
      toast.error('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Printer className="h-6 w-6 text-white" />
          </div>
          <span className="text-white font-bold text-xl">PrintCare</span>
        </div>

        {/* Main copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Welcome to your print management hub
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              Just one quick step to set up your account. We'll personalise your dashboard based on your business.
            </p>

            {/* Feature pills */}
            <div className="flex flex-col gap-3">
              {[
                { icon: '📦', text: 'Track orders in real time' },
                { icon: '🛠️', text: 'Raise & monitor complaints' },
                { icon: '🧾', text: 'Download invoices instantly' },
                { icon: '🖨️', text: 'Manage all your printers' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Step indicator */}
        <div className="relative z-10 flex items-center gap-2">
          <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
          <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Printer className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">PrintCare</span>
          </div>

          <AnimatePresence mode="wait">
            {/* ── Step 1: Firm details form ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Greeting */}
                <div className="mb-8">
                  {session?.user?.image && (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-14 h-14 rounded-full mb-4 ring-4 ring-blue-100"
                    />
                  )}
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Hi, {session?.user?.name?.split(' ')[0] || 'there'}! 👋
                  </h2>
                  <p className="text-gray-500 text-base">
                    Tell us a bit about your business to complete your account setup.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Firm name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Firm / Company Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.firmName}
                        onChange={(e) => {
                          setFormData({ ...formData, firmName: e.target.value });
                          if (errors.firmName) setErrors({ ...errors, firmName: '' });
                        }}
                        placeholder="e.g. Acme Pvt. Ltd."
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-all
                          ${errors.firmName
                            ? 'border-red-400 focus:border-red-500 bg-red-50'
                            : 'border-gray-200 focus:border-blue-500 bg-white'
                          }`}
                      />
                    </div>
                    {errors.firmName && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.firmName}</p>
                    )}
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      <select
                        value={formData.industry}
                        onChange={(e) => {
                          setFormData({ ...formData, industry: e.target.value });
                          if (errors.industry) setErrors({ ...errors, industry: '' });
                        }}
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl text-gray-900 outline-none transition-all appearance-none bg-white
                          ${errors.industry
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gray-200 focus:border-blue-500'
                          }`}
                      >
                        <option value="">Select your industry</option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                    {errors.industry && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.industry}</p>
                    )}
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-all bg-white
                          ${errors.phone
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gray-200 focus:border-blue-500'
                          }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-200 mt-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Setting up your account...
                      </>
                    ) : (
                      <>
                        Get Started
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Sign out link */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1.5 mx-auto transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out and use a different account
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Success ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">You're all set!</h2>
                <p className="text-gray-500 text-lg mb-2">
                  Welcome to PrintCare, <strong>{formData.firmName}</strong>.
                </p>
                <p className="text-gray-400 text-sm">
                  Taking you to your dashboard...
                </p>
                <div className="mt-6 flex justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}