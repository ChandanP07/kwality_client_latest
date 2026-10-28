'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  { text: "Kwality Enterprise set up 15 printers across our Mumbai offices in under 48 hours. The maintenance is hassle-free — we haven't had a single day of downtime. Truly professional service.", author: 'Aparna Sharan', company: 'Social Pipal' },
  { text: "We switched from buying to renting our office printers and saved nearly 40% annually. The team handles everything — from installation to toner refills. Can't recommend them enough.", author: 'Saurabh Mishra', company: 'Eiosys Pvt Ltd' },
  { text: "For our production house, reliable printing is non-negotiable. Kwality Enterprise's enterprise machines handle our high-volume needs perfectly. Their same-day support is a lifesaver.", author: 'Deepak Suvarna', company: 'On Demand App' },
];

const fadeUp = { hidden: { opacity: 0, y: 16, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Trusted by <span className="text-coral">Leading Businesses</span>
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-coral hover:text-white transition-colors hidden md:flex">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-coral hover:text-white transition-colors hidden md:flex">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
              <Quote className="w-10 h-10 text-coral/30 mb-4" />
              <p className="text-lg text-foreground leading-relaxed mb-6">&ldquo;{testimonials[currentIndex].text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coral/15 flex items-center justify-center">
                  <span className="text-coral font-bold">{testimonials[currentIndex].author.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-sm">{testimonials[currentIndex].author}</h4>
                  <p className="text-muted-foreground text-xs">{testimonials[currentIndex].company}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex ? 'bg-coral' : 'bg-muted-foreground/30'}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
