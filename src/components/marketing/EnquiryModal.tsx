'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

const EnquiryModal = ({ isOpen, onClose, preselectedProduct }: EnquiryModalProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    printerName: preselectedProduct || '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (preselectedProduct) {
      setFormData(prev => ({ ...prev, printerName: preselectedProduct }));
    }
  }, [preselectedProduct]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setApiError('');
      // If not logged in, redirect to login
      if (!session) {
        onClose();
        const returnUrl = encodeURIComponent(window.location.pathname);
        router.push(`/login?callbackUrl=${returnUrl}`);
      }
    }
  }, [isOpen, session, router, onClose]);

  if (!isOpen || !session) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Enter a valid 10-digit number';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setFormData({ name: '', email: '', phone: '', company: '', printerName: '', message: '' });
          setSubmitted(false);
        }, 2500);
      } else {
        const data = await res.json();
        setApiError(data.error || 'Failed to submit enquiry');
      }
    } catch {
      setApiError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Enquiry Submitted!</h3>
            <p className="text-muted-foreground text-sm">We&apos;ll call you within 2 business hours.</p>
          </div>
        ) : (
          <div className="p-8">
            <h2 className="text-xl font-bold text-foreground mb-1">Enquire Now</h2>
            <p className="text-muted-foreground text-sm mb-6">
              {preselectedProduct ? `Enquiry for: ${preselectedProduct}` : 'Get a custom rental quote for your office'}
            </p>

            {apiError && <p className="text-destructive text-sm mb-4 p-3 bg-destructive/10 rounded-lg">{apiError}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input placeholder="Full Name *" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="rounded-lg" />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <Input placeholder="Phone Number *" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-lg" />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Input placeholder="Email Address" type="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-lg" />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <Input placeholder="Company Name" value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="rounded-lg" />
              </div>
              <div>
                <Input placeholder="Printer of Interest (optional)" value={formData.printerName}
                  onChange={(e) => setFormData({ ...formData, printerName: e.target.value })} className="rounded-lg" />
              </div>
              <div>
                <Textarea placeholder="Tell us about your requirements..." rows={3} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="rounded-lg" />
              </div>
              <Button type="submit" disabled={loading}
                className="w-full bg-coral hover:bg-coral/90 text-white rounded-full font-semibold active:scale-[0.97] transition-transform">
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Or call us: <a href="tel:+919819033222" className="text-coral font-semibold hover:underline">+91 98190 33222</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
