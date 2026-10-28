'use client';
import { motion } from 'framer-motion';

const stats = [
  { number: '1000+', label: 'Offices Served' },
  { number: '99%', label: 'Customer Satisfaction' },
  { number: '14+', label: 'Years of Experience' },
  { number: '10,987+', label: 'Printers Deployed' },
];

const StatsBar = () => (
  <section className="bg-secondary py-10">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-coral tabular-nums">{stat.number}</div>
            <div className="text-sm text-secondary-foreground/80 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
