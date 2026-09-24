/**
 * Project Dossier Modal
 * Comprehensive architectural showcase with gallery, technical specifications,
 * floor plans, and VIP acquisition consultation desk.
 */

import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Building2,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  MapPin,
  Maximize2,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';

export const ProjectDossierModal: React.FC = () => {
  const { selectedProject, setSelectedProject, t, isRtl, submitInquiry } = useCms();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  if (!selectedProject) return null;

  const galleryImages = [
    selectedProject.mainImage,
    ...(selectedProject.gallery || []),
  ].filter(Boolean);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    submitInquiry({
      formType: 'project-inquiry',
      name,
      email,
      phone,
      projectName: t(selectedProject.name),
      message,
    });
    setInquirySubmitted(true);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl bg-[#111111] border border-[#2B2B2B] rounded-2xl shadow-2xl overflow-hidden my-auto text-[#F5F5F0] flex flex-col max-h-[92vh]">
        {/* Sticky Header */}
        <div className="px-6 py-4 border-b border-[#222222] bg-[#161616] flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                {t(selectedProject.name)}
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <MapPin className="w-3 h-3 text-[#C5A880]" />
                <span>{t(selectedProject.location)}</span>
                <span>·</span>
                <span className="text-[#C5A880]">{selectedProject.category}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-xs">
          {/* Main Visual Showcase with Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] bg-black/80 rounded-xl overflow-hidden border border-[#222222]">
              <img
                src={galleryImages[activeImageIndex] || selectedProject.mainImage}
                alt={t(selectedProject.name)}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <span className="absolute top-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-semibold text-[#C5A880] border border-[#333333]">
                {selectedProject.status}
              </span>

              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? galleryImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === galleryImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30'
                        : 'border-[#262626] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specifications Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#161616] border border-[#262626] rounded-xl">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                Built-up Area
              </span>
              <span className="font-mono text-base font-bold text-white">
                {selectedProject.specs.area}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                Residences / Units
              </span>
              <span className="font-mono text-base font-bold text-white">
                {selectedProject.specs.units || 'Custom Design'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                Delivery Timeline
              </span>
              <span className="font-mono text-base font-bold text-[#C5A880]">
                {selectedProject.specs.completion || 'Active Phase'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                Acquisition Volume
              </span>
              <span className="font-mono text-base font-bold text-[#C5A880]">
                {selectedProject.specs.investmentVolume || 'Price Upon Request'}
              </span>
            </div>
          </div>

          {/* Architectural Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Architectural Narrative & Design Ethos
              </h3>
              <p className="text-neutral-300 leading-relaxed text-sm">
                {t(selectedProject.fullDesc || selectedProject.shortDesc)}
              </p>

              {/* Amenities */}
              {selectedProject.amenities && selectedProject.amenities.length > 0 && (
                <div className="pt-4 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Curated Signature Amenities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 bg-[#161616] border border-[#222222] rounded-lg text-neutral-300"
                      >
                        <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct VIP Consultation Form (5 cols) */}
            <div className="md:col-span-5 bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <h4 className="font-semibold text-white text-sm">
                  {isRtl ? 'طلب استشارة استحواذ خاصة' : 'Private Acquisition Advisory'}
                </h4>
              </div>

              {inquirySubmitted ? (
                <div className="p-6 text-center bg-[#111111] border border-[#C5A880]/30 rounded-lg space-y-2">
                  <Check className="w-8 h-8 text-[#C5A880] mx-auto" />
                  <h5 className="font-semibold text-white">
                    {isRtl ? 'تم إرسال الطلب' : 'Briefing Requested'}
                  </h5>
                  <p className="text-[11px] text-neutral-400">
                    {isRtl
                      ? 'سيتواصل مستشاركم الشخصي معكم في أقرب وقت.'
                      : 'Our private client director will reach out with the confidential investment dossier.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-3">
                  <div>
                    <label className="block text-neutral-400 mb-1">
                      {isRtl ? 'الاسم' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">
                      {isRtl ? 'البريد الإلكتروني' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">
                      {isRtl ? 'رقم الهاتف' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966"
                      className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">
                      {isRtl ? 'ملاحظات' : 'Investment Notes'}
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'إرسال الطلب' : 'Request Private Dossier'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
