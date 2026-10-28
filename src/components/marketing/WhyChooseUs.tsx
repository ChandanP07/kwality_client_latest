'use client';
import { motion } from 'framer-motion';
import { Shield, Truck, Clock, IndianRupee, Headphones, RefreshCw, Building2, FileCheck, Wrench } from 'lucide-react';

const whyUsItems = [
  { icon: FileCheck, title: 'Get GST Credit', description: 'Get GST invoices and avail GST input credit on all your rentals.' },
  { icon: Truck, title: 'Nationwide Delivery', description: 'Free delivery and return shipping across all major Indian cities.' },
  { icon: Clock, title: 'Flexible Duration', description: 'Monthly, quarterly, or annual rental plans tailored to your needs.' },
  { icon: IndianRupee, title: 'Affordable Pricing', description: 'Premium printers at competitive, budget-friendly rental rates.' },
  { icon: Shield, title: 'Service Guarantee', description: 'Industry-leading service guarantee with same-day issue resolution.' },
  { icon: Headphones, title: 'Technical Support', description: 'Free expert technical support throughout your rental period.' },
  { icon: RefreshCw, title: 'Easy Upgrades', description: 'Swap or upgrade your printer anytime as your needs evolve.' },
  { icon: Wrench, title: 'Free Maintenance', description: 'All maintenance, toner, and repairs included in your rental.' },
  { icon: Building2, title: 'Enterprise Discounts', description: 'Bulk fleet discounts for organizations with 10+ printers.' },
];

const fadeUp = { hidden: { opacity: 0, y: 16, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };

const WhyChooseUs = () => (
  <section className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} variants={fadeUp}
        className="text-3xl md:text-4xl font-bold text-center mb-12">
        Why Choose <span className="text-coral">Kwality Enterprise?</span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyUsItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }} variants={fadeUp}
              className="bg-background rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-coral" />
              </div>
              <h3 className="font-bold text-secondary mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
