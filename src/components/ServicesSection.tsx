import React from 'react';
import { Map, Home, Store, LineChart, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ServicesSectionProps {
  onSelectServiceTab?: (serviceId: string) => void;
  language?: Language;
  translations?: any;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ language = 'en', translations }) => {
  const t = translations || TRANSLATIONS[language] || TRANSLATIONS.en;

  const services = [
    {
      id: 'land-development',
      icon: Map,
      badge: language === 'ar' ? 'تطوير الأراضي' : language === 'tr' ? 'Arazi Geliştirme' : 'Land Acquisition & Subdivision',
      title: t.services.item1.title,
      userDescription: t.services.item1.short,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      keyPoints: t.services.item1.points,
    },
    {
      id: 'renovation-resale',
      icon: Home,
      badge: language === 'ar' ? 'الترميم وإعادة البيع' : language === 'tr' ? 'Renovasyon & Satış' : 'Value-Add Renovation & Resale',
      title: t.services.item2.title,
      userDescription: t.services.item2.short,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      keyPoints: t.services.item2.points,
    },
    {
      id: 'commercial-rental',
      icon: Store,
      badge: language === 'ar' ? 'عقارات تجارية' : language === 'tr' ? 'Ticari Gayrimenkul' : 'Commercial Cash Flow',
      title: t.services.item3.title,
      userDescription: t.services.item3.short,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      keyPoints: t.services.item3.points,
    },
    {
      id: 'market-analysis',
      icon: LineChart,
      badge: language === 'ar' ? 'تحليل الفرص' : language === 'tr' ? 'Fırsat Analizi' : 'Strategic Intelligence',
      title: t.services.item4.title,
      userDescription: t.services.item4.short,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      keyPoints: t.services.item4.points,
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0A1128] relative border-t border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1E3D] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <span>🏢 {t.services.tag}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            {t.services.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            {t.services.subheading}
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, index) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-[#070D1E] border border-slate-800 hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10 flex flex-col justify-between"
              >
                <div>
                  {/* Card Visual Header */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-[#070D1E]/60 to-transparent" />
                    
                    {/* Badge Pill */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#070D1E]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{srv.badge}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white group-hover:text-[#F9F1D6] transition-colors">
                        {srv.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Exact User Text Highlight */}
                    <div className="p-4 rounded-xl bg-[#0F1E3D]/70 border border-[#D4AF37]/30 mb-5">
                      <p className="text-sm font-medium text-slate-100 leading-relaxed">
                        🔹 {srv.userDescription}
                      </p>
                    </div>

                    {/* Key Execution Points */}
                    <ul className="space-y-2.5">
                      {srv.keyPoints.map((point: string, pIdx: number) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 pb-6 pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors"
                  >
                    <span>{language === 'ar' ? 'تواصل مع فريق أكابر' : language === 'tr' ? 'Akaber ile Projeyi Görüşün' : 'Discuss Project with Akaber'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
