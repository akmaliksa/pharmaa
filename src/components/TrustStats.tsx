import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface TrustStatsProps {
  language?: Language;
  translations?: any;
}

export const TrustStats: React.FC<TrustStatsProps> = ({ language = 'en', translations }) => {
  const t = translations || TRANSLATIONS[language] || TRANSLATIONS.en;

  const stats = [
    {
      icon: ShieldCheck,
      value: '100%',
      label: t.hero.quickBadges.verifiedDeeds,
      detail: t.stats.satisfactionSub,
    },
    {
      icon: Award,
      value: '15+',
      label: language === 'ar' ? 'عاماً من الثقة والريادة' : language === 'tr' ? 'Yıllık Sektör Güveni' : 'Years of Market Trust',
      detail: language === 'ar' ? 'تطوير عقاري تركي بمعايير عالمية' : language === 'tr' ? 'Türkiye pazarında köklü deneyim' : 'Pioneering Turkish property development',
    },
    {
      icon: Users,
      value: '1,200+',
      label: t.stats.clientSatisfaction,
      detail: language === 'ar' ? 'مستثمرون من الخليج وأوروبا وآسيا' : language === 'tr' ? 'Körfez, Avrupa ve Asya’dan yatırımcılar' : 'Investors from Gulf, Europe, & Asia',
    },
    {
      icon: TrendingUp,
      value: '$240M+',
      label: t.stats.acquired,
      detail: t.stats.annualReturnSub,
    }
  ];

  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#0B152E] border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/60"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`flex items-center gap-4 ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-[#0F1E3D] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-inner">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {item.value}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#F9F1D6] mt-0.5">
                    {item.label}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
