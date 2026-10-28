'use client';
import { motion } from 'framer-motion';

const brands = ['Canon', 'HP', 'Epson', 'Ricoh', 'Konica Minolta', 'Xerox', 'Brother'];
const fadeUp = { hidden: { opacity: 0, y: 16, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };

const BrandsSection = () => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }} variants={fadeUp} className="text-3xl md:text-4xl font-bold text-center mb-10">
        Brands We Offer
      </motion.h2>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }} variants={fadeUp} className="flex flex-wrap justify-center gap-6 md:gap-10">
        {brands.map((brand) => (
          <div key={brand} className="px-6 py-3 rounded-lg bg-muted text-secondary font-semibold text-sm md:text-base hover:shadow-md transition-shadow duration-300">
            {brand}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default BrandsSection;
