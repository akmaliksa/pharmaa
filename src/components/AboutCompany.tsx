import React from 'react';
import { Building2, Compass, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutCompanyProps {
  language?: Language;
  translations?: any;
}

export const AboutCompany: React.FC<AboutCompanyProps> = ({ language = 'en', translations }) => {
  const t = translations || TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <section id="overview" className="py-24 bg-[#070D1E] relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mission & Core Strategic Statement */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1E3D] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.about.tag}</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {t.about.heading}
            </h2>

            {/* Exactly user's core overview statement */}
            <div className="p-6 rounded-2xl bg-[#0B152E]/90 border border-[#D4AF37]/30 shadow-lg relative">
              <div className="w-1.5 h-full bg-[#D4AF37] absolute left-0 top-0 rounded-l-2xl" />
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light pl-2">
                "{t.about.quote}"
              </p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.about.descP1}
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.about.descP2}
            </p>

            {/* 3 Pillar Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#0A1128] border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-[#C5A059] uppercase font-semibold block mb-1">01. {language === 'ar' ? 'الاستكشاف' : language === 'tr' ? 'Keşif' : 'Discovery'}</span>
                <p className="text-sm text-slate-200 font-medium">{t.about.bullet1}</p>
              </div>
              <div className="bg-[#0A1128] border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-[#C5A059] uppercase font-semibold block mb-1">02. {language === 'ar' ? 'التطوير' : language === 'tr' ? 'Değer Üretimi' : 'Value Creation'}</span>
                <p className="text-sm text-slate-200 font-medium">{t.about.bullet2}</p>
              </div>
              <div className="bg-[#0A1128] border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-[#C5A059] uppercase font-semibold block mb-1">03. {language === 'ar' ? 'التسييل' : language === 'tr' ? 'Kazanç & Çıkış' : 'Monetization'}</span>
                <p className="text-sm text-slate-200 font-medium">{t.about.bullet3}</p>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Visual Composite of Development & Architecture */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl shadow-black">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                  alt="Akaber Luxury Architecture in Turkey"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#070D1E]/90 backdrop-blur-md border border-[#D4AF37]/30">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Active Turkish Portfolio</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Direct ownership & joint ventures in Istanbul, Bodrum, Antalya, and Sapanca.
                  </p>
                </div>
              </div>

              {/* Floating Value Card */}
              <div className="absolute -bottom-6 -left-6 bg-[#0B152E] border border-[#D4AF37]/50 rounded-xl p-4 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30">
                  <Layers className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Full Lifecycle Management</div>
                  <div className="text-xs text-slate-400">From raw plot to luxury handover</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
