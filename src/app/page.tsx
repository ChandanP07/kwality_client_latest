import HeroSection from '@/components/marketing/HeroSection';
import StatsBar from '@/components/marketing/StatsBar';
import AboutSection from '@/components/marketing/AboutSection';
import PrinterVarietySection from '@/components/marketing/PrinterVarietySection';
import BrandsSection from '@/components/marketing/BrandsSection';
import WhyChooseUs from '@/components/marketing/WhyChooseUs';
import ComparisonTable from '@/components/marketing/ComparisonTable';
import TestimonialsSection from '@/components/marketing/TestimonialsSection';
import CTASection from '@/components/marketing/CTASection';
import StickyQuoteButton from '@/components/marketing/StickyQuoteButton';
import Header from '@/components/marketing/Header';
import Footer from '@/components/marketing/Footer';
import ClientLogosSection from '@/components/marketing/ClientLogosSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <ClientLogosSection />
        <AboutSection />
        <PrinterVarietySection />
        <BrandsSection />
        <WhyChooseUs />
        <ComparisonTable />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <StickyQuoteButton />
    </div>
  );
}
