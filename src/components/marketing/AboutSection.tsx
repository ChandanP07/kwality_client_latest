'use client';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 16, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };

const AboutSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} variants={fadeUp} className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Kwality Enterprise — <span className="text-coral">Your Managed Printer Partner</span>
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Kwality Enterprise is India&apos;s leading B2B managed printer rental service. We deliver reliable, expertly maintained printer solutions tailored for modern offices — from compact desktop printers to high-volume enterprise machines.</p>
          <p>We serve startups, corporates, and production houses across Mumbai, Pune, Bangalore, Hyderabad, and Chennai. Every printer is installed, configured, and supported by our in-house team of experts.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
