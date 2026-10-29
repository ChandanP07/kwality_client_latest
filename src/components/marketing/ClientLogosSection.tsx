'use client';
import { motion } from 'framer-motion';

const clients = [
  { name: '360 One WAM', logo: '/clients/360-one.png' },
  { name: 'Jeena & Company', logo: '/clients/jeena.jpg' },
  { name: 'Shivam Autozone', logo: '/clients/shivam-autozone.png' },
  { name: 'Sky High Airport Services', logo: '/clients/sky-high.png' },
  { name: 'SSS Sai Shipping', logo: '/clients/sss-sai.png' },
  { name: 'Trail Blazer Tours', logo: '/clients/trail-blazer.png' },
  { name: 'TAC Logistics', logo: '/clients/tac-logistics.png' },
  { name: 'JP Infra', logo: '/clients/jp-infra.jpg' },
  { name: 'Gurukrupa Realcon', logo: '/clients/gurukrupa.png' },
  { name: 'Global Vectra Helicorp', logo: '/clients/global-vectra.png' },
];

// Duplicate for seamless infinite scroll
const allClients = [...clients, ...clients];

export default function ClientLogosSection() {
  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            Trusted by leading businesses
          </p>
          <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            1,000+ offices across India trust Kwality Enterprise
          </h2>
        </motion.div>
      </div>

      {/* Infinite scroll track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div className="flex" style={{ width: 'max-content' }}>
          <motion.div
            className="flex items-center gap-12"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ width: 'max-content' }}
          >
            {allClients.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                style={{ width: 140, height: 64 }}
                title={client.name}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Industry tags */}
      <div className="container mx-auto px-4 mt-8 flex flex-wrap justify-center gap-2">
        {['Finance & Investment', 'Logistics & Shipping', 'Aviation', 'Infrastructure & Real Estate', 'Automotive', 'Travel & Tourism'].map((tag) => (
          <span
            key={tag}
            className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* <img src='https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp'/> */}
    </section>
  );
}