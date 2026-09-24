import React from 'react';
import { Map, Hammer, Store, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface AlteraServicesProps {
  language: Language;
}

export const AlteraServices: React.FC<AlteraServicesProps> = ({ language }) => {
  const content = {
    en: {
      eyebrow: 'DEVELOPMENT CAPABILITIES & SERVICES',
      title: 'Our Core Specializations in Turkey',
      subtitle: 'Our company specializes in real estate development and investment in Turkey. We analyze real estate opportunities, purchase suitable assets, develop them, and then resell or lease them, depending on the nature of each project.',
      services: [
        {
          num: '01',
          icon: Map,
          title: 'Purchasing Large Land & Subdivision',
          lead: 'Purchasing large plots of land, dividing them into smaller parcels, and selling them separately.',
          description: 'We acquire strategically positioned agricultural and residential land parcels in developing regions such as Sapanca, Bodrum, and Istanbul peripheries, handle municipal zoning and title approvals, and divide them into high-value ready-to-build plots.',
          points: [
            'Municipal zoning & subdivision permits',
            'Infrastructure and road connectivity',
            'Surveying and parcel title deed creation',
            'Subdivided plot resale with substantial profit margins',
          ],
        },
        {
          num: '02',
          icon: Hammer,
          title: 'Purchasing & Restoring Luxury Properties',
          lead: 'Purchasing old or unfinished homes or villas, renovating and improving them, and then reselling them at a higher price.',
          description: 'Our architectural team identifies undervalued villas and historic properties in prime locations. We reconstruct interiors with premium marble, smart automation, private landscaping, and high-efficiency climate systems to capture maximum market valuation.',
          points: [
            'Structural integrity and architectural redesign',
            'Luxury high-end interior finishes & amenities',
            'Turnkey transformation for domestic and foreign buyers',
            'Rapid capital turnaround upon completed sale',
          ],
        },
        {
          num: '03',
          icon: Store,
          title: 'Developing Commercial Real Estate & Leasing',
          lead: 'Developing commercial properties (such as shops or offices) and leasing them to generate steady income.',
          description: 'We construct and upgrade modern commercial plazas, street-level retail units, and corporate offices in thriving business corridors, securing 5-to-10 year triple-net leases with international and institutional tenants.',
          points: [
            'Prime footfall and transit-adjacent locations',
            'Triple-Net corporate lease structuring',
            'Long-term inflation-indexed dollar rental streams',
            'Professional on-site property & facility management',
          ],
        },
        {
          num: '04',
          icon: TrendingUp,
          title: 'Strategic Market Analysis & Reselling',
          lead: 'Analyzing real estate opportunities, purchasing suitable assets, and timing optimal exits.',
          description: 'Leveraging proprietary market data, demographic flow analyses, and macroeconomic forecasting, our investment desk evaluates property valuations to purchase below replacement cost and resell at market peaks.',
          points: [
            'Independent due diligence and asset valuation',
            'Turkish Citizenship by Investment qualification',
            'Tax optimization and foreign investor legal escrow',
            'Bespoke exit strategies for institutional capital',
          ],
        },
      ],
    },
    tr: {
      eyebrow: 'GELİŞTİRME YETKİNLİKLERİ VE HİZMETLER',
      title: 'Türkiye’deki Temel Uzmanlık Alanlarımız',
      subtitle: 'Şirketimiz Türkiye’de gayrimenkul geliştirme ve yatırım alanında uzmanlaşmıştır. Gayrimenkul fırsatlarını analiz eder, uygun varlıkları satın alır, geliştirir ve ardından her projenin niteliğine göre yeniden satar veya kiralarız.',
      services: [
        {
          num: '01',
          icon: Map,
          title: 'Geniş Arazi Satın Alımı ve Parselasyon',
          lead: 'Geniş araziler satın alıp bunları daha küçük parsellere bölerek ayrı ayrı satmak.',
          description: 'Sapanca, Bodrum ve İstanbul çevre akslarında imar potansiyeli yüksek geniş arsaları satın alıyor; tüm alt yapı, yol ve ifraz işlemlerini tamamlayarak ruhsatlı konut parselleri halinde satışa sunuyoruz.',
          points: [
            'İmar planlama ve resmi ifraz işlemleri',
            'Altyapı ve çevre yolları düzenlemesi',
            'Müstakil parsel tapularının çıkarılması',
            'Yüksek katma değerle parsel satışları',
          ],
        },
        {
          num: '02',
          icon: Hammer,
          title: 'Mülk Satın Alımı, Yenileme ve Değer Artışı',
          lead: 'Eski veya tamamlanmamış evleri/villaları satın alıp yenileyerek ve geliştirerek daha yüksek fiyata satmak.',
          description: 'Mimarlık ekibimiz cazip lokasyonlardaki eski yapıları tespit eder. İç mekanları lüks malzemeler, akıllı bina sistemleri ve modern peyzajla baştan yaratarak piyasa değerinin üzerinde hızla elden çıkarırız.',
          points: [
            'Statik güçlendirme ve modern mimari tasarım',
            'Birinci sınıf iç mekan malzeme ve donatıları',
            'Yatırımcıya anahtar teslim hazır yaşam',
            'Yenileme sonrası yüksek karlı hızlı satış',
          ],
        },
        {
          num: '03',
          icon: Store,
          title: 'Ticari Gayrimenkul Geliştirme ve Kiralama',
          lead: 'Ticari mülkler (dükkan, ofis vb.) geliştirip düzenli gelir elde etmek için kiraya vermek.',
          description: 'İş merkezleri ve perakende akslarında modern ticari plazalar inşa ediyor; kurumsal şirketlerle uzun dönemli döviz bazlı kira sözleşmeleri imzalayarak kesintisiz nakit akışı oluşturuyoruz.',
          points: [
            'Yüksek tabela değeri ve yaya trafiği',
            'Kurumsal kiracılı uzun vadeli kontratlar',
            'Enflasyona karşı korumalı düzenli kira getirisi',
            'Kapsamlı mülk ve tesis yönetimi',
          ],
        },
        {
          num: '04',
          icon: TrendingUp,
          title: 'Stratejik Piyasa Analizi ve Fırsat Değerlendirme',
          lead: 'Gayrimenkul fırsatlarını analiz etmek, uygun varlıkları satın almak ve en doğru zamanda realize etmek.',
          description: 'Kapsamlı bölgesel veriler, değerleme raporları ve makroekonomik öngörülerle piyasa değerinin altındaki fırsatları portföye katar, değer artışı tepe noktasındayken karlı çıkışlar sağlarız.',
          points: [
            'Bağımsız ekspertiz ve hukuki inceleme',
            'Yatırım yoluyla Türk Vatandaşlığı uygunluğu',
            'Yabancı yatırımcılar için güvenli emanet hesabı (Escrow)',
            'Yüksek getirili sermaye çıkış stratejileri',
          ],
        },
      ],
    },
    ar: {
      eyebrow: 'القدرات التطويرية والخدمات الاستثمارية',
      title: 'مجالات تخصصنا الرئيسية في تركيا',
      subtitle: 'تتخصص شركتنا في التطوير العقاري والاستثمار في تركيا. نقوم بدراسة الفرص العقارية، وشراء الأصول المناسبة، وتطويرها، ثم إعادة بيعها أو تأجيرها وفقاً لطبيعة كل مشروع.',
      services: [
        {
          num: '01',
          icon: Map,
          title: 'شراء الأراضي الكبيرة وتقسيمها',
          lead: 'شراء قطع أراضٍ كبيرة وتقسيمها إلى قطع أصغر وبيعها بشكل منفصل.',
          description: 'نستحوذ على مساحات أراضٍ استراتيجية واعدة في صبنجة، بودروم، وضواحي إسطنبول، ونقوم بفرزها وتطوير بنيتها التحتية وتجزئتها إلى مخططات سكنية مرخصة جاهزة للبناء.',
          points: [
            'استخراج تراخيص التقسيم والتنظيم البلدي',
            'تجهيز البنية التحتية وخطوط الخدمات',
            'إصدار صكوك ملكية (طابو) مستقلة لكل قطعة',
            'إعادة البيع بعوائد ربحية استثنائية',
          ],
        },
        {
          num: '02',
          icon: Hammer,
          title: 'شراء وتجديد الفلل والمنازل الفاخرة',
          lead: 'شراء منازل أو فلل قديمة أو غير مكتملة، وتجديدها وتحسينها، ثم إعادة بيعها بسعر أعلى.',
          description: 'يقوم فريقنا الهندسي باقتناص الفلل الواقعة في أرقى المواقع وتحديثها كلياً باستخدام أفخر أنواع الرخام، والأنظمة الذكية، والمسابح الخاصة، لإعادة طرحها في السوق بقيمة مضاعفة.',
          points: [
            'إعادة تصميم معماري وهندسي متكامل',
            'تشطيبات فاخرة وتجهيزات حديثة بأعلى المواصفات',
            'جاهزية كاملة للتسليم الفوري للسكن والاستثمار',
            'تحقيق عوائد سريعة عند إعادة البيع',
          ],
        },
        {
          num: '03',
          icon: Store,
          title: 'تطوير وتأجير العقارات التجارية',
          lead: 'تطوير عقارات تجارية (مثل المحلات أو المكاتب) وتأجيرها لتحقيق دخل ثابت.',
          description: 'بناء وتطوير مجمعات تجارية ومكاتب ذكية في أهم الشرايين الحيوية، وتأجيرها لشركات وعلامات تجارية كبرى بعقود طويلة الأجل تضمن تدفقات مالية دورية مستقرة.',
          points: [
            'مواقع استراتيجية على الطرق الرئيسية والمواصلات',
            'عقود إيجار مؤسسية طويلة الأجل',
            'عوائد إيجارية مجزية بالدولار ومقاومة للتضخم',
            'إدارة متكاملة للمباني والمستأجرين',
          ],
        },
        {
          num: '04',
          icon: TrendingUp,
          title: 'التحليل الاستراتيجي واقتناص الفرص العقارية',
          lead: 'دراسة وتحليل الفرص العقارية، وشراء الأصول المناسبة، وتوقيت البيع المثالي.',
          description: 'استناداً إلى دراسات الجدوى الميدانية وتحليلات السوق الدقيقة، نحدد الأصول التي تباع بأقل من قيمتها الحقيقية لنطورها ونحقق أعلى عائد استثماري للمستثمرين.',
          points: [
            'تدقيق قانوني شامل وسلامة صكوك الملكية',
            'تأهيل العقار للحصول على الجنسية التركية للمستثمر',
            'حسابات ضمان مالي وقانوني آمنة للمستثمرين الأجانب',
            'استراتيجيات خروج واضحة ومدروسة بأرباح مؤكدة',
          ],
        },
      ],
    },
  }[language] || {
    eyebrow: 'DEVELOPMENT CAPABILITIES & SERVICES',
    title: 'Our Core Specializations in Turkey',
    subtitle: 'Our company specializes in real estate development and investment in Turkey. We analyze real estate opportunities, purchase suitable assets, develop them, and then resell or lease them, depending on the nature of each project.',
    services: [
      {
        num: '01',
        icon: Map,
        title: 'Purchasing Large Land & Subdivision',
        lead: 'Purchasing large plots of land, dividing them into smaller parcels, and selling them separately.',
        description: 'We acquire strategically positioned agricultural and residential land parcels in developing regions such as Sapanca, Bodrum, and Istanbul peripheries, handle municipal zoning and title approvals, and divide them into high-value ready-to-build plots.',
        points: [
          'Municipal zoning & subdivision permits',
          'Infrastructure and road connectivity',
          'Surveying and parcel title deed creation',
          'Subdivided plot resale with substantial profit margins',
        ],
      },
      {
        num: '02',
        icon: Hammer,
        title: 'Purchasing & Restoring Luxury Properties',
        lead: 'Purchasing old or unfinished homes or villas, renovating and improving them, and then reselling them at a higher price.',
        description: 'Our architectural team identifies undervalued villas and historic properties in prime locations. We reconstruct interiors with premium marble, smart automation, private landscaping, and high-efficiency climate systems to capture maximum market valuation.',
        points: [
          'Structural integrity and architectural redesign',
          'Luxury high-end interior finishes & amenities',
          'Turnkey transformation for domestic and foreign buyers',
          'Rapid capital turnaround upon completed sale',
        ],
      },
      {
        num: '03',
        icon: Store,
        title: 'Developing Commercial Real Estate & Leasing',
        lead: 'Developing commercial properties (such as shops or offices) and leasing them to generate steady income.',
        description: 'We construct and upgrade modern commercial plazas, street-level retail units, and corporate offices in thriving business corridors, securing 5-to-10 year triple-net leases with international and institutional tenants.',
        points: [
          'Prime footfall and transit-adjacent locations',
          'Triple-Net corporate lease structuring',
          'Long-term inflation-indexed dollar rental streams',
          'Professional on-site property & facility management',
        ],
      },
      {
        num: '04',
        icon: TrendingUp,
        title: 'Strategic Market Analysis & Reselling',
        lead: 'Analyzing real estate opportunities, purchasing suitable assets, and timing optimal exits.',
        description: 'Leveraging proprietary market data, demographic flow analyses, and macroeconomic forecasting, our investment desk evaluates property valuations to purchase below replacement cost and resell at market peaks.',
        points: [
          'Independent due diligence and asset valuation',
          'Turkish Citizenship by Investment qualification',
          'Tax optimization and foreign investor legal escrow',
          'Bespoke exit strategies for institutional capital',
        ],
      },
    ],
  };

  return (
    <section id="services" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#008080] block mb-2">
            {content.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#111625] tracking-tight font-sans">
            {content.title}
          </h2>
          <div className="mt-4 p-4 bg-[#FAFAFA] border-l-2 border-[#008080] rounded-r">
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* 4 Core Services in Clean Architectural Editorial Layout (Altera Style) */}
        <div className="space-y-8">
          {content.services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAFAFA] border border-neutral-200 p-8 rounded hover:border-neutral-300 hover:shadow-md transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Service Number & Icon */}
                  <div className="lg:col-span-4 flex items-start gap-4">
                    <span className="text-3xl font-mono font-bold text-[#008080]">
                      {srv.num}
                    </span>
                    <div>
                      <div className="w-10 h-10 rounded bg-white border border-neutral-200 flex items-center justify-center text-[#111625] mb-3 shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-[#111625]">
                        {srv.title}
                      </h3>
                      {/* Direct Lead Quote from User */}
                      <p className="mt-2 text-xs font-semibold text-[#008080] leading-relaxed">
                        “{srv.lead}”
                      </p>
                    </div>
                  </div>

                  {/* Service Description & Bullets */}
                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                      {srv.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {srv.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-neutral-600">
                          <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
