import AboutSection from '@/components/marketing/AboutSection';
import WhyChooseUs from '@/components/marketing/WhyChooseUs';
import BrandsSection from '@/components/marketing/BrandsSection';
import TestimonialsSection from '@/components/marketing/TestimonialsSection';
import Header from '@/components/marketing/Header';
import Footer from '@/components/marketing/Footer';

export const metadata = { title: 'About Us — Kwality Enterprise' };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutSection />
        <WhyChooseUs />
        <BrandsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
