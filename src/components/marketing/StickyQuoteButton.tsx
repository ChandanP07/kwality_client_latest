'use client';
import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

const StickyQuoteButton = () => {
  const [visible, setVisible] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <button onClick={() => setEnquiryOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-coral text-white px-5 py-3 rounded-full shadow-lg hover:bg-coral/90 transition-all duration-300 flex items-center gap-2 text-sm font-semibold active:scale-[0.97]">
        <FileText className="w-4 h-4" />
        Get a Quote
      </button>
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
};

export default StickyQuoteButton;
