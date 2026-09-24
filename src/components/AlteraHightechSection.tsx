import React from 'react';
import { Cpu, Maximize, Zap, Sparkles, Building2, Layers, CheckCircle2, Shield, BatteryCharging } from 'lucide-react';
import { Language } from '../types';

interface AlteraHightechSectionProps {
  language: Language;
}

export const AlteraHightechSection: React.FC<AlteraHightechSectionProps> = ({ language }) => {
  const content = {
    en: {
      eyebrow: 'INNOVATION & ARCHITECTURAL PRECISION',
      title: 'Hightech Architecture & Smart Living Systems',
      subtitle: 'Following European engineering standards and modern architectural methodologies: Every project integrates intelligent home automation, sustainable building materials, and optimized floor plans for healthy living.',
      pillars: [
        {
          icon: Cpu,
          title: 'Smart Home Automation',
          description: 'Integrated KNX-based intelligent climate control, automated shading, digital biometric entry access, and intelligent lighting zones controllable via mobile applications.',
        },
        {
          icon: Maximize,
          title: 'The Perfect Space (Der Perfekte Raum)',
          description: 'Meticulously calculated floor layouts created by our dedicated in-house architects to maximize acoustic silence, natural sunlight angles, and seamless ergonomics.',
        },
        {
          icon: Zap,
          title: 'Energy Efficiency & EV Charging',
          description: 'Class-A thermal insulation facades, triple-glazed soundproof panorama windows, solar energy capture, and private dedicated electric vehicle charging stations.',
        },
        {
          icon: Building2,
          title: 'High-End Materials & In-House Architecture',
          description: 'Unlike standard regional developers, Akaber utilizes its own architectural team to design, supervise, and inspect construction from foundation to final interior trim.',
        },
      ],
      quoteTitle: 'Our Philosophy of Stress-Free Living',
      quoteText: '“A home must be more than four walls. It should promote well-being, optimize natural ventilation, and provide long-term capital preservation with cutting-edge German and European building standards applied in Turkey.”',
    },
    tr: {
      eyebrow: 'YENİLİK VE MİMARİ HASSASİYET',
      title: 'Yüksek Teknoloji Mimari ve Akıllı Yaşam Sistemleri',
      subtitle: 'Avrupa mühendislik standartları ve modern mimari yaklaşımlar: Her projemiz akıllı ev otomasyonu, sürdürülebilir yapı malzemeleri ve sağlıklı yaşam için optimize edilmiş kat planlarını bir araya getirir.',
      pillars: [
        {
          icon: Cpu,
          title: 'Akıllı Ev Otomasyonu',
          description: 'KNX tabanlı iklimlendirme, otomatik motorlu panjurlar, biyometrik kapı giriş sistemleri ve mobil cihazlardan tek dokunuşla yönetilen akıllı aydınlatma.',
        },
        {
          icon: Maximize,
          title: 'Kusursuz Yaşam Alanı (Der Perfekte Raum)',
          description: 'Bünyemizdeki mimarlar tarafından akustik konforu, doğal gün ışığı açılarını ve kullanım ergonomisini en üst düzeye çıkarmak için özenle tasarlanan planlar.',
        },
        {
          icon: Zap,
          title: 'Enerji Verimliliği ve Elektrikli Araç Şarjı',
          description: 'A-Sınıfı ısı yalıtımlı cephe sistemleri, 3 katmanlı akustik camlar, güneş enerjisi desteği ve her daire için özel elektrikli araç (EV) şarj altyapısı.',
        },
        {
          icon: Building2,
          title: 'Nitelikli Malzemeler & Şirket İçi Mimarlık',
          description: 'Standart piyasa geliştiricilerinin aksine Akaber, temelden anahtar teslimine kadar tüm süreci kendi uzman mimari ve mühendislik kadrosuyla yürütür.',
        },
      ],
      quoteTitle: 'Huzurlu ve Nitelikli Yaşam Felsefemiz',
      quoteText: '“Bir konut sadece dört duvardan ibaret değildir; sakinlerinin huzurunu artıran, sağlıklı bir iç mekan iklimi sağlayan ve uzun vadeli sermaye güvencesi sunan bir yaşam alanıdır.”',
    },
    ar: {
      eyebrow: 'الابتكار والدقة المعمارية الهندسية',
      title: 'الهندسة المعمارية عالية التقنية وأنظمة المعيشة الذكية',
      subtitle: 'وفق أعلى المعايير الهندسية الأوروبية: تدمج جميع مشاريعنا أحدث تقنيات المنازل الذكية، ومواد البناء المستدامة الصديقة للبيئة، مع تخطيط هندسي دقيق يوفر أقصى درجات الراحة والسكينة.',
      pillars: [
        {
          icon: Cpu,
          title: 'أنظمة المنازل الذكية المتكاملة',
          description: 'تحكم ذكي في درجات الحرارة والتهوية، ستائر كهربائية أوتوماتيكية، أقفال بيومترية متطورة، وإضاءة ذكية يتم التحكم بها عبر الهاتف الذكي.',
        },
        {
          icon: Maximize,
          title: 'المساحة الهندسية المثالية',
          description: 'مخططات معمارية مدروسة بدقة متناهية من قبل مهندسينا الداخليين لتحقيق العزل الصوتي الفائق وتدفق الإضاءة الطبيعية لجميع أرجاء المسكن.',
        },
        {
          icon: Zap,
          title: 'كفاءة الطاقة ومحطات شحن السيارات الكهربائية',
          description: 'عزل حراري من الفئة الأولى، نوافذ زجاجية ثلاثية مانعة للصوت، واستخدام الطاقة النظيفة مع توفير نقاط شحن للسيارات الكهربائية.',
        },
        {
          icon: Building2,
          title: 'فريق هندسي داخلي ومواد بناء ألمانية فائقة',
          description: 'على عكس الشركات التقليدية، تملك أكابر فريقها الهندسي والمعماري الخاص الذي يشرف على كل مرحلة من صب الأساسات حتى التشطيبات النهائية.',
        },
      ],
      quoteTitle: 'فلسفتنا: المعيشة الراقية بدون إجهاد',
      quoteText: '«المسكن ليس مجرد جدران خرسانية، بل هو فضاء متكامل يمنحك الراحة الصحية والاستقرار الذهني، ويحافظ على قيمته الرأسمالية بأحدث المعايير الهندسية المتبعة في أوروبا وتركيا.»',
    },
  }[language] || {
    eyebrow: 'INNOVATION & ARCHITECTURAL PRECISION',
    title: 'Hightech Architecture & Smart Living Systems',
    subtitle: 'Following European engineering standards and modern architectural methodologies: Every project integrates intelligent home automation, sustainable building materials, and optimized floor plans for healthy living.',
    pillars: [
      {
        icon: Cpu,
        title: 'Smart Home Automation',
        description: 'Integrated KNX-based intelligent climate control, automated shading, digital biometric entry access, and intelligent lighting zones controllable via mobile applications.',
      },
      {
        icon: Maximize,
        title: 'The Perfect Space (Der Perfekte Raum)',
        description: 'Meticulously calculated floor layouts created by our dedicated in-house architects to maximize acoustic silence, natural sunlight angles, and seamless ergonomics.',
      },
      {
        icon: Zap,
        title: 'Energy Efficiency & EV Charging',
        description: 'Class-A thermal insulation facades, triple-glazed soundproof panorama windows, solar energy capture, and private dedicated electric vehicle charging stations.',
      },
      {
        icon: Building2,
        title: 'High-End Materials & In-House Architecture',
        description: 'Unlike standard regional developers, Akaber utilizes its own architectural team to design, supervise, and inspect construction from foundation to final interior trim.',
      },
    ],
    quoteTitle: 'Our Philosophy of Stress-Free Living',
    quoteText: '“A home must be more than four walls. It should promote well-being, optimize natural ventilation, and provide long-term capital preservation with cutting-edge German and European building standards applied in Turkey.”',
  };

  return (
    <section id="hightech" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header in Altera Clean Style */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#008080] block mb-2">
            {content.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#111625] tracking-tight font-sans">
            {content.title}
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed font-normal">
            {content.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid like Altera's Hightech-Häuser Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-[#FAFAFA] border border-neutral-200 p-6 rounded hover:border-[#008080] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-white border border-neutral-200 flex items-center justify-center text-[#111625] group-hover:bg-[#008080] group-hover:text-white group-hover:border-[#008080] transition-colors mb-5 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111625] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center text-xs font-semibold text-[#008080] uppercase tracking-wider">
                  <span>Standard Feature</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophy Card - Stress-free Living */}
        <div className="mt-16 bg-[#111625] text-white p-8 md:p-12 rounded border border-neutral-800 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <span className="text-xs uppercase tracking-widest text-[#008080] font-bold block mb-2">
              {content.quoteTitle}
            </span>
            <blockquote className="text-lg sm:text-2xl font-light text-neutral-200 leading-relaxed italic">
              {content.quoteText}
            </blockquote>
            <div className="mt-6 flex items-center gap-3 text-xs text-neutral-400">
              <span className="w-8 h-px bg-[#008080]" />
              <span className="font-semibold text-white uppercase tracking-wider">
                Akaber Architectural Board & Development
              </span>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-5 pointer-events-none text-white">
            <Building2 className="w-96 h-96" />
          </div>
        </div>

      </div>
    </section>
  );
};
