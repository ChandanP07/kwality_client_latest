'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <img src="/logo.png" alt="Kwality Enterprise" className="h-12 mb-4 brightness-0 invert" />
          <p className="text-secondary-foreground/80 text-sm mb-4">
            India&apos;s leading B2B managed printer rental service. Reliable, expertly maintained printer solutions for modern offices.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[['/', 'Home'], ['/printers', 'Printers'], ['/about', 'About Us'], ['/contact', 'Contact Us']].map(([href, label]) => (
              <li key={href}><Link href={href} className="text-secondary-foreground/80 hover:text-coral transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Our Printers</h3>
          <ul className="space-y-2 text-sm">
            {[['desktop', 'Desktop Printers'], ['office', 'Office Printers'], ['enterprise', 'Enterprise Printers']].map(([cat, label]) => (
              <li key={cat}><Link href={`/printers?category=${cat}`} className="text-secondary-foreground/80 hover:text-coral transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-coral flex-shrink-0" />
              <div>
                <a href="tel:+919819033222" className="text-secondary-foreground/80 hover:text-coral transition-colors block">+91 98190 33222</a>
                <a href="tel:+919819133222" className="text-secondary-foreground/80 hover:text-coral transition-colors block">+91 98191 33222</a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-coral flex-shrink-0" />
              <a href="mailto:sales@kwalityenterprise.com" className="text-secondary-foreground/80 hover:text-coral transition-colors">sales@kwalityenterprise.com</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
              <span className="text-secondary-foreground/80">Mumbai, Pune, Bangalore, Hyderabad, Chennai</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-center text-sm text-secondary-foreground/60">
        <p>© {new Date().getFullYear()} Kwality Enterprise. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
