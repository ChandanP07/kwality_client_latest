import CTASection from '@/components/marketing/CTASection';
import Header from '@/components/marketing/Header';
import Footer from '@/components/marketing/Footer';

export const metadata = { title: 'Contact — Kwality Enterprise' };

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            We&apos;re here to help. Call, WhatsApp or email us — our team responds within 2 business hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm mb-16">
            <div className="bg-muted rounded-xl p-6 min-w-[180px]">
              <p className="font-semibold text-secondary mb-1">Sales</p>
              <a href="tel:+919819033222" className="text-coral hover:underline block">+91 98190 33222</a>
              <a href="tel:+919819133222" className="text-coral hover:underline block">+91 98191 33222</a>
            </div>
            <div className="bg-muted rounded-xl p-6 min-w-[180px]">
              <p className="font-semibold text-secondary mb-1">Email</p>
              <a href="mailto:sales@kwalityenterprise.com" className="text-coral hover:underline">
                sales@kwalityenterprise.com
              </a>
            </div>
            <div className="bg-muted rounded-xl p-6 min-w-[180px]">
              <p className="font-semibold text-secondary mb-1">Cities</p>
              <p className="text-muted-foreground">Mumbai · Pune · Bangalore<br />Hyderabad · Chennai</p>
            </div>
          </div>
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
