import PrinterVarietySection from '@/components/marketing/PrinterVarietySection';
import Header from '@/components/marketing/Header';
import Footer from '@/components/marketing/Footer';

export const metadata = { title: 'Printers — Kwality Enterprise', description: 'Browse our full range of rental printers.' };

export default function PrintersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 pt-10 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">Our Printer Fleet</h1>
          <p className="text-muted-foreground mt-2">Choose from our wide range of A3 &amp; A4, Color &amp; B&amp;W rental printers.</p>
        </div>
        <PrinterVarietySection />
      </main>
      <Footer />
    </div>
  );
}
