import React from 'react';
import { ArrowRight, Compass, Building, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface AlteraHeroProps {
  language: Language;
}

export const AlteraHero: React.FC<AlteraHeroProps> = ({ language }) => {
  const content = {
    en: {
      badge: 'ARCHITECTURAL REAL ESTATE DEVELOPER & INVESTMENT',
      title: 'Modern Architecture & Sophisticated Living Spaces in Turkey',
      lead: 'Our company specializes in real estate development and investment in Turkey. We analyze real estate opportunities, purchase suitable assets, develop them, and then resell or lease them, depending on the nature of each project.',
      ctaPrimary: 'View Projects & Properties',
      ctaSecondary: 'Development & Services',
      features: [
        'Dedicated In-House Architectural & Engineering Team',
        'High-Tech Sustainable Construction & Smart Living',
        'From Land Subdivision to Luxury Villa Renovations',
        'Complete Title Deed Legal Security & Citizenship by Investment',
      ],
      stats: [
        { label: 'Active Developments', value: '18+' },
        { label: 'Average Capital Yield', value: '11.8%' },
        { label: 'Prime Regions', value: 'Istanbul & Aegean' },
        { label: 'Quality Guarantee', value: '100% Verified' },
      ],
    },
    tr: {
      badge: 'MİMARİ GAYRİMENKUL GELİŞTİRME VE YATIRIM',
      title: 'Türkiye’de Modern Mimari ve Nitelikli Yaşam Alanları',
      lead: 'Şirketimiz Türkiye’de gayrimenkul geliştirme ve yatırım alanında uzmanlaşmıştır. Gayrimenkul fırsatlarını analiz eder, uygun varlıkları satın alır, geliştirir ve ardından her projenin niteliğine göre yeniden satar veya kiralarız.',
      ctaPrimary: 'Projeleri İnceleyin',
      ctaSecondary: 'Geliştirme & Hizmetler',
      features: [
        'Bünyemizde Özel Mimarlık ve Mühendislik Ekibi',
        'Yüksek Teknoloji, Sürdürülebilir Yapı ve Akıllı Yaşam',
        'Arsa Bölümlemesinden Lüks Villa Yenilemelerine',
        'Eksiksiz Tapu Güvencesi ve Yatırım Yoluyla Vatandaşlık',
      ],
      stats: [
        { label: 'Aktif Geliştirme Projesi', value: '18+' },
        { label: 'Ortalama Sermaye Getirisi', value: '%11.8' },
        { label: 'Öncelikli Bölgeler', value: 'İstanbul & Ege' },
        { label: 'Kalite Güvencesi', value: '%100 Doğrulanmış' },
      ],
    },
    ar: {
      badge: 'التطوير العقاري المعماري والاستثمار المتميز',
      title: 'هندسة معمارية حديثة ومساحات معيشية راقية في تركيا',
      lead: 'تتخصص شركتنا في التطوير العقاري والاستثمار في تركيا. نقوم بدراسة الفرص العقارية، وشراء الأصول المناسبة، وتطويرها، ثم إعادة بيعها أو تأجيرها وفقاً لطبيعة كل مشروع.',
      ctaPrimary: 'استعراض المشاريع والعقارات',
      ctaSecondary: 'خدمات التطوير والاستثمار',
      features: [
        'فريق هندسي ومعماري متخصص متكامل داخل الشركة',
        'بناء عالي التقنية مستدام ومنازل ذكية متطورة',
        'من تقسيم وشراء الأراضي إلى تجديد وترقية الفلل الفاخرة',
        'ضمان قانوني كامل للطابو وبرنامج الجنسية التركية الاستثماري',
      ],
      stats: [
        { label: 'مشاريع تطوير نشطة', value: '+18' },
        { label: 'متوسط العائد الرأسمالي', value: '%11.8' },
        { label: 'المناطق الاستراتيجية', value: 'إسطنبول وبودروم' },
        { label: 'ضمان الجودة', value: 'موثق 100%' },
      ],
    },
  }[language] || {
    badge: 'ARCHITECTURAL REAL ESTATE DEVELOPER & INVESTMENT',
    title: 'Modern Architecture & Sophisticated Living Spaces in Turkey',
    lead: 'Our company specializes in real estate development and investment in Turkey. We analyze real estate opportunities, purchase suitable assets, develop them, and then resell or lease them, depending on the nature of each project.',
    ctaPrimary: 'View Projects & Properties',
    ctaSecondary: 'Development & Services',
    features: [
      'Dedicated In-House Architectural & Engineering Team',
      'High-Tech Sustainable Construction & Smart Living',
      'From Land Subdivision to Luxury Villa Renovations',
      'Complete Title Deed Legal Security & Citizenship by Investment',
    ],
    stats: [
      { label: 'Active Developments', value: '18+' },
      { label: 'Average Capital Yield', value: '11.8%' },
      { label: 'Prime Regions', value: 'Istanbul & Aegean' },
      { label: 'Quality Guarantee', value: '100% Verified' },
    ],
  };

  return (
    <section className="relative bg-[#FAFAFA] border-b border-neutral-200 overflow-hidden">
      
      {/* Altera Style Large Minimalist Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Sub-Badge in Altera Style */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 shadow-xs text-xs font-semibold tracking-wider text-[#008080] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008080]" />
              <span>{content.badge}</span>
            </div>

            {/* Clean, High-Contrast Architectural Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-[#111625] leading-[1.18] font-sans">
              {content.title}
            </h1>

            {/* Exact Company Core Description specified by user */}
            <div className="p-6 bg-white border-l-4 border-[#008080] shadow-sm rounded-r">
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                {content.lead}
              </p>
            </div>

            {/* Bullet points: In-house architects, modern tech, layout precision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {content.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="px-7 py-3.5 bg-[#111625] hover:bg-[#008080] text-white text-sm font-semibold tracking-wider uppercase rounded transition-colors shadow-sm flex items-center gap-2 group"
              >
                <span>{content.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="px-7 py-3.5 bg-white hover:bg-neutral-100 text-[#111625] border border-neutral-300 text-sm font-semibold tracking-wider uppercase rounded transition-colors"
              >
                {content.ctaSecondary}
              </a>
            </div>

          </div>

          {/* Right Architectural Visual in Altera Style */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85"
                alt="Altera Style Modern Architecture"
                className="w-full h-[460px] object-cover object-center brightness-95 contrast-[1.03] hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay architectural tag */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 border border-neutral-200 text-xs font-bold uppercase tracking-wider text-[#111625] shadow-sm">
                AKABER ARCHITECTURE • ISTANBUL
              </div>

              {/* Bottom Details Card like Altera Projekt Card */}
              <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-5 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#008080]">
                      PROJECT SPOTLIGHT
                    </span>
                    <h4 className="text-base font-bold text-[#111625]">
                      The Bosphorus Waterfront Residence
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Bebek Coast • Renovated & Developed by Akaber
                    </p>
                  </div>
                  <a
                    href="#projects"
                    className="w-9 h-9 rounded bg-[#111625] text-white flex items-center justify-center hover:bg-[#008080] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Geometric Accent Line */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-[#008080] pointer-events-none" />
          </div>

        </div>

        {/* Stats Grid under Hero */}
        <div className="mt-16 pt-10 border-t border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          {content.stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded border border-neutral-200 shadow-2xs">
              <span className="block text-2xl sm:text-3xl font-bold text-[#111625] tracking-tight font-sans">
                {stat.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
