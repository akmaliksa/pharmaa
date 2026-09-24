import React, { useState } from 'react';
import { Property, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/properties';
import { MapPin, Bed, Bath, Maximize2, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface AlteraProjectsProps {
  properties: Property[];
  currency: Currency;
  onSelectProperty: (property: Property) => void;
  language: Language;
}

export const AlteraProjects: React.FC<AlteraProjectsProps> = ({
  properties,
  currency,
  onSelectProperty,
  language,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const content = {
    en: {
      eyebrow: 'PORTFOLIO & DEVELOPMENTS',
      title: 'Current Projects & Architectural Real Estate',
      subtitle: 'Explore our ongoing master developments, modernized waterfront villas, and prime commercial plots across Turkey.',
      tabs: {
        all: 'All Projects',
        villa: 'Residential & Villas',
        commercial: 'Commercial Plazas',
        land: 'Land & Subdivision',
      },
      viewDetails: 'View Project Dossier',
      specs: {
        area: 'Living Area',
        rooms: 'Bedrooms',
        baths: 'Bathrooms',
        developedBy: 'Developed & Supervised by Akaber',
      },
    },
    tr: {
      eyebrow: 'PORTFÖY VE GELİŞTİRME PROJELERİ',
      title: 'Güncel Projelerimiz ve Mimari Gayrimenkuller',
      subtitle: 'Türkiye genelinde geliştirdiğimiz müstakil villalar, arsa parselleri ve yüksek getirili ticari projeleri keşfedin.',
      tabs: {
        all: 'Tüm Projeler',
        villa: 'Konut & Villalar',
        commercial: 'Ticari Plazalar',
        land: 'Arsa & Parselasyon',
      },
      viewDetails: 'Proje Detaylarını İnceleyin',
      specs: {
        area: 'Kullanım Alanı',
        rooms: 'Oda Sayısı',
        baths: 'Banyo',
        developedBy: 'Akaber Tarafından Geliştirildi',
      },
    },
    ar: {
      eyebrow: 'المشاريع والمحفظة العقارية',
      title: 'المشاريع الحالية والتطويرات المعمارية في تركيا',
      subtitle: 'استكشف أحدث مشاريعنا المنجزة وقيد التطوير من فلل مطلة، أراضٍ مقسمة، ومجمعات تجارية حيوية.',
      tabs: {
        all: 'جميع المشاريع',
        villa: 'الفلل والقصور السكنية',
        commercial: 'المجمعات التجارية',
        land: 'الأراضي والتقسيم',
      },
      viewDetails: 'ملف تفاصيل المشروع',
      specs: {
        area: 'المساحة الإجمالية',
        rooms: 'الغرف',
        baths: 'الحمامات',
        developedBy: 'تطوير وإشراف شركة أكابر',
      },
    },
  }[language] || {
    eyebrow: 'PORTFOLIO & DEVELOPMENTS',
    title: 'Current Projects & Architectural Real Estate',
    subtitle: 'Explore our ongoing master developments, modernized waterfront villas, and prime commercial plots across Turkey.',
    tabs: {
      all: 'All Projects',
      villa: 'Residential & Villas',
      commercial: 'Commercial Plazas',
      land: 'Land & Subdivision',
    },
    viewDetails: 'View Project Dossier',
    specs: {
      area: 'Living Area',
      rooms: 'Bedrooms',
      baths: 'Bathrooms',
      developedBy: 'Developed & Supervised by Akaber',
    },
  };

  const filteredProperties = properties.filter((p) => {
    if (filterType === 'all') return true;
    return p.type === filterType;
  });

  const formatPrice = (priceUsd: number) => {
    const rateConfig = CURRENCY_RATES[currency];
    const rate = rateConfig?.rate ?? 1;
    const converted = Math.round(priceUsd * rate);
    const symbol = rateConfig?.symbol ?? '$';
    return `${symbol} ${converted.toLocaleString()}`;
  };

  return (
    <section id="projects" className="py-20 bg-[#F6F7F9] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008080] block mb-2">
              {content.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#111625] tracking-tight font-sans">
              {content.title}
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base">
              {content.subtitle}
            </p>
          </div>

          {/* Clean Filter Tabs in Altera Minimalist Style */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {Object.entries(content.tabs).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterType(key)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap ${
                  filterType === key
                    ? 'bg-[#111625] text-white'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid (Altera Style Real Estate Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col group"
            >
              
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-neutral-100">
                <img
                  src={prop.imageUrl}
                  alt={prop.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Location Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold text-[#111625] border border-neutral-200 rounded-xs flex items-center gap-1 shadow-2xs">
                  <MapPin className="w-3 h-3 text-[#008080]" />
                  <span>{prop.location}</span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3 bg-[#111625]/90 text-white text-[11px] font-bold uppercase px-2.5 py-1 rounded-xs tracking-wider">
                  {prop.status === 'sale' ? 'For Sale' : prop.status === 'rent' ? 'For Lease' : 'Investment'}
                </div>

                {/* Price Overlay Banner */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-neutral-300 block">
                      Price / Investment
                    </span>
                    <span className="text-xl font-bold font-sans">
                      {formatPrice(prop.priceUsd)}
                    </span>
                  </div>
                  {prop.roiPotential && (
                    <span className="text-xs bg-[#008080] text-white px-2 py-0.5 rounded font-semibold">
                      ROI {prop.roiPotential.split(' ')[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#111625] leading-snug group-hover:text-[#008080] transition-colors">
                    {prop.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500 line-clamp-2">
                    {prop.tagline}
                  </p>

                  {/* Architectural Specs */}
                  <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-neutral-100 text-center text-xs">
                    <div className="p-2 bg-[#FAFAFA] rounded">
                      <span className="text-neutral-400 block text-[10px] uppercase">{content.specs.area}</span>
                      <span className="font-bold text-[#111625]">{prop.areaSqm} m²</span>
                    </div>
                    <div className="p-2 bg-[#FAFAFA] rounded">
                      <span className="text-neutral-400 block text-[10px] uppercase">{content.specs.rooms}</span>
                      <span className="font-bold text-[#111625]">{prop.bedrooms ? `${prop.bedrooms} Bed` : 'Open'}</span>
                    </div>
                    <div className="p-2 bg-[#FAFAFA] rounded">
                      <span className="text-neutral-400 block text-[10px] uppercase">{content.specs.baths}</span>
                      <span className="font-bold text-[#111625]">{prop.bathrooms ? `${prop.bathrooms} Bath` : 'N/A'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-2 mb-4">
                    {prop.description}
                  </p>
                </div>

                {/* Card Action */}
                <button
                  onClick={() => onSelectProperty(prop)}
                  className="w-full py-2.5 px-4 bg-white hover:bg-[#111625] text-[#111625] hover:text-white border border-neutral-300 hover:border-[#111625] text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span>{content.viewDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
