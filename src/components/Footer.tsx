import React from 'react';
import { Building2, MapPin, ArrowUp, Shield } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language?: Language;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language = 'en', onOpenAdmin }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050A17] border-t border-[#D4AF37]/30 text-slate-400 text-xs font-light">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F1E3D] border border-[#D4AF37]/50 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-widest text-white block">
                  AKABER
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059]">
                  {language === 'ar' ? 'للتطوير العقاري والاستثمار' : language === 'tr' ? 'Gayrimenkul & Yatırım' : 'Real Estate & Development'}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <div className="pt-2 text-[11px] text-slate-400">
              {language === 'ar' ? 'شركة تطوير ووساطة عقارية مرخصة في الجمهورية التركية.' : language === 'tr' ? 'Türkiye Cumhuriyeti lisanslı gayrimenkul geliştirme ve danışmanlık kuruluşu.' : 'Licensed Real Estate Development & Brokerage Partner in the Republic of Turkey.'}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-semibold text-white tracking-wider uppercase">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-[#D4AF37] transition-colors">{t.nav.overview}</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">{t.nav.services}</a></li>
              <li><a href="#properties" className="hover:text-[#D4AF37] transition-colors">{t.nav.properties}</a></li>
              <li><a href="#turkey-investment" className="hover:text-[#D4AF37] transition-colors">{t.nav.turkeyInvestment}</a></li>
              <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">{t.nav.consultation}</a></li>
            </ul>
          </div>

          {/* Core Services Breakdown */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-semibold text-white tracking-wider uppercase">
              {t.footer.specTitle}
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">{t.services.item1.title}</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">{t.services.item2.title}</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">{t.services.item3.title}</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">{t.services.item4.title}</a></li>
              <li><a href="#properties" className="hover:text-[#D4AF37] transition-colors">{t.turkeySection.citizenshipTitle}</a></li>
            </ul>
          </div>

          {/* Turkish Locations */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-semibold text-white tracking-wider uppercase">
              {t.footer.hubsTitle}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4AF37]" /> Istanbul (Levent & Bebek)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4AF37]" /> Bodrum (Yalikavak Marina)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4AF37]" /> Antalya (Konyaalti Coast)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#D4AF37]" /> Sapanca (Development Parcels)</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-[#03060E] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} <strong>Akaber Real Estate & Development</strong>. {t.footer.rights}
          </p>

          <div className="flex items-center gap-6">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#D4AF37] hover:text-white transition-colors bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30"
              >
                <Shield className="w-3 h-3 text-[#D4AF37]" />
                <span>Admin Control Panel</span>
              </button>
            )}
            <span className="text-[11px] text-[#C5A059] hidden sm:inline">{language === 'ar' ? 'محفظة العقارات الملكية الفاخرة' : language === 'tr' ? 'Seçkin Lüks Portföy' : 'Royal Luxury Portfolio'}</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#D4AF37] transition-colors"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
