/**
 * Public Luxury Footer
 * Synchronized with CMS FooterConfig, siteSettings, and active language.
 */

import React from 'react';
import { useCms } from '../../context/CmsContext';
import {
  ArrowRight,
  Download,
  Globe,
  Instagram,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';

interface PublicFooterProps {
  onOpenAdmin: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onOpenAdmin }) => {
  const {
    footerConfig,
    siteSettings,
    activeLanguage,
    setActiveLanguage,
    isRtl,
    t,
  } = useCms();

  const brandName = t(footerConfig.logoText, 'Akaber');
  const description = t(footerConfig.description || footerConfig.tagline);
  const copyright = t(footerConfig.copyrightText || footerConfig.copyright);
  const address = t(footerConfig.contactInfo?.address || footerConfig.address);
  const phone = footerConfig.contactInfo?.phone || footerConfig.phone || '+966 11 000 0000';
  const email = footerConfig.contactInfo?.email || footerConfig.email || 'info@akaber.sa';

  return (
    <footer className="bg-[#070707] border-t border-[#1C1C1C] text-[#E0E0D8] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#1C1C1C]">
          {/* Brand Summary & Bio (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#C5A880]/60 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
              </div>
              <span className="font-serif text-xl tracking-[0.2em] uppercase font-bold text-white">
                {brandName}
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {description}
            </p>

            {footerConfig.showSocial && (
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#121212] border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#121212] border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#121212] border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              {isRtl ? 'روابط سريعة' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#projects" className="hover:text-[#C5A880] transition-colors">
                  {isRtl ? 'المشاريع التطويرية' : 'Featured Developments'}
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-[#C5A880] transition-colors">
                  {isRtl ? 'الفلسفة المعمارية' : 'Architectural Philosophy'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C5A880] transition-colors">
                  {isRtl ? 'الاستشارات والاستحواذ' : 'Private Client Advisory'}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-[#C5A880]" />
                  <span>{isRtl ? 'بوابة إدارة المحتوى (CMS)' : 'Admin Portal'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Coordinates & Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              {isRtl ? 'المقر الرئيسي' : 'Headquarters'}
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href={`tel:${phone}`}
                  className="hover:text-white"
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white"
                >
                  {email}
                </a>
              </div>
            </div>

            {footerConfig.showNewsletter && (
              <div className="pt-3">
                <span className="block text-[11px] text-neutral-400 mb-2">
                  {isRtl
                    ? 'النشرة البريدية الحصرية للاستثمار العقاري'
                    : 'Private Intelligence & Market Updates'}
                </span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(isRtl ? 'شكراً لاشتراككم.' : 'Subscription confirmed.');
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder={isRtl ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    className="flex-1 px-3 py-2 bg-[#121212] border border-[#2B2B2B] focus:border-[#C5A880] rounded text-xs text-white outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded text-xs transition-colors"
                  >
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>{copyright}</div>
          <div className="flex items-center gap-4">
            <a
              href="/akaber-real-estate.zip"
              download="akaber-real-estate.zip"
              className="text-[#C5A880] hover:text-[#D4AF37] transition-colors flex items-center gap-1 font-medium"
              title="Download Project ZIP File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isRtl ? 'تحميل كود المشروع (ZIP)' : 'Download Source (ZIP)'}</span>
            </a>
            <span>·</span>
            <span className="text-neutral-600">CR No. 1010892044</span>
            <span>·</span>
            <button
              onClick={() => setActiveLanguage(activeLanguage === 'en' ? 'ar' : 'en')}
              className="text-neutral-400 hover:text-[#C5A880] transition-colors flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-[#C5A880]" />
              <span>{activeLanguage === 'en' ? 'العربية (RTL)' : 'English (LTR)'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
