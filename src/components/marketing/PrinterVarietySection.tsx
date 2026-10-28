'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import EnquiryModal from './EnquiryModal';

const categories = [
  {
    key: 'desktop',
    title: 'Desktop / Compact Printers',
    subtitle: 'For startups, cabins, finance teams, admin desks.',
    printers: [
      {
        slug: 'brother-hl-l5200dw',
        name: 'Brother HL-L5200DW',
        image: '/printers/brother-hl-l5200dw.png',
        spec: 'A4 | Black & White',
        price: '₹1,200/- per month',
        features: ['Speed 35 PPM – A4/Legal', 'Duplex Print', '250 sheet input tray', 'Network Ready', '8000 page monthly duty cycle'],
      },
      {
        slug: 'hp-color-m455dw',
        name: 'HP Color LaserJet Pro M455dw',
        image: '/printers/hp-color-m455dw.png',
        spec: 'A4 | Color',
        price: '₹1,800/- per month',
        features: ['Speed 27 PPM – A4', 'Color LaserJet', 'Duplex Print', 'Wi-Fi & Network', '50,000 page duty cycle'],
      },
      {
        slug: 'canon-g6070',
        name: 'Canon PIXMA G6070',
        image: '/printers/canon-g6070.png',
        spec: 'A4 | Color Ink Tank',
        price: '₹1,200/- per month',
        features: ['Speed 13 PPM – Color', 'Ink Tank System', 'Wi-Fi & USB', 'Low cost per page', '12,000 page monthly duty cycle'],
      },
    ],
  },
  {
    key: 'office',
    title: 'Mid-Range Office Multifunction',
    subtitle: 'For shared teams and growing offices.',
    printers: [
      {
        slug: 'xerox-b405',
        name: 'Xerox VersaLink B405',
        image: '/printers/xerox-b405.png',
        spec: 'A4 | B&W MFP',
        price: '₹2,500/- per month',
        features: ['Speed 45 PPM – A4', 'Print, Scan, Copy, Fax', 'Touchscreen LCD Panel', 'Password Protection', '110,000 page duty cycle'],
      },
      {
        slug: 'hp-m578dn',
        name: 'HP LaserJet Enterprise M578dn',
        image: '/printers/hp-m578dn.png',
        spec: 'A4 | B&W MFP',
        price: '₹2,800/- per month',
        features: ['Speed 38 PPM – A4/Legal', 'Duplex Print, Scan, Copy', 'Network Ready', 'Scan to Email / PC / Folder', 'Password Protection'],
      },
      {
        slug: 'canon-2643if',
        name: 'Canon imageRUNNER 2643iF',
        image: '/printers/canon-2643if.png',
        spec: 'A4 | B&W MFP',
        price: '₹2,200/- per month',
        features: ['Speed 43 PPM – A4', 'Print, Scan, Copy, Fax', 'Touch-Screen LCD Panel', 'User-wise Copies Counter', '500 × 2 + 1000 sheet tray'],
      },
    ],
  },
  {
    key: 'enterprise',
    title: 'Floor-Mount / Enterprise Machines',
    subtitle: 'For corporates, logistics, legal, architecture.',
    printers: [
      {
        slug: 'konica-c50i',
        name: 'Konica Minolta bizhub C50i',
        image: '/printers/konica-c50i.png',
        spec: 'A3 | Color MFP',
        price: '₹4,500/- per month',
        features: ['Speed 50 PPM – A4 Color', 'Print, Scan, Copy, Fax', 'A3 Color Printing', 'Touchscreen UI', '150,000 page duty cycle'],
      },
      {
        slug: 'canon-dx4745i',
        name: 'Canon imageRUNNER DX 4745i',
        image: '/printers/canon-dx4745i.png',
        spec: 'A3 | B&W MFP',
        price: '₹3,800/- per month',
        features: ['Speed 45 PPM – A4', 'High-Volume Document', 'Print, Scan, Copy, Fax', 'User-wise Copies Counter', '500 × 2 + 1000 sheet tray'],
      },
      {
        slug: 'ricoh-imc3000',
        name: 'Ricoh IM C3000',
        image: '/printers/ricoh-imc3000.png',
        spec: 'A3 | Color MFP',
        price: '₹4,200/- per month',
        features: ['Speed 30 PPM – A4 Color', 'Smart Workflow Features', 'Print, Scan, Copy, Fax', 'Consistent Color Output', '150,000 page duty cycle'],
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

type Printer = {
  slug: string;
  name: string;
  image: string;
  spec: string;
  price: string;
  features: string[];
};

// Catalogue card — clicking the card goes to detail page
// "Enquire Now" button opens modal without navigating
const CatalogueCard = ({ printer, onEnquire }: { printer: Printer; onEnquire: (name: string) => void }) => (
  <Link
    href={`/printers/${printer.slug}`}
    className="relative rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer block"
    style={{ minHeight: 320 }}
  >
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
      <img
        src={printer.image}
        alt={printer.name}
        className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.2))' }}
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
      <h3 className="text-white font-bold text-lg leading-tight">{printer.name}</h3>
      <p className="text-blue-300 text-sm mt-1 font-medium">starts from {printer.price}</p>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEnquire(printer.name); }}
        className="mt-3 text-xs font-semibold bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full border border-white/40 transition-colors"
      >
        Enquire Now
      </button>
    </div>
    <div className="absolute top-3 right-3">
      <span className="bg-white/90 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
        {printer.spec}
      </span>
    </div>
  </Link>
);

