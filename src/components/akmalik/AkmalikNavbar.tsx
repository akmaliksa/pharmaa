import React, { useState, useEffect } from 'react';
import { AkmalikLogo } from './AkmalikLogo';
import { Menu, X, ArrowUpRight, Phone, Mail, ChevronRight } from 'lucide-react';

interface AkmalikNavbarProps {
  onOpenContact: (mode?: 'buy' | 'sell' | 'general') => void;
  onOpenValuation: () => void;
  activeRole: 'buyer' | 'seller';
  onRoleChange: (role: 'buyer' | 'seller') => void;
}

export const AkmalikNavbar: React.FC<AkmalikNavbarProps> = ({
  onOpenContact,
  onOpenValuation,
  activeRole,
  onRoleChange,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Concept', href: '#concept' },
    { label: 'Buy a Pharmacy', href: '#buy' },
    { label: 'Sell / Valuation', href: '#sell' },
    { label: 'Loan Calculator', href: '#calculator' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Resources', href: '#resources' },
    { label: 'The Team', href: '#team' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFFDF7]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#09543D]/10'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <AkmalikLogo size="md" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold tracking-wide text-[#1E1E1E] hover:text-[#09543D] transition-colors relative group py-1"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#09543D] rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Buyer / Seller Quick Toggle */}
              <div className="flex items-center bg-[#E6F5EF] p-1 rounded-full border border-[#09543D]/15 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => onRoleChange('buyer')}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                    activeRole === 'buyer'
                      ? 'bg-[#09543D] text-[#FFFDF7] shadow-xs'
                      : 'text-[#09543D] hover:text-[#04261C]'
                  }`}
                >
                  I'm a Buyer
                </button>
                <button
                  type="button"
                  onClick={() => onRoleChange('seller')}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                    activeRole === 'seller'
                      ? 'bg-[#09543D] text-[#FFFDF7] shadow-xs'
                      : 'text-[#09543D] hover:text-[#04261C]'
                  }`}
                >
                  I'm a Seller
                </button>
              </div>

              {/* Primary CTA: Let's talk */}
              <button
                type="button"
                onClick={() => onOpenContact('general')}
                className="btn-bounce inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#09543D] hover:bg-[#04261C] text-[#FFFDF7] text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
              >
                <span>Let's Talk</span>
                <span className="w-5 h-5 rounded-full bg-[#FFA9E9] text-[#09543D] flex items-center justify-center font-bold text-xs">
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => onOpenContact('general')}
                className="sm:hidden px-3 py-1.5 rounded-full bg-[#09543D] text-[#FFFDF7] text-xs font-bold"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 rounded-full bg-[#E6F5EF] text-[#09543D] flex items-center justify-center border border-[#09543D]/20 hover:bg-[#09543D] hover:text-[#FFFDF7] transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#09543D] text-[#FFFDF7] flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300">
          {/* Top Drawer Bar */}
          <div className="flex items-center justify-between">
            <AkmalikLogo size="md" inverted />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFDF7] flex items-center justify-center transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links List */}
          <div className="my-auto py-8 space-y-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFFDF7] hover:text-[#FFA9E9] transition-colors py-1"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>

          {/* Mobile Bottom Footer */}
          <div className="pt-6 border-t border-white/20 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRoleChange('buyer');
                  onOpenContact('buy');
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#FFFDF7] text-[#09543D] font-bold text-sm text-center shadow-sm hover:bg-[#FFA9E9] transition-colors"
              >
                I want to Buy
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRoleChange('seller');
                  onOpenValuation();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#FFA9E9] text-[#09543D] font-bold text-sm text-center shadow-sm hover:bg-white transition-colors"
              >
                I want to Sell
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-white/70 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFA9E9]" />
                <span>+33 (0)4 78 00 12 34</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FFA9E9]" />
                <span>contact@akmalikpharma.com</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
