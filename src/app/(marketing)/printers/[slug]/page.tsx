'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight, ChevronLeft, Check, Phone, MessageCircle,
  Minus, Plus, Star, MapPin, Clock, Shield, Package, FileText,
} from 'lucide-react';
import { getPrinterBySlug, printers } from '@/lib/printers';
import EnquiryModal from '@/components/marketing/EnquiryModal';
import Header from '@/components/marketing/Header';
import Footer from '@/components/marketing/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const extraImages: Record<string, string[]> = {
  'konica-c50i': ['/printers/konica-c50i.png', '/printers/ricoh-imc3000.png', '/printers/canon-dx4745i.png'],
  'ricoh-imc3000': ['/printers/ricoh-imc3000.png', '/printers/konica-c50i.png', '/printers/canon-dx4745i.png'],
  'canon-dx4745i': ['/printers/canon-dx4745i.png', '/printers/canon-2643if.png', '/printers/xerox-b405.png'],
  'xerox-b405': ['/printers/xerox-b405.png', '/printers/hp-m578dn.png', '/printers/canon-2643if.png'],
};

function getImages(slug: string, mainImage: string): string[] {
  return extraImages[slug] || [mainImage];
}

function SectionHeading({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-gray-100 my-14" />;
}

export default function PrinterDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const printer = getPrinterBySlug(slug);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [imgDir, setImgDir] = useState(1);
  const [qty, setQty] = useState(1);
  const [activeVersion, setActiveVersion] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!printer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Printer not found.</p>
        <Link href="/printers" className="text-blue-600 hover:underline">← Back to printers</Link>
      </div>
    );
  }

  const images = getImages(slug, printer.images[0]);
  const basePrice = parseInt(printer.price.replace(/[^0-9]/g, ''));
  const versionAdd = printer.versions[activeVersion]?.priceAdd || 0;
  const totalPrice = (basePrice + versionAdd) * qty;
  const avgRating = printer.reviews.length
    ? printer.reviews.reduce((s, r) => s + r.rating, 0) / printer.reviews.length
    : 0;

  const goImg = (dir: number) => {
    setImgDir(dir);
    setActiveImg((prev) => (prev + dir + images.length) % images.length);
  };

  const related = printers
    .filter((p) => p.category === printer.category && p.slug !== printer.slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">

        {/* Breadcrumb */}
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link href="/printers" className="hover:text-gray-900">Printers</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link href={`/printers?category=${printer.category}`} className="hover:text-gray-900 capitalize">
              {printer.category === 'desktop' ? 'Desktop' : printer.category === 'office' ? 'Office MFP' : 'Enterprise'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{printer.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">

          {/* ══════════════════════════════════════
              SECTION 1 — Image + Buy Box (sticky)
          ══════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">

            {/* Image slider */}
            <div className="lg:sticky lg:top-6">
              <div
                className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
                style={{ height: 480 }}
              >
                <AnimatePresence custom={imgDir} mode="wait">
                  <motion.img
                    key={activeImg}
                    custom={imgDir}
                    initial={{ x: imgDir > 0 ? 80 : -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: imgDir < 0 ? 80 : -80, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    src={images[activeImg]}
                    alt={printer.name}
                    className="select-none pointer-events-none p-10"
                    style={{
                      maxHeight: 420,
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.18))',
                    }}
                  />
                </AnimatePresence>
                {images.length > 1 && (
                  <>
                    <button onClick={() => goImg(-1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all">
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <button onClick={() => goImg(1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all">
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 right-4 bg-black/40 text-white text-xs font-semibold px-2.5 py-1 rounded-full tabular-nums">
                  {activeImg + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4 justify-center">
                  {images.map((img, i) => (
                    <button key={i}
                      onClick={() => { setImgDir(i > activeImg ? 1 : -1); setActiveImg(i); }}
                      className={`rounded-xl border-2 flex items-center justify-center bg-gray-50 p-2 transition-all ${
                        i === activeImg ? 'border-blue-600 shadow-md' : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{ width: 68, height: 68 }}>
                      <img src={img} alt="" className="max-h-12 max-w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buy box */}
            <div>
              {/* Badges + rating */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-widest text-white bg-blue-700 px-3 py-1 rounded-full">
                  {printer.brand}
                </span>
                {printer.spec.split(' | ').map((s) => (
                  <span key={s} className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{s}</span>
                ))}
                {avgRating > 0 && (
                  <div className="flex items-center gap-1 ml-auto">
                    {[1,2,3,4,5].map((n) => (
                      <Star key={n} className={`w-3.5 h-3.5 ${n <= Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({printer.reviews.length})</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-1"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
                {printer.name}
              </h1>
              <p className="text-gray-500 text-base mb-6">{printer.tagline}</p>

              {/* Version selector */}
              <div className="mb-5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Select Version</p>
                <div className="flex flex-col gap-2">
                  {printer.versions.map((v, i) => (
                    <button key={v.id} onClick={() => setActiveVersion(i)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        i === activeVersion ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <div>
                        <p className={`font-semibold text-sm ${i === activeVersion ? 'text-blue-700' : 'text-gray-800'}`}>{v.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{v.desc}</p>
                      </div>
                      <div className="flex-shrink-0 ml-4 text-right">
                        {v.priceAdd > 0 && <p className="text-xs text-gray-500">+₹{v.priceAdd}/mo</p>}
                        {i === activeVersion && (
                          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center ml-auto mt-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Number of Printers</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900 text-lg tabular-nums">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)}
                      className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    {qty >= 10 ? '🎉 Enterprise discount applies' : qty >= 5 ? '👍 Fleet pricing available' : 'Increase for fleet discount'}
                  </p>
                </div>
              </div>

              {/* Live cost calculator */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 mb-5 text-white">
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Estimated Monthly Cost</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-black tabular-nums">₹{totalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-blue-200 text-sm">/month</span>
                </div>
                <p className="text-blue-200 text-xs mb-2">
                  {printer.price}/printer × {qty} {qty > 1 ? 'printers' : 'printer'}
                  {versionAdd > 0 && ` + ₹${versionAdd} (${printer.versions[activeVersion].label})`}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-blue-100 font-medium">
                  {['Toner', 'Maintenance', 'Delivery & Setup', 'GST Invoice'].map((t) => (
                    <span key={t}>✓ {t}</span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <button onClick={() => setEnquiryOpen(true)}
                  className="flex-1 bg-[#0096D6] hover:bg-[#007ab8] text-white font-bold py-4 px-6 rounded-xl transition-colors text-sm">
                  Enquire Now — Get Exact Quote
                </button>
                <a href="tel:+919819033222"
                  className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-400 text-gray-700 font-semibold py-4 px-5 rounded-xl transition-colors text-sm">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a href="https://wa.me/919819033222" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-5 rounded-xl transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { icon: '🚚', t: 'Free Delivery & Setup' },
                  { icon: '🔧', t: 'Toner & Maintenance' },
                  { icon: '📄', t: 'GST Invoice' },
                ].map((b) => (
                  <div key={b.t} className="text-center text-xs text-gray-500 bg-gray-50 rounded-xl py-3">
                    <div className="text-xl mb-1">{b.icon}</div>{b.t}
                  </div>
                ))}
              </div>

              {/* Availability + SLA */}
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Available in:</strong> {printer.availability.join(' · ')}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Setup:</strong> {printer.setupTimeline}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong>SLA:</strong> {printer.sla}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              SECTION 2 — About + Key Features
          ══════════════════════════════════════ */}
          <SectionHeading
            icon={<FileText className="w-5 h-5 text-blue-600" />}
            title="About this printer"
            subtitle="Everything you need to know before renting"
          />
          <div className="grid md:grid-cols-2 gap-10 mb-6">
            <div>
              <p className="text-gray-600 leading-relaxed text-sm">{printer.description}</p>
              <div className="mt-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Ideal For</p>
                <div className="flex flex-wrap gap-2">
                  {printer.idealFor.map((tag) => (
                    <span key={tag} className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Key Features</p>
              <ul className="space-y-2">
                {printer.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Divider />

          {/* ══════════════════════════════════════
              SECTION 3 — Full Technical Specs
          ══════════════════════════════════════ */}
          <SectionHeading
            icon={<FileText className="w-5 h-5 text-blue-600" />}
            title="Technical specifications"
            subtitle="Full spec sheet including paper sizes, toner, dimensions, power and noise"
          />
          <div className="space-y-8">
            {printer.fullSpecs.map((group) => (
              <div key={group.group}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{group.group}</p>
                <div className="rounded-2xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {group.rows.map((s, i) => (
                        <tr key={s.label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3.5 px-6 font-semibold text-gray-600 w-2/5 md:w-1/3">{s.label}</td>
                          <td className="py-3.5 px-6 text-gray-800">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <Divider />

          {/* ══════════════════════════════════════
              SECTION 4 — What's Included
          ══════════════════════════════════════ */}
          <SectionHeading
            icon={<Package className="w-5 h-5 text-blue-600" />}
            title="What's included in your rental"
            subtitle="No hidden costs. No surprise bills. Everything below is covered in your monthly price."
          />
          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
            {printer.whatsIncluded.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-gray-800 text-sm font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <Divider />

          {/* ══════════════════════════════════════
              SECTION 5 — Rental Terms
          ══════════════════════════════════════ */}
          <SectionHeading
            icon={<FileText className="w-5 h-5 text-blue-600" />}
            title="Rental terms"
            subtitle="Simple, transparent terms. No surprises."
          />
          <div className="max-w-2xl">
            <div className="rounded-2xl border border-gray-200 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <tbody>
                  {printer.rentalTerms.map((t, i) => (
                    <tr key={t.label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-4 px-6 font-semibold text-gray-700 w-2/5">{t.label}</td>
                      <td className="py-4 px-6 text-gray-800">{t.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-blue-900 mb-1">Setup & Delivery</p>
                <p className="text-sm text-blue-700">{printer.setupTimeline}</p>
              </div>
            </div>
          </div>

          <Divider />

          {/* ══════════════════════════════════════
              SECTION 6 — FAQs
          ══════════════════════════════════════ */}
          <SectionHeading
            icon={<MessageCircle className="w-5 h-5 text-blue-600" />}
            title={`Frequently asked questions (${printer.faqs.length})`}
            subtitle="Common questions about this printer and our rental service"
          />
          <div className="max-w-2xl space-y-3">
            {printer.faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                  <span className={`text-xl flex-shrink-0 text-gray-400 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <Divider />

          {/* ══════════════════════════════════════
              SECTION 7 — Reviews
          ══════════════════════════════════════ */}
          <SectionHeading
            icon={<Star className="w-5 h-5 text-blue-600" />}
            title="Customer reviews"
            subtitle="From real businesses using this printer through Kwality Enterprise"
          />
          <div className="max-w-3xl">
            {printer.reviews.length > 0 ? (
              <>
                {/* Rating summary bar */}
                <div className="flex items-center gap-8 mb-8 p-6 bg-gray-50 rounded-2xl">
                  <div className="text-center flex-shrink-0">
                    <div className="text-5xl font-black text-gray-900 tabular-nums">{avgRating.toFixed(1)}</div>
                    <div className="flex justify-center mt-1.5 gap-0.5">
                      {[1,2,3,4,5].map((n) => (
                        <Star key={n} className={`w-4 h-4 ${n <= Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{printer.reviews.length} review{printer.reviews.length > 1 ? 's' : ''}</div>
                  </div>
                  <div className="flex-1">
                    {[5,4,3,2,1].map((star) => {
                      const count = printer.reviews.filter((r) => r.rating === star).length;
                      const pct = printer.reviews.length ? (count / printer.reviews.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs text-gray-500 w-2 text-right">{star}</span>
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-amber-400 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-gray-400 w-3">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review cards */}
                <div className="space-y-4">
                  {printer.reviews.map((review, i) => (
                    <div key={i} className="p-6 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm flex-shrink-0">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                            <p className="text-xs text-gray-500">{review.company}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map((n) => (
                              <Star key={n} className={`w-3.5 h-3.5 ${n <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-10 text-center border border-dashed border-gray-200 rounded-2xl">
                <p className="text-gray-400 text-sm">No reviews yet for this printer.</p>
                <p className="text-gray-400 text-xs mt-1">Be the first to rent it and share your experience.</p>
              </div>
            )}
          </div>

          {/* ══════════════════════════════════════
              Bottom CTA strip
          ══════════════════════════════════════ */}
          <div className="mt-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-black text-xl md:text-2xl mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Ready to rent the {printer.name}?
              </h3>
              <p className="text-blue-200 text-sm">
                Starting at {printer.price}/month · Delivered in {printer.setupTimeline.split('.')[0].toLowerCase()}
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button onClick={() => setEnquiryOpen(true)}
                className="bg-white text-blue-700 font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-blue-50 transition-colors">
                Get a Quote
              </button>
              <a href="https://wa.me/919819033222" target="_blank" rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════
              Related printers
          ══════════════════════════════════════ */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Similar printers
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.slug} href={`/printers/${p.slug}`}
                    className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-200 flex flex-col">
                    <div className="bg-gray-50 flex items-center justify-center p-6" style={{ height: 180 }}>
                      <img src={p.images[0]} alt={p.name}
                        className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }} />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex gap-1 mb-2 flex-wrap">
                        {p.spec.split(' | ').map((s) => (
                          <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">{s}</span>
                        ))}
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{p.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{p.tagline}</p>
                      <p className="text-blue-700 font-black text-lg mt-auto">
                        {p.price}<span className="text-gray-400 font-normal text-xs">/mo</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        preselectedProduct={`${printer.name} × ${qty} (${printer.versions[activeVersion]?.label || 'Standard'})`}
      />
    </>
  );
}