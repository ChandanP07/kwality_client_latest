'use client';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const comparisonData = [
  'Flexible Printer Rental Duration',
  'Free Express Delivery & Return Shipping',
  'Customized Rental Solution',
  'Free Rental Period Maintenance Support',
  'Latest Printers on Rent from Top Brands',
  'Economically Priced Rentals',
  'Stringent Quality Check Process',
  'Free Instant Replacement if an Issue Arises',
];

const fadeUp = { hidden: { opacity: 0, y: 16, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };

const ComparisonTable = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 max-w-3xl">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} variants={fadeUp}>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-secondary mb-8">
          Kwality Enterprise vs Other Providers
        </h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary text-secondary-foreground">
                <th className="py-3 px-4 text-left text-sm font-semibold">Feature</th>
                <th className="py-3 px-4 text-center text-sm font-semibold w-32">Kwality Enterprise</th>
                <th className="py-3 px-4 text-center text-sm font-semibold w-32">Others</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((feature, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-muted/50' : 'bg-background'}>
                  <td className="py-3 px-4 text-sm text-foreground">{feature}</td>
                  <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ComparisonTable;
