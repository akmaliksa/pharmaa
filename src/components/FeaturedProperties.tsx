import React, { useState } from 'react';
import { Property, Currency, SearchFilter, Language } from '../types';
import { CURRENCY_RATES } from '../data/properties';
import { TRANSLATIONS } from '../data/translations';
import { MapPin, Bed, Bath, Maximize2, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FeaturedPropertiesProps {
  properties: Property[];
  currency: Currency;
  activeFilter: SearchFilter;
  onFilterChange: (newFilter: Partial<SearchFilter>) => void;
  onSelectProperty: (property: Property) => void;
  language?: Language;
  translations?: any;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  currency,
  activeFilter,
  onFilterChange,
  onSelectProperty,
  language = 'en',
  translations,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent' | 'investment'>('all');
  const t = translations || TRANSLATIONS[language] || TRANSLATIONS.en;

  // Filter properties based on active filters
  const filteredProperties = properties.filter((p) => {
    // Status tab filter
    if (activeTab !== 'all' && p.status !== activeTab) {
      return false;
    }
    // Search status filter if set
    if (activeFilter.status !== 'all' && p.status !== activeFilter.status) {
      return false;
    }
    // Location filter
    if (activeFilter.location !== 'all' && !p.location.toLowerCase().includes(activeFilter.location.toLowerCase()) && !p.city.toLowerCase().includes(activeFilter.location.toLowerCase())) {
      return false;
    }
    // Type filter
    if (activeFilter.type !== 'all' && p.type !== activeFilter.type) {
      return false;
    }
    // Price filter
    if (activeFilter.maxPrice && p.priceUsd > activeFilter.maxPrice) {
      return false;
    }
    // Bedrooms filter
    if (activeFilter.bedrooms !== 'any') {
      const minBeds = parseInt(activeFilter.bedrooms, 10);
      if (!p.bedrooms || p.bedrooms < minBeds) {
        return false;
      }
    }
    return true;
  });

  const formatPrice = (usd: number, period?: string) => {
    const rateInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1 };
    const converted = Math.round(usd * rateInfo.rate);
    const formatted = new Intl.NumberFormat('en-US').format(converted);
    return `${rateInfo.symbol}${formatted}${period ? period : ''}`;
  };

  return (
    <section id="properties" className="py-24 bg-[#070D1E] relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1E3D] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.properties.tag}</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              {t.properties.heading}
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl">
              {t.properties.subheading}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0B152E] p-1.5 rounded-xl border border-slate-800">
            {[
              { id: 'all', label: t.hero.searchTabs.all },
              { id: 'sale', label: t.hero.searchTabs.sale },
              { id: 'rent', label: t.hero.searchTabs.rent },
              { id: 'investment', label: t.hero.searchTabs.investment },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  onFilterChange({ status: tab.id });
                }}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF37] text-[#070D1E] font-bold shadow-md shadow-[#D4AF37]/20'
                    : 'text-slate-400 hover:text-white hover:bg-[#0F1E3D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-[#0B152E]/50 rounded-2xl border border-slate-800 p-8">
            <p className="text-slate-300 text-base font-medium">No properties match your current filter criteria.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                onFilterChange({
                  location: 'all',
                  type: 'all',
                  status: 'all',
                  maxPrice: 10000000,
                  bedrooms: 'any'
                });
              }}
              className="mt-4 px-5 py-2.5 rounded-lg bg-[#0F1E3D] hover:bg-[#16274e] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-[#0B152E] rounded-2xl overflow-hidden border border-slate-800/80 hover:border-[#D4AF37]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/10 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Card Image & Badges */}
                    <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => onSelectProperty(property)}>
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B152E] via-transparent to-black/40" />

                      {/* Top Badges (For Sale, Verified, Featured) */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {property.badges.slice(0, 2).map((badge, bIdx) => (
                            <span
                              key={bIdx}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md ${
                                badge.includes('Sale')
                                  ? 'bg-[#D4AF37] text-[#070D1E]'
                                  : badge.includes('Rent')
                                  ? 'bg-sky-500 text-white'
                                  : badge.includes('Investment') || badge.includes('ROI')
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#070D1E]/90 text-[#F9F1D6] border border-[#D4AF37]/30'
                              }`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#070D1E]/80 backdrop-blur-md text-[11px] font-medium text-[#D4AF37] border border-[#D4AF37]/30">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </span>
                      </div>

                      {/* Price Strip */}
                      <div className="absolute bottom-3 left-4">
                        <div className="text-xl sm:text-2xl font-bold font-cinzel text-white drop-shadow-md">
                          {formatPrice(property.priceUsd, property.rentPeriod)}
                        </div>
                        {property.roiPotential && (
                          <div className="text-[11px] font-medium text-[#D4AF37] flex items-center gap-1">
                            <span>★</span>
                            <span>{property.roiPotential}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-medium mb-1.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{property.location}, {property.country}</span>
                      </div>

                      <h3
                        onClick={() => onSelectProperty(property)}
                        className="font-cinzel text-lg font-bold text-white group-hover:text-[#F9F1D6] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {property.title}
                      </h3>

                      <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 leading-relaxed font-light">
                        {property.tagline}
                      </p>

                      {/* Specs Row: Bedrooms, Bathrooms, Area Sqm */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs text-slate-300">
                        {property.bedrooms ? (
                          <div className="flex flex-col items-center justify-center p-1.5 bg-[#070D1E]/60 rounded-lg">
                            <div className="flex items-center gap-1 text-[#D4AF37]">
                              <Bed className="w-3.5 h-3.5" />
                              <span className="font-semibold text-white">{property.bedrooms}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 mt-0.5">Beds</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-1.5 bg-[#070D1E]/60 rounded-lg">
                            <span className="text-[11px] font-bold text-[#D4AF37]">Zoned</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">Permitted</span>
                          </div>
                        )}

                        {property.bathrooms ? (
                          <div className="flex flex-col items-center justify-center p-1.5 bg-[#070D1E]/60 rounded-lg">
                            <div className="flex items-center gap-1 text-[#D4AF37]">
                              <Bath className="w-3.5 h-3.5" />
                              <span className="font-semibold text-white">{property.bathrooms}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 mt-0.5">Baths</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-1.5 bg-[#070D1E]/60 rounded-lg">
                            <span className="text-[11px] font-bold text-emerald-400">High ROI</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">Commercial</span>
                          </div>
                        )}

                        <div className="flex flex-col items-center justify-center p-1.5 bg-[#070D1E]/60 rounded-lg">
                          <div className="flex items-center gap-1 text-[#D4AF37]">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span className="font-semibold text-white">{property.areaSqm}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 mt-0.5">sq.m</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Card Action Footprint */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => onSelectProperty(property)}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#0F1E3D] hover:bg-[#16274e] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Full Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
