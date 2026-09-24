import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, Menu, X, ChevronRight, Lock } from 'lucide-react';
import { Language } from '../types';

interface AlteraNavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAdmin: () => void;
}

export const AlteraNavbar: React.FC<AlteraNavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLabels = {
    en: {
      home: 'Home',
      projects: 'Projects & Development',
      hightech: 'Hightech Architecture',
      space: 'The Perfect Space',
      services: 'Services & Investment',
      about: 'About Us',
      contact: 'Contact',
    },
    tr: {
      home: 'Ana Sayfa',
      projects: 'Projeler & Geliştirme',
      hightech: 'Yüksek Teknoloji Mimari',
      space: 'Kusursuz Yaşam Alanı',
      services: 'Hizmetler & Yatırım',
      about: 'Hakkımızda',
      contact: 'İletişim',
    },
    ar: {
      home: 'الرئيسية',
      projects: 'المشاريع والتطوير',
      hightech: 'الهندسة المعمارية المتطورة',
      space: 'المساحة المثالية',
      services: 'الخدمات والاستثمار',
      about: 'عن الشركة',
      contact: 'اتصل بنا',
    },
  }[currentLanguage] || {
    home: 'Home',
    projects: 'Projects & Development',
    hightech: 'Hightech Architecture',
    space: 'The Perfect Space',
    services: 'Services & Investment',
    about: 'About Us',
    contact: 'Contact',
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all duration-200">
      
      {/* Top Bar - European Architectural Studio Style */}
      <div className="bg-[#111625] text-neutral-300 text-xs py-2 px-4 sm:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#008080]" />
              <span>Istanbul • Bodrum • Turkey</span>
            </span>
            <a href="tel:+902125550190" className="hidden sm:flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#008080]" />
              <span>+90 212 555 0190</span>
            </a>
            <a href="mailto:contact@akaber-realestate.com" className="hidden md:flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#008080]" />
              <span>contact@akaber-realestate.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-[#1A2238] px-2 py-0.5 rounded text-xs border border-neutral-700">
              <Globe className="w-3 h-3 text-neutral-400" />
              {(['en', 'tr', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-1.5 py-0.5 uppercase tracking-wider font-semibold rounded transition-colors ${
                    currentLanguage === lang
                      ? 'bg-[#008080] text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Admin Control Link */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-[#008080] font-medium transition-colors cursor-pointer"
              title="Admin Panel"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Clean Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Altera Style Architectural Typography Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#111625] text-white flex items-center justify-center font-bold tracking-widest text-lg rounded-sm shadow-sm group-hover:bg-[#008080] transition-colors duration-300">
              A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-[#111625] uppercase font-sans">
                  AKABER
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 bg-neutral-100 text-neutral-600 rounded uppercase tracking-wider border border-neutral-200">
                  DEVELOPMENT
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                Immobilien & Bauträger • Turkey
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links (Clean, Architectural Style like Altera) */}
          <nav className="hidden lg:flex items-center gap-7">
            <a 
              href="#" 
              className="text-sm font-semibold text-[#111625] hover:text-[#008080] transition-colors"
            >
              {navLabels.home}
            </a>
            <a 
              href="#projects" 
              className="text-sm font-semibold text-neutral-600 hover:text-[#008080] transition-colors"
            >
              {navLabels.projects}
            </a>
            <a 
              href="#hightech" 
              className="text-sm font-semibold text-neutral-600 hover:text-[#008080] transition-colors"
            >
              {navLabels.hightech}
            </a>
            <a 
              href="#services" 
              className="text-sm font-semibold text-neutral-600 hover:text-[#008080] transition-colors"
            >
              {navLabels.services}
            </a>
            <a 
              href="#about" 
              className="text-sm font-semibold text-neutral-600 hover:text-[#008080] transition-colors"
            >
              {navLabels.about}
            </a>
            <a 
              href="#contact" 
              className="text-sm font-semibold text-neutral-600 hover:text-[#008080] transition-colors"
            >
              {navLabels.contact}
            </a>
          </nav>

          {/* Direct CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-[#111625] hover:bg-[#008080] text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 shadow-sm flex items-center gap-2 group"
            >
              <span>{navLabels.contact}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-800 hover:text-[#008080]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-6 py-5 shadow-xl space-y-4">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-neutral-900 hover:text-[#008080]"
          >
            {navLabels.home}
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-neutral-700 hover:text-[#008080]"
          >
            {navLabels.projects}
          </a>
          <a
            href="#hightech"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-neutral-700 hover:text-[#008080]"
          >
            {navLabels.hightech}
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-neutral-700 hover:text-[#008080]"
          >
            {navLabels.services}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-neutral-700 hover:text-[#008080]"
          >
            {navLabels.about}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-neutral-700 hover:text-[#008080]"
          >
            {navLabels.contact}
          </a>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs font-semibold text-[#008080] flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Panel (admin / Admin@123)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