// Detail card — whole card links to detail page, enquire button stops propagation
const DetailCard = ({ printer, onEnquire }: { printer: Printer; onEnquire: (name: string) => void }) => (
  <Link
    href={`/printers/${printer.slug}`}
    className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200 group flex flex-col block"
  >
    <div className="bg-gray-50 flex items-center justify-center p-6" style={{ minHeight: 200 }}>
      <img
        src={printer.image}
        alt={printer.name}
        className="max-h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}
      />
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex gap-1 flex-wrap mb-2">
        {printer.spec.split(' | ').map((s) => (
          <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">{s}</span>
        ))}
      </div>
      <h4 className="font-bold text-blue-700 text-base mb-3 leading-snug">{printer.name}</h4>
      <ul className="space-y-1.5 mb-4 flex-1">
        {printer.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5" />
            {f}
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-100 pt-4 mt-auto">
        <p className="text-coral font-bold text-sm mb-3">Rent @ start from {printer.price}</p>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEnquire(printer.name); }}
          className="w-full bg-coral text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-coral/90 transition-colors active:scale-[0.98]"
        >
          Enquire Now
        </button>
      </div>
    </div>
  </Link>
);

const tabs = ['All', 'Desktop', 'Office', 'Enterprise'];

const PrinterVarietySection = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [view, setView] = useState<'catalogue' | 'detail'>('catalogue');

  const openEnquiry = (printerName: string) => {
    setSelectedPrinter(printerName);
    setEnquiryOpen(true);
  };

  const filtered = categories.filter((c) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Desktop') return c.key === 'desktop';
    if (activeTab === 'Office') return c.key === 'office';
    if (activeTab === 'Enterprise') return c.key === 'enterprise';
    return true;
  });

  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">

          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <p className="text-coral font-semibold text-sm tracking-wider uppercase mb-2">Printer Catalogue</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Choose from Our Wide Printer Selection</h2>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-gray-200 pb-4">
            <div className="flex gap-1 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab ? 'bg-coral text-white' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setView('catalogue')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${view === 'catalogue' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Catalogue
              </button>
              <button
                onClick={() => setView('detail')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${view === 'detail' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Details
              </button>
            </div>
          </div>

          {filtered.map((category) => (
            <div key={category.key} className="mb-14 last:mb-0">
              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
                variants={fadeUp}
                className="mb-6"
              >
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{category.subtitle}</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {category.printers.map((printer, i) => (
                  <motion.div
                    key={printer.slug}
                    initial="hidden" whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    variants={fadeUp}
                  >
                    {view === 'catalogue'
                      ? <CatalogueCard printer={printer} onEnquire={openEnquiry} />
                      : <DetailCard printer={printer} onEnquire={openEnquiry} />
                    }
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        preselectedProduct={selectedPrinter}
      />
    </>
  );
};

export default PrinterVarietySection;