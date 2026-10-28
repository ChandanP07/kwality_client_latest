'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EnquiryModal from './EnquiryModal';

const slides = [
  {
    id: 1,
    slug: 'brother-hl-l5200dw',
    category: 'desktop',
    categoryLabel: 'Desktop Printers',
    headline: 'Compact Printers\nfor Small Offices',
    subtext: 'Efficient A4 printing for your growing team. Delivered and maintained.',
    cta: 'Explore Desktop Printers',
    href: '/printers?category=desktop',
    image: '/printers/brother-hl-l5200dw.png',
    accent: '#0096D6',
    bgFrom: '#EFF6FF',
    bgTo: '#DBEAFE',
    price: 'from ₹1,200/mo',
  },
  {
    id: 2,
    slug: 'canon-2643if',
    category: 'office',
    categoryLabel: 'Office MFP',
    headline: 'Multifunction Printers\nfor Busy Teams',
    subtext: 'Print, scan, copy and fax — all in one machine. Zero downtime guaranteed.',
    cta: 'Explore Office Printers',
    href: '/printers?category=office',
    image: '/printers/canon-2643if.png',
    accent: '#003087',
    bgFrom: '#EEF2FF',
    bgTo: '#E0E7FF',
    price: 'from ₹2,200/mo',
  },
  {
    id: 3,
    slug: 'konica-c50i',
    category: 'enterprise',
    categoryLabel: 'Enterprise Fleet',
    headline: 'Enterprise Machines\nfor Large Corporates',
    subtext: 'A3 color floor-mount machines. High volume, consistent output, full support.',
    cta: 'Explore Enterprise Printers',
    href: '/printers?category=enterprise',
    image: '/printers/konica-c50i.png',
    accent: '#0F6E56',
    bgFrom: '#F0FDF4',
    bgTo: '#DCFCE7',
    price: 'from ₹4,500/mo',
  },
  {
    id: 4,
    slug: 'ricoh-imc3000',
    category: 'enterprise',
    categoryLabel: 'Color Enterprise',
    headline: 'Smart Color Printing\nfor Modern Offices',
    subtext: 'Cloud-connected, workflow-ready. Consistent color output with smart automation.',
    cta: 'View the Ricoh IM C3000',
    href: '/printers/ricoh-imc3000',
    image: '/printers/ricoh-imc3000.png',
    accent: '#7C3AED',
    bgFrom: '#F5F3FF',
    bgTo: '#EDE9FE',
    price: 'from ₹4,200/mo',
  },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
};

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 5500);
    return () => clearInterval(t);
  }, [go, paused]);

  const slide = slides[index];

  return (
    <>
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: 620 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            {/* Background */}
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)`,
                minHeight: 620,
              }}
            >
              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: slide.accent }} />

              <div className="container mx-auto px-6 md:px-12 h-full flex items-center" style={{ minHeight: 620 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full py-16">

                  {/* LEFT — Text */}
                  <div className="order-2 md:order-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="text-xs font-bold uppercase tracking-widest text-white px-3 py-1.5 rounded-full"
                        style={{ background: slide.accent }}
                      >
                        {slide.categoryLabel}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: slide.accent }}>
                        {slide.price}
                      </span>
                    </div>

                    <h1
                      className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.08] mb-5"
                      style={{ whiteSpace: 'pre-line', fontFamily: "'Outfit', sans-serif" }}
                    >
                      {slide.headline}
                    </h1>

                    <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                      {slide.subtext}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={slide.href}
                        className="inline-flex items-center gap-2 text-white font-bold text-sm px-7 py-4 rounded-full uppercase tracking-wide transition-opacity hover:opacity-90"
                        style={{ background: slide.accent }}
                      >
                        {slide.cta}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setEnquiryOpen(true)}
                        className="inline-flex items-center gap-2 text-gray-700 font-bold text-sm px-7 py-4 rounded-full uppercase tracking-wide border-2 border-gray-300 hover:border-gray-500 transition-colors bg-white/60"
                      >
                        Get a Quote
                      </button>
                    </div>

                    {/* Trust pills */}
                    <div className="flex flex-wrap gap-2 mt-8">
                      {['Free Installation', 'Toner Included', 'Same-Day Support', 'GST Invoice'].map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-white/70 text-gray-600 border border-white"
                        >
                          ✓ {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT — Printer image, BIG */}
                  <div className="order-1 md:order-2 flex items-center justify-center relative">
                    {/* Decorative circle behind printer */}
                    <div
                      className="absolute rounded-full opacity-20"
                      style={{
                        width: 420,
                        height: 420,
                        background: slide.accent,
                        filter: 'blur(60px)',
                      }}
                    />
                    <motion.img
                      key={slide.image}
                      initial={{ opacity: 0, scale: 0.92, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      src={slide.image}
                      alt={slide.headline}
                      className="relative z-10 select-none pointer-events-none"
                      style={{
                        width: '100%',
                        maxWidth: 480,
                        height: 420,
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.22))',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons */}
        <button
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? 28 : 8,
                height: 8,
                background: i === index ? slide.accent : '#d1d5db',
              }}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute top-6 right-16 z-20 text-xs font-bold text-gray-400 tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>

      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}