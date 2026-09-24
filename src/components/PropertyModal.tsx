import React, { useState } from 'react';
import { Property, Currency } from '../types';
import { CURRENCY_RATES } from '../data/properties';
import { X, MapPin, Bed, Bath, Maximize2, ShieldCheck, CheckCircle2, Phone, Send, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PropertyModalProps {
  property: Property | null;
  currency: Currency;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  currency,
  onClose,
}) => {
  if (!property) return null;

  const [activeImage, setActiveImage] = useState<string>(property.imageUrl);
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: `Hello Akaber Team, I am interested in inquiring about ${property.title} in ${property.location}. Please provide the full investor dossier.`
  });

  const rateInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1 };
  const formattedPrice = `${rateInfo.symbol}${new Intl.NumberFormat('en-US').format(Math.round(property.priceUsd * rateInfo.rate))}${property.rentPeriod || ''}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-[#0B152E] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#070D1E] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest font-cinzel text-[#D4AF37]">
              Akaber Asset Dossier
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0F1E3D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Visual Image & Gallery Selector */}
          <div>
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-slate-800">
              <img
                src={activeImage}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {property.badges.map((b, i) => (
                  <span key={i} className="px-3 py-1 rounded-md text-xs font-bold uppercase bg-[#070D1E]/90 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            {property.gallery && property.gallery.length > 1 && (
              <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                {property.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#C5A059] mb-1">
                <MapPin className="w-4 h-4" />
                <span>{property.location}, {property.city}, {property.country}</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                {property.title}
              </h2>
              <p className="text-slate-300 text-sm mt-1">{property.tagline}</p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
                {formattedPrice}
              </div>
              {property.roiPotential && (
                <div className="text-xs font-semibold text-[#D4AF37] mt-0.5">
                  {property.roiPotential}
                </div>
              )}
            </div>
          </div>

          {/* Specs & Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {property.bedrooms && (
              <div className="bg-[#070D1E] p-3 rounded-xl border border-slate-800 text-center">
                <Bed className="w-4 h-4 mx-auto text-[#D4AF37] mb-1" />
                <span className="text-base font-bold text-white">{property.bedrooms}</span>
                <span className="block text-[11px] text-slate-400">Bedrooms</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="bg-[#070D1E] p-3 rounded-xl border border-slate-800 text-center">
                <Bath className="w-4 h-4 mx-auto text-[#D4AF37] mb-1" />
                <span className="text-base font-bold text-white">{property.bathrooms}</span>
                <span className="block text-[11px] text-slate-400">Bathrooms</span>
              </div>
            )}
            <div className="bg-[#070D1E] p-3 rounded-xl border border-slate-800 text-center">
              <Maximize2 className="w-4 h-4 mx-auto text-[#D4AF37] mb-1" />
              <span className="text-base font-bold text-white">{property.areaSqm}</span>
              <span className="block text-[11px] text-slate-400">Square Meters</span>
            </div>
            <div className="bg-[#070D1E] p-3 rounded-xl border border-slate-800 text-center">
              <ShieldCheck className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
              <span className="text-base font-bold text-white">Tapu Ready</span>
              <span className="block text-[11px] text-slate-400">Title Deed Guaranteed</span>
            </div>
          </div>

          {/* Description & Akaber Development Strategy */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#C5A059] font-semibold mb-2">
              Asset Strategy & Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {property.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#C5A059] font-semibold mb-2">
              Key Investment & Structural Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact / Inquire Form */}
          <div className="bg-[#070D1E] rounded-xl p-5 border border-[#D4AF37]/30">
            <h4 className="font-cinzel text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Inquire on this Asset / Schedule Private Viewing</span>
            </h4>

            {inquirySent ? (
              <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-sm">
                Thank you! Your inquiry for <strong>{property.title}</strong> has been registered with Akaber Senior Property Advisory. We will contact you shortly via WhatsApp and Email.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0B152E] border border-slate-800 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp / Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0B152E] border border-slate-800 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden"
                  />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0B152E] border border-slate-800 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden"
                />
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0B152E] border border-slate-800 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#070D1E] bg-gradient-to-r from-[#F9F1D6] via-[#D4AF37] to-[#C5A059] hover:from-white hover:to-[#E6CA65] flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.01]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Confidential Request</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
};
