import React, { useState, useRef } from 'react';
import { Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/properties';
import { TRANSLATIONS, LANGUAGES } from '../data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Building2, Phone, Menu, X, Upload, ChevronDown, Check, Coins, Shield } from 'lucide-react';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenConsultation: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  currentLanguage,
  onLanguageChange,
  onOpenConsultation,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomLogoUrl(url);
    }
  };

  const navLinks = [
    { label: t.nav.overview, href: '#overview' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.properties, href: '#properties' },
    { label: t.nav.turkeyInvestment, href: '#turkey-investment' },
    { label: t.nav.whyUs, href: '#why-us' },
  ];

  const brandSubtitle = currentLanguage === 'ar'
    ? 'التطوير العقاري والاستثمار'
    : currentLanguage === 'tr'
    ? 'Gayrimenkul Geliştirme & Yatırım'
    : 'Real Estate & Development';

  return (
    <header className="sticky top-0 z-50 bg-[#05070B]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Custom Logo Upload capability */}
          <div className="flex items-center gap-3">
            {customLogoUrl ? (
              <div className="relative group flex items-center gap-3">
                <img
                  src={customLogoUrl}
                  alt="Akaber Logo"
                  className="h-12 w-auto max-w-[160px] object-contain"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Change uploaded logo"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-[#D4AF37] underline"
                >
                  Change
                </button>
              </div>
            ) : (
              <a href="#" className="flex items-center gap-3 group">
                {/* Royal Gold Emblem Crest */}
                <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-[#1A264F] to-[#0A1128] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg shadow-[#D4AF37]/10 group-hover:border-[#D4AF37] transition-colors">
                  <div className="absolute inset-0 rounded-lg bg-[#D4AF37]/5 pointer-events-none" />
                  <Building2 className="w-5 h-5 text-[#D4AF37]" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                </div>
                
                <div className="flex flex-col">
                  <span className="font-cinzel text-xl font-bold tracking-widest text-[#F9F1D6] group-hover:text-[#D4AF37] transition-colors">
                    AKABER
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-medium">
                    {brandSubtitle}
                  </span>
                </div>
              </a>
            )}

            {/* Subtle logo upload pill button for user */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />
            {!customLogoUrl && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-[#C5A059]/80 hover:text-[#D4AF37] bg-[#0F1E3D]/50 hover:bg-[#0F1E3D] border border-[#D4AF37]/30 rounded-md transition-colors"
                title="Upload custom company logo"
              >
                <Upload className="w-3 h-3" />
                {t.nav.uploadLogo}
              </button>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-[#D4AF37] transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Center */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Language Switcher Component */}
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-[#0F1E3D] hover:bg-[#16274e] border border-[#D4AF37]/30 rounded-lg transition-colors"
                aria-label="Select Currency"
              >
                <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currentCurrency} ({CURRENCY_RATES[currentCurrency].symbol})</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {currencyOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#0B152E] border border-[#D4AF37]/40 rounded-xl shadow-xl py-1.5 z-50">
                  {(Object.keys(CURRENCY_RATES) as Currency[]).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        onCurrencyChange(cur);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                        currentCurrency === cur
                          ? 'bg-[#16274e] text-[#D4AF37] font-semibold'
                          : 'text-slate-300 hover:bg-[#121F3D] hover:text-white'
                      }`}
                    >
                      <span>{cur} ({CURRENCY_RATES[cur].symbol.trim()})</span>
                      {currentCurrency === cur && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

              {/* Admin Panel Access Button */}
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  title="Admin Control Panel"
                  className="p-2 rounded-lg text-[#D4AF37] hover:text-white bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Admin</span>
                </button>
              )}

              {/* Direct Consultation / Contact Button */}
              <button
                onClick={onOpenConsultation}
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase text-[#070D1E] bg-gradient-to-r from-[#F9F1D6] via-[#D4AF37] to-[#C5A059] hover:from-[#FFF] hover:to-[#E6CA65] shadow-md shadow-[#D4AF37]/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <Phone className="w-3.5 h-3.5 text-[#070D1E]" />
                <span>{t.nav.consultation}</span>
              </button>
          </div>

          {/* Mobile Menu Button & Quick Lang Switcher */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0F1E3D] border border-slate-700/50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1128] border-b border-[#D4AF37]/30 px-5 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base text-slate-200 hover:text-[#D4AF37] font-medium border-b border-slate-800"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            {/* Language Quick Toggle in Drawer */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Select Language / Dil / اللغة:</span>
              <div className="flex gap-1.5">
                {(Object.values(LANGUAGES) as typeof LANGUAGES[keyof typeof LANGUAGES][]).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                    }}
                    className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 ${
                      currentLanguage === lang.code
                        ? 'bg-[#D4AF37] text-[#070D1E] font-bold'
                        : 'bg-[#0F1E3D] text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Quick Toggle */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Select Currency:</span>
              <div className="flex gap-1.5">
                {(Object.keys(CURRENCY_RATES) as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => {
                      onCurrencyChange(cur);
                    }}
                    className={`px-2.5 py-1 rounded text-xs ${
                      currentCurrency === cur
                        ? 'bg-[#D4AF37] text-[#070D1E] font-bold'
                        : 'bg-[#0F1E3D] text-slate-300'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#070D1E] bg-gradient-to-r from-[#F9F1D6] to-[#D4AF37] text-center"
            >
              {t.nav.consultation}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
