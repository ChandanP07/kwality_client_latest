'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EnquiryModal from './EnquiryModal';

const fadeUp = { hidden: { opacity: 0, y: 16, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };

const CTASection = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  return (
    <>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-foreground mb-4" style={{ lineHeight: '1.2' }}>
              Ready to upgrade your office printing?
            </h2>
            <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">
              Get a tailored printer rental solution with free installation, maintenance, and same-day support.
            </p>
            <Button onClick={() => setEnquiryOpen(true)}
              className="bg-coral hover:bg-coral/90 text-white px-10 py-3 rounded-full font-semibold active:scale-[0.97] transition-transform">
              Get a Custom Quote
            </Button>
          </motion.div>
        </div>
      </section>
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
};

export default CTASection;
