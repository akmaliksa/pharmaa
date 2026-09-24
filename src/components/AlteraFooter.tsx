import React from 'react';
import { MapPin, Phone, Mail, ArrowUp, Lock, Globe } from 'lucide-react';
import { Language } from '../types';

interface AlteraFooterProps {
  language: Language;
  onOpenAdmin: () => void;
}

export const AlteraFooter: React.FC<AlteraFooterProps> = ({ language, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = {
    en: {
      about: 'Akaber Development & Investment specializes in high-value real estate development in Turkey. We acquire prime land for subdivision, develop commercial centers, and remodel luxury residences to European architectural standards.',
      quickLinks: 'Navigation',
      services: 'Core Services',
      contact: 'Studio & Headquarters',
      legal: 'Legal & Privacy',
      copyright: '© 2026 Akaber Development GmbH & Co. KG. All rights reserved. Architectural excellence in Turkey.',
    },
    tr: {
      about: 'Akaber Development & Investment, Türkiye genelinde yüksek katma değerli gayrimenkul geliştirme ve yatırım alanında uzmanlaşmıştır. Arsa ifrazı, ticari merkezler ve lüks villa renovasyonlarını Avrupa mimari standartlarında hayata geçiriyoruz.',
      quickLinks: 'Hızlı Erişim',
      services: 'Hizmetlerimiz',
      contact: 'Stüdyo ve Merkez Ofis',
      legal: 'Yasal ve Gizlilik',
      copyright: '© 2026 Akaber Development. Tüm hakları saklıdır. Türkiye’de mimari mükemmellik.',
    },
    ar: {
      about: 'تتخصص شركة أكابر للتطوير والاستثمار العقاري في اقتناص وتطوير المشاريع العقارية ذات القيمة العالية في تركيا، من تقسيم الأراضي وتطوير المراكز التجارية إلى تجديد الفلل والقصور بأعلى المعايير الهندسية الأوروبية.',
      quickLinks: 'التنقل السريع',
      services: 'خدماتنا الأساسية',
      contact: 'المقر واستوديو الهندسة',
      legal: 'الشروط القانونية والخصوصية',
      copyright: '© 2026 شركة أكابر للتطوير العقاري. جميع الحقوق محفوظة.',
    },
  }[language] || {
    about: 'Akaber Development & Investment specializes in high-value real estate development in Turkey. We acquire prime land for subdivision, develop commercial centers, and remodel luxury residences to European architectural standards.',
    quickLinks: 'Navigation',
    services: 'Core Services',
    contact: 'Studio & Headquarters',
    legal: 'Legal & Privacy',
    copyright: '© 2026 Akaber Development GmbH & Co. KG. All rights reserved. Architectural excellence in Turkey.',
  };

  return (
    <footer className="bg-[#111625] text-neutral-300 text-xs border-t border-neutral-800">
      
      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white text-[#111625] flex items-center justify-center font-bold tracking-widest text-lg rounded-xs">
                A
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white uppercase font-sans">
                  AKABER
                </span>
                <span className="text-[10px] block uppercase tracking-[0.2em] text-[#008080] font-semibold">
                  DEVELOPMENT & ARCHITECTURE
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed font-normal pr-4">
              {content.about}
            </p>

            <div className="pt-2 text-[11px] text-neutral-500 font-mono">
              German & European Quality Standards • Bauträger & Investment
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">
              {content.quickLinks}
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#" className="hover:text-[#008080] transition-colors">Home</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#008080] transition-colors">Projects Portfolio</a>
              </li>
              <li>
                <a href="#hightech" className="hover:text-[#008080] transition-colors">Hightech Architecture</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#008080] transition-colors">Investment Services</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#008080] transition-colors">Contact Studio</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">
              {content.services}
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>Land Acquisition & Subdivision</li>
              <li>Villa Renovation & Modernization</li>
              <li>Commercial Plaza Development</li>
              <li>Property & Rental Asset Management</li>
              <li>Turkish Citizenship by Investment</li>
            </ul>
          </div>

          {/* Col 4: Studio Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">
              {content.contact}
            </h4>
            <div className="space-y-2 text-neutral-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#008080] shrink-0 mt-0.5" />
                <span>Levent CBD & Bebek, Istanbul, Turkey</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#008080] shrink-0" />
                <a href="tel:+902125550190" className="hover:text-white transition-colors">+90 212 555 0190</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#008080] shrink-0" />
                <a href="mailto:contact@akaber-realestate.com" className="hover:text-white transition-colors">contact@akaber-realestate.com</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Admin Link */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>{content.copyright}</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#008080] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Control Panel (admin / Admin@123)</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 bg-neutral-800 hover:bg-[#008080] hover:text-white text-neutral-300 rounded transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
