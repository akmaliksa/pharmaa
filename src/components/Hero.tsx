import React, { useState, useRef } from 'react';
import { SearchFilter, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  Search, 
  MapPin, 
  Home, 
  DollarSign, 
  BedDouble, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  filter: SearchFilter;
  onFilterChange: (newFilter: Partial<SearchFilter>) => void;
  onExecuteSearch: () => void;
  onExploreServices: () => void;
  language?: Language;
  translations?: any;
}

// Curated high-performance real estate architectural videos with fallback
const CINEMATIC_VIDEOS = [
  {
    title: 'Istanbul Waterfront & Bosphorus Modern Palace',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-exterior-41544-large.mp4',
    poster: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
  },
  {
    title: 'Minimalist Architectural Luxury Villa',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-modern-residential-house-with-pool-42581-large.mp4',
    poster: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85',
  },
  {
    title: 'Metropolitan Commercial & Skyline Tower',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-skyscrapers-in-a-business-district-at-dusk-41551-large.mp4',
    poster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
  }
];

export const Hero: React.FC<HeroProps> = ({
  filter,
  onFilterChange,
  onExecuteSearch,
  onExploreServices,
  language = 'en',
  translations,
}) => {
  const t = translations || TRANSLATIONS[language] || TRANSLATIONS.en;
  
  // Video player controls state
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const searchTabs = [
    { id: 'all', label: t.hero.searchTabs.all },
    { id: 'sale', label: t.hero.searchTabs.sale },
    { id: 'rent', label: t.hero.searchTabs.rent },
    { id: 'investment', label: t.hero.searchTabs.investment },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#05070B] pt-6 pb-16">
      
      {/* ========================================================================= */}
      {/* CINEMATIC FULLSCREEN VIDEO BACKGROUND (Awwwards "FIND Real Estate" Style) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!videoError ? (
          <video
            ref={videoRef}
            key={CINEMATIC_VIDEOS[currentVideoIdx].src}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onError={() => setVideoError(true)}
            poster={CINEMATIC_VIDEOS[currentVideoIdx].poster}
            className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 brightness-[0.62] contrast-[1.08]"
          >
            <source src={CINEMATIC_VIDEOS[currentVideoIdx].src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={CINEMATIC_VIDEOS[currentVideoIdx].poster}
            alt="Cinematic Real Estate Showcase"
            className="w-full h-full object-cover object-center brightness-50"
          />
        )}

        {/* Sophisticated Editorial Vignettes & Dark Gradients for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/50 to-[#05070B]/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#05070B]/40 to-[#05070B]/90" />
        <div className="absolute inset-0 backdrop-blur-[1.5px]" />
      </div>

      {/* Floating Video Control Bar (Play/Pause, Sound, Next Clip) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-2 flex items-center justify-between text-xs text-white/80">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300">
            Awwwards Inspired Interaction • Clip {currentVideoIdx + 1}/{CINEMATIC_VIDEOS.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Switch Video Reel Button */}
          <div className="hidden sm:flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10">
            {CINEMATIC_VIDEOS.map((clip, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentVideoIdx(idx)}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all ${
                  currentVideoIdx === idx
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause video' : 'Play video'}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-[#D4AF37] hover:text-black transition-all shadow-md"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-[#D4AF37] hover:text-black transition-all shadow-md"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Center Content Hero Typography */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center my-auto pt-8">
        
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/50 shadow-lg shadow-black/60 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-xs font-semibold tracking-widest text-[#F9F1D6] uppercase">
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Catchy Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl leading-[1.08] drop-shadow-2xl"
        >
          {t.hero.title1} <br />
          <span className="gold-gradient-text">{t.hero.titleHighlight}</span> {t.hero.title2}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-200/90 max-w-3xl font-light leading-relaxed drop-shadow-md"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#properties"
            className="px-7 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-[#070D1E] bg-gradient-to-r from-[#F9F1D6] via-[#D4AF37] to-[#C5A059] hover:from-white hover:to-[#E6CA65] shadow-xl shadow-[#D4AF37]/30 transition-all duration-300 hover:scale-105"
          >
            {t.nav.properties}
          </a>
          <button
            onClick={onExploreServices}
            className="px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wider text-white bg-black/60 backdrop-blur-md hover:bg-white/20 border border-white/25 hover:border-[#D4AF37] transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            <span>{t.nav.services}</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </motion.div>
      </div>

      {/* Floating Modern PropTech Interactive Search Bar */}
      <div className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="bg-black/75 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 md:p-6 shadow-2xl shadow-black text-left"
        >
          {/* Search Tabs */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              {searchTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onFilterChange({ status: tab.id })}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                    filter.status === tab.id
                      ? 'bg-[#D4AF37] text-black font-bold shadow-md shadow-[#D4AF37]/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              Turkey Prime Portfolio
            </span>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            
            {/* Location Selector */}
            <div className="bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 rounded-xl p-3 transition-colors">
              <label className="block text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{t.hero.searchPlaceholders.location}</span>
              </label>
              <select
                value={filter.location}
                onChange={(e) => onFilterChange({ location: e.target.value })}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="all" className="bg-[#0B142A] text-slate-200">{t.hero.searchPlaceholders.allLocations}</option>
                <option value="Istanbul" className="bg-[#0B142A] text-slate-200">Istanbul (Bebek, Levent, Nisantasi)</option>
                <option value="Bodrum" className="bg-[#0B142A] text-slate-200">Bodrum (Yalikavak Marina)</option>
                <option value="Antalya" className="bg-[#0B142A] text-slate-200">Antalya (Konyaalti Coast)</option>
                <option value="Sapanca" className="bg-[#0B142A] text-slate-200">Sapanca (Development Land)</option>
              </select>
            </div>

            {/* Property Category */}
            <div className="bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 rounded-xl p-3 transition-colors">
              <label className="block text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Home className="w-3.5 h-3.5" />
                <span>{t.hero.searchPlaceholders.propertyType}</span>
              </label>
              <select
                value={filter.type}
                onChange={(e) => onFilterChange({ type: e.target.value })}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="all" className="bg-[#0B142A] text-slate-200">{t.hero.searchPlaceholders.allTypes}</option>
                <option value="villa" className="bg-[#0B142A] text-slate-200">Luxury Villas & Mansions</option>
                <option value="apartment" className="bg-[#0B142A] text-slate-200">Apartments & Penthouses</option>
                <option value="commercial" className="bg-[#0B142A] text-slate-200">Commercial & Plazas</option>
                <option value="land" className="bg-[#0B142A] text-slate-200">Land Parcels & Subdivided Plots</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 rounded-xl p-3 transition-colors">
              <label className="block text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <BedDouble className="w-3.5 h-3.5" />
                <span>{t.hero.searchPlaceholders.bedrooms}</span>
              </label>
              <select
                value={filter.bedrooms}
                onChange={(e) => onFilterChange({ bedrooms: e.target.value })}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="any" className="bg-[#0B142A] text-slate-200">{t.hero.searchPlaceholders.anyBedrooms}</option>
                <option value="3" className="bg-[#0B142A] text-slate-200">3+ Bedrooms</option>
                <option value="4" className="bg-[#0B142A] text-slate-200">4+ Bedrooms</option>
                <option value="5" className="bg-[#0B142A] text-slate-200">5+ Luxury Suites</option>
              </select>
            </div>

            {/* Price Cap & Search Trigger */}
            <div className="flex gap-2">
              <div className="flex-1 bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 rounded-xl p-3 transition-colors">
                <label className="block text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{t.hero.searchPlaceholders.priceRange}</span>
                </label>
                <select
                  value={filter.maxPrice}
                  onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                  className="w-full bg-transparent text-sm text-white font-medium focus:outline-hidden cursor-pointer"
                >
                  <option value={10000000} className="bg-[#0B142A] text-slate-200">{t.hero.searchPlaceholders.allPrices}</option>
                  <option value={1000000} className="bg-[#0B142A] text-slate-200">Up to $1,000,000</option>
                  <option value={3000000} className="bg-[#0B142A] text-slate-200">Up to $3,000,000</option>
                  <option value={5000000} className="bg-[#0B142A] text-slate-200">Up to $5,000,000</option>
                </select>
              </div>

              <button
                onClick={onExecuteSearch}
                className="px-6 bg-gradient-to-br from-[#F9F1D6] to-[#D4AF37] hover:from-white hover:to-[#E6CA65] text-black rounded-xl font-bold flex items-center justify-center transition-transform hover:scale-105 shadow-xl shadow-[#D4AF37]/25 cursor-pointer"
                title={t.hero.searchPlaceholders.searchBtn}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Guarantee Badges */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.quickBadges.verifiedDeeds}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span>{t.hero.quickBadges.turkishCitizenship}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{t.hero.quickBadges.highRoi}</span>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};
