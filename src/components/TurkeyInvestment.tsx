import React from 'react';
import { Landmark, TrendingUp, Globe2, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface TurkeyInvestmentProps {
  language?: Language;
  translations?: any;
}

export const TurkeyInvestment: React.FC<TurkeyInvestmentProps> = ({ language = 'en', translations }) => {
  const t = translations || TRANSLATIONS[language] || TRANSLATIONS.en;

  const points = [
    {
      icon: Landmark,
      title: t.turkeySection.citizenshipTitle,
      desc: t.turkeySection.citizenshipDesc,
    },
    {
      icon: TrendingUp,
      title: t.turkeySection.capitalGrowthTitle,
      desc: t.turkeySection.capitalGrowthDesc,
    },
    {
      icon: Globe2,
      title: t.turkeySection.locationTitle,
      desc: t.turkeySection.locationDesc,
    },
    {
      icon: Shield,
      title: t.turkeySection.currencyTitle,
      desc: t.turkeySection.currencyDesc,
    }
  ];

  return (
    <section id="turkey-investment" className="py-24 bg-[#0A1128] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1E3D] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
              <span>{t.turkeySection.tag}</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {t.turkeySection.heading}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {t.turkeySection.subheading}
            </p>

            <div className="p-4 rounded-xl bg-[#070D1E] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">{language === 'ar' ? 'دعم المستثمرين الدوليين' : language === 'tr' ? 'Yabancı Yatırımcı Desteği' : 'Foreign Direct Investment Support'}</span>
                <span className="text-sm font-bold text-[#D4AF37]">{language === 'ar' ? 'إشراف قانوني كامل على معاملات الطابو' : language === 'tr' ? 'Eksiksiz Hukuki ve Tapu Süreci' : 'Complete End-to-End Turkish Legal Handling'}</span>
              </div>
              <a
                href="#contact"
                className="p-2.5 rounded-lg bg-[#0F1E3D] hover:bg-[#16274e] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {points.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#070D1E] border border-slate-800/90 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#0F1E3D] border border-[#D4AF37]/40 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="font-cinzel text-lg font-bold text-white mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
