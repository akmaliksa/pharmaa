/**
 * Public Luxury Navbar
 * Dynamic header built according to CMS HeaderConfig.
 * Multilingual switch (EN / AR), Sticky behavior, Action CTA, and Admin Access Button.
 */

import React, { useEffect, useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Download,
  Globe,
  Lock,
  Menu,
  Phone,
  Shield,
  X,
} from 'lucide-react';

interface PublicNavbarProps {
  onOpenAdmin: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ onOpenAdmin }) => {
  const {
    headerConfig,
    activeLanguage,
    setActiveLanguage,
    siteSettings,
    isRtl,
    t,
    session,
  } = useCms();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: { en: 'Projects', ar: 'المشاريع' }, href: '#projects' },
    { label: { en: 'Philosophy', ar: 'الفلسفة المعمارية' }, href: '#philosophy' },
    { label: { en: 'Landmarks', ar: 'المعالم' }, href: '#landmarks' },
    { label: { en: 'Advisory', ar: 'الاستشارات' }, href: '#contact' },
  ];

  const brandName = t(headerConfig.logoText, 'Akaber');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222222]/80 py-3 shadow-xl'
          : headerConfig.transparent
          ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
          : 'bg-[#0A0A0A] py-5 border-b border-[#1E1E1E]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-[#C5A880]/60 flex items-center justify-center group-hover:border-[#C5A880] transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.2em] uppercase font-bold text-white group-hover:text-[#C5A880] transition-colors">
              {brandName}
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880]/80">
              {isRtl ? 'التطوير العقاري' : 'Real Estate Development'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-xs uppercase tracking-widest text-neutral-300 hover:text-[#C5A880] transition-colors font-medium relative group py-1"
            >
              <span>{t(item.label)}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Tools: Language switcher, Admin trigger, CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Language Switcher */}
          {headerConfig.showLanguageSwitcher && siteSettings.arabicEnabled && (
            <div className="flex items-center gap-1.5 border border-[#2B2B2B] rounded px-2.5 py-1 text-[11px] text-neutral-300 bg-black/40">
              <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
              <button
                onClick={() => setActiveLanguage('en')}
                className={`transition-colors ${
                  activeLanguage === 'en' ? 'text-[#C5A880] font-bold' : 'hover:text-white'
                }`}
              >
                EN
              </button>
              <span className="text-neutral-600">|</span>
              <button
                onClick={() => setActiveLanguage('ar')}
                className={`transition-colors ${
                  activeLanguage === 'ar' ? 'text-[#C5A880] font-bold' : 'hover:text-white'
                }`}
              >
                عربي
              </button>
            </div>
          )}

          {/* Action Button (e.g. Inquire / VIP Advisory) */}
          {headerConfig.showActionButton && (
            <a
              href={headerConfig.actionButtonUrl || '#contact'}
              className="px-5 py-2 text-xs uppercase tracking-wider font-semibold text-black bg-[#C5A880] hover:bg-[#D4AF37] transition-all rounded-sm shadow-md"
            >
              {headerConfig.actionButtonText?.[activeLanguage] ||
                (isRtl ? 'حجز استشارة' : 'Inquire')}
            </a>
          )}

          {/* Admin Panel Launch Button */}
          <button
            onClick={onOpenAdmin}
            title={session ? 'Open Admin Panel' : 'Administrator Login'}
            className="p-2 rounded text-neutral-400 hover:text-[#C5A880] hover:bg-neutral-900 border border-transparent hover:border-[#2C2C2C] transition-colors"
          >
            {session ? (
              <span className="flex items-center gap-1 text-[11px] font-mono text-[#C5A880]">
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Admin</span>
              </span>
            ) : (
              <Lock className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenAdmin}
            className="p-2 text-neutral-400 hover:text-[#C5A880]"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F0F0F] border-b border-[#222222] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider text-neutral-300 hover:text-[#C5A880] font-medium"
              >
                {t(item.label)}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => {
                  setActiveLanguage('en');
                  setMobileMenuOpen(false);
                }}
                className={`font-semibold ${
                  activeLanguage === 'en' ? 'text-[#C5A880]' : 'text-neutral-400'
                }`}
              >
                English
              </button>
              <span className="text-neutral-600">|</span>
              <button
                onClick={() => {
                  setActiveLanguage('ar');
                  setMobileMenuOpen(false);
                }}
                className={`font-semibold ${
                  activeLanguage === 'ar' ? 'text-[#C5A880]' : 'text-neutral-400'
                }`}
              >
                العربية
              </button>
            </div>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-1.5 text-xs uppercase font-semibold text-black bg-[#C5A880] rounded-sm"
            >
              {isRtl ? 'استشارة' : 'Inquire'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
