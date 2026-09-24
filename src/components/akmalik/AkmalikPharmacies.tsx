import React, { useState, useMemo } from 'react';
import { PHARMACY_LISTINGS } from '../../data/akmalikData';
import { PharmacyItem, LocationType } from '../../types/akmalik';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Euro, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  SlidersHorizontal, 
  ArrowUpRight, 
  Building2,
  Users,
  Maximize2,
  FilterX
} from 'lucide-react';

interface AkmalikPharmaciesProps {
  onSelectPharmacy: (pharmacy: PharmacyItem) => void;
  onOpenAlertModal: () => void;
}

export const AkmalikPharmacies: React.FC<AkmalikPharmaciesProps> = ({
  onSelectPharmacy,
  onOpenAlertModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedTurnover, setSelectedTurnover] = useState<string>('all');
  const [selectedLocationType, setSelectedLocationType] = useState<string>('all');
  const [onlyExclusive, setOnlyExclusive] = useState(false);
  const [onlyTurnkey, setOnlyTurnkey] = useState(false);

  // Extract unique regions
  const regions = useMemo(() => {
    const set = new Set(PHARMACY_LISTINGS.map((p) => p.region));
    return ['all', ...Array.from(set)];
  }, []);

  const locationTypes: (LocationType | 'all')[] = [
    'all',
    'Seaside',
    'City Center',
    'Borough',
    'Mountain',
    'Neighborhood',
  ];

  // Filtering
  const filteredPharmacies = useMemo(() => {
    return PHARMACY_LISTINGS.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchRef = item.ref.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchDept = item.department.toLowerCase().includes(q);
        if (!matchTitle && !matchRef && !matchLoc && !matchDept) return false;
      }

      // Region
      if (selectedRegion !== 'all' && item.region !== selectedRegion) {
        return false;
      }

      // Location Type
      if (selectedLocationType !== 'all' && item.locationType !== selectedLocationType) {
        return false;
      }

      // Turnover
      if (selectedTurnover === 'under_1_7m' && item.turnover >= 1700000) return false;
      if (
        selectedTurnover === '1_7m_to_3m' &&
        (item.turnover < 1700000 || item.turnover > 3000000)
      ) {
        return false;
      }
      if (selectedTurnover === 'above_3m' && item.turnover <= 3000000) return false;

      // Badges
      if (onlyExclusive && !item.isExclusive) return false;
      if (onlyTurnkey && !item.isTurnkey) return false;

      return true;
    });
  }, [
    searchQuery,
    selectedRegion,
    selectedTurnover,
    selectedLocationType,
    onlyExclusive,
    onlyTurnkey,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedTurnover('all');
    setSelectedLocationType('all');
    setOnlyExclusive(false);
    setOnlyTurnkey(false);
  };

  const formatEuro = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="buy" className="py-16 sm:py-24 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F5EF] text-[#09543D] text-xs font-bold uppercase tracking-wider">
            <span>Exclusive Listings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight">
            Our Pharmacies for Sale
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            Discover verified pharmacy opportunities with transparent financial metrics, proven footfall, and high EBITDA margins across France.
          </p>
        </div>

        {/* Filter and Search Bar Container */}
        <div className="bg-[#F8F6F0] rounded-3xl p-5 sm:p-7 border border-[#09543D]/15 shadow-sm mb-12 space-y-5">
          
          {/* Top row: search & primary dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city, ref #, keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm text-[#1E1E1E] placeholder:text-neutral-400 focus:outline-none focus:border-[#09543D] focus:ring-1 focus:ring-[#09543D]"
              />
            </div>

            {/* Region Dropdown */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm text-[#1E1E1E] focus:outline-none focus:border-[#09543D] focus:ring-1 focus:ring-[#09543D]"
              >
                <option value="all">All Regions</option>
                {regions
                  .filter((r) => r !== 'all')
                  .map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
              </select>
            </div>

            {/* Turnover Dropdown */}
            <div>
              <select
                value={selectedTurnover}
                onChange={(e) => setSelectedTurnover(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm text-[#1E1E1E] focus:outline-none focus:border-[#09543D] focus:ring-1 focus:ring-[#09543D]"
              >
                <option value="all">Any Annual Turnover</option>
                <option value="under_1_7m">Below €1.7M CA</option>
                <option value="1_7m_to_3m">Between €1.7M and €3M</option>
                <option value="above_3m">Above €3M CA</option>
              </select>
            </div>

            {/* Location Type Dropdown */}
            <div>
              <select
                value={selectedLocationType}
                onChange={(e) => setSelectedLocationType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm text-[#1E1E1E] focus:outline-none focus:border-[#09543D] focus:ring-1 focus:ring-[#09543D]"
              >
                <option value="all">All Location Types</option>
                {locationTypes
                  .filter((lt) => lt !== 'all')
                  .map((lt) => (
                    <option key={lt} value={lt}>
                      {lt}
                    </option>
                  ))}
              </select>
            </div>

          </div>

          {/* Bottom row: Feature pills & Reset button */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mr-2">
                Features:
              </span>
              <button
                type="button"
                onClick={() => setOnlyExclusive(!onlyExclusive)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  onlyExclusive
                    ? 'bg-[#09543D] text-[#FFFDF7]'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:border-[#09543D]'
                }`}
              >
                Exclusive Listings
              </button>
              <button
                type="button"
                onClick={() => setOnlyTurnkey(!onlyTurnkey)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  onlyTurnkey
                    ? 'bg-[#09543D] text-[#FFFDF7]'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:border-[#09543D]'
                }`}
              >
                Turnkey Operation
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-neutral-500">
                Found <strong className="text-[#09543D]">{filteredPharmacies.length}</strong>{' '}
                pharmacies
              </span>
              {(searchQuery ||
                selectedRegion !== 'all' ||
                selectedTurnover !== 'all' ||
                selectedLocationType !== 'all' ||
                onlyExclusive ||
                onlyTurnkey) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-[#461E10] transition-colors"
                >
                  <FilterX className="w-3.5 h-3.5" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Listings Grid */}
        {filteredPharmacies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPharmacies.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectPharmacy(item)}
                className="cursor-pointer group rounded-3xl bg-white border border-[#09543D]/15 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Image & Badges Container */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#04261C]/80 backdrop-blur-md text-[#FFFDF7] text-[11px] font-bold tracking-wider uppercase">
                      Ref. {item.ref}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.isExclusive && (
                        <span className="px-2 py-0.5 rounded-md bg-[#FFA9E9] text-[#09543D] text-[10px] font-extrabold uppercase tracking-wider">
                          Exclusive
                        </span>
                      )}
                      {item.isNew && (
                        <span className="px-2 py-0.5 rounded-md bg-[#09543D] text-[#FFFDF7] text-[10px] font-extrabold uppercase tracking-wider">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Image Overlay Tag */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[#FFFDF7]">
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#FFA9E9]" />
                      <span>{item.department}</span>
                      <span className="text-white/60">·</span>
                      <span className="text-white/90">{item.locationType}</span>
                    </div>
                    <span className="text-xs font-bold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded">
                      {item.surfaceSqM} m²
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#1E1E1E] group-hover:text-[#09543D] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Key Financial KPIs */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-100">
                    <div className="p-2.5 rounded-xl bg-[#F8F6F0]">
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                        Annual Turnover
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-[#09543D] tracking-tight">
                        {formatEuro(item.turnover)}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8F6F0]">
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                        Gross Margin
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-[#1E1E1E] tracking-tight">
                        {item.grossMarginPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      className="w-full py-2.5 rounded-xl bg-[#E6F5EF] group-hover:bg-[#09543D] text-[#09543D] group-hover:text-[#FFFDF7] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Dossier & Financials</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-[#F8F6F0] border border-[#09543D]/15 max-w-lg mx-auto space-y-4">
            <Building2 className="w-10 h-10 text-[#09543D] mx-auto opacity-40" />
            <h3 className="text-lg font-bold text-[#1E1E1E]">No pharmacies matched your filters</h3>
            <p className="text-xs text-neutral-600">
              Try broadening your criteria or reset the search to view all our opportunities.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2 rounded-full bg-[#09543D] text-[#FFFDF7] text-xs font-bold uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Off-Market Alert Banner */}
        <div className="mt-16 rounded-3xl bg-[#09543D] text-[#FFFDF7] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-white/15 text-[#FFA9E9] text-xs font-bold uppercase tracking-wider">
              Discreet Matching
            </span>
            <h3 className="text-2xl font-bold tracking-tight">
              Looking for a specific department or off-market opportunity?
            </h3>
            <p className="text-sm text-white/80 max-w-xl">
              Over 40% of pharmacy transactions close off-market without public advertisement. Share your criteria and be the first notified.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAlertModal}
            className="btn-bounce shrink-0 px-7 py-3.5 rounded-full bg-[#FFA9E9] hover:bg-white text-[#09543D] text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            Create Off-Market Alert
          </button>
        </div>

      </div>
    </section>
  );
};
