'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const printerDropdownItems = [
  { label: 'Desktop Printers', href: '/printers?category=desktop' },
  { label: 'Office Printers', href: '/printers?category=office' },
  { label: 'Enterprise Printers', href: '/printers?category=enterprise' },
];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Printers', href: '/printers', hasDropdown: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [printersOpen, setPrintersOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'border-b border-gray-200 bg-background' : 'bg-background'}`}>
      {/* Top utility bar */}
      <div className="bg-[#003087] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <div className="flex items-center gap-4">
            <a href="tel:+919819033222" className="hover:text-blue-200 transition-colors">+91 98190 33222</a>
            <span>|</span>
            <a href="tel:+919819133222" className="hover:text-blue-200 transition-colors">+91 98191 33222</a>
          </div>
          <a href="mailto:sales@kwalityenterprise.com" className="hidden md:block hover:text-blue-200 transition-colors">
            sales@kwalityenterprise.com
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-background py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Kwality Enterprise" className="h-12" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setPrintersOpen(true)}
                onMouseLeave={() => item.hasDropdown && setPrintersOpen(false)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-foreground hover:text-coral transition-colors font-medium text-sm"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {item.hasDropdown && printersOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-background shadow-xl rounded-lg border p-4 min-w-[200px] z-50">
                    {printerDropdownItems.map((p) => (
                      <Link
                        key={p.label}
                        href={p.href}
                        className="block text-sm text-foreground hover:text-coral transition-colors py-2 px-2 rounded hover:bg-muted"
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <Link href="/clients/dashboard">
                <Button className="bg-[#0096D6] hover:bg-[#0086C6] text-white rounded-md font-semibold text-sm px-6">
                  My Portal
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-[#0096D6] hover:bg-[#0086C6] text-white rounded-md font-semibold text-sm px-6">
                  Client Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-foreground hover:text-coral transition-colors font-medium px-4 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-8 mt-2 space-y-2">
                      {printerDropdownItems.map((p) => (
                        <Link
                          key={p.label}
                          href={p.href}
                          className="block text-sm text-muted-foreground hover:text-coral transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {p.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {session ? (
                <Link href="/clients/dashboard" className="mx-4">
                  <Button className="w-full bg-[#0096D6] text-white rounded-md font-semibold text-sm">My Portal</Button>
                </Link>
              ) : (
                <Link href="/login" className="mx-4">
                  <Button className="w-full bg-[#0096D6] text-white rounded-md font-semibold text-sm">Client Login</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
