import React, { useState } from 'react';
import { PharmacyItem } from '../../types/akmalik';
import { 
  X, 
  MapPin, 
  Euro, 
  TrendingUp, 
  Users, 
  Maximize2, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Download,
  Lock,
  ArrowRight
} from 'lucide-react';

interface PharmacyDossierModalProps {
  pharmacy: PharmacyItem | null;
  onClose: () => void;
}

export const PharmacyDossierModal: React.FC<PharmacyDossierModalProps> = ({
  pharmacy,
  onClose,
}) => {
  const [ndaRequested, setNdaRequested] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  if (!pharmacy) return null;

  const formatEuro = (val?: number) => {
    if (!val) return 'Upon Request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleRequestNda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) return;
    setNdaRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#FFFDF7] rounded-3xl shadow-2xl border border-[#09543D]/20 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="relative h-64 sm:h-72 bg-neutral-900 shrink-0 overflow-hidden">
          <img
            src={pharmacy.image}
            alt={pharmacy.title}
            className="w-full h-full object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlay Details */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#09543D] text-white text-xs font-bold uppercase tracking-wider">
                Ref. {pharmacy.ref}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#FFA9E9] text-[#09543D] text-xs font-bold uppercase tracking-wider">
                {pharmacy.locationType}
              </span>
              {pharmacy.isExclusive && (
                <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider">
                  Exclusive Mandate
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {pharmacy.title}
            </h2>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
              <MapPin className="w-4 h-4 text-[#FFA9E9]" />
              <span>{pharmacy.location}</span>
              <span>·</span>
              <span>{pharmacy.department}</span>
              <span>·</span>
              <span>{pharmacy.region}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Key Indicators Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-neutral-200">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Annual Turnover
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#09543D]">
                {formatEuro(pharmacy.turnover)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-neutral-200">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Gross Margin
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#1E1E1E]">
                {pharmacy.grossMarginPercent}%
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-neutral-200">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Reconstituted EBITDA
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#09543D]">
                {formatEuro(pharmacy.ebitda)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-neutral-200">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Staff & Surface
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#1E1E1E]">
                {pharmacy.staffFte} FTE · {pharmacy.surfaceSqM} m²
              </span>
            </div>
          </div>

          {/* Description & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-[#1E1E1E]">
                Asset Overview & Commercial Potential
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {pharmacy.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#09543D]">
                  Key Strategic Strengths
                </span>
                <div className="space-y-2">
                  {pharmacy.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-[#09543D] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Confidential NDA & Dossier Request Box */}
            <div className="md:col-span-5 bg-[#09543D] text-[#FFFDF7] p-6 rounded-3xl space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-[#FFA9E9]">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Confidential Memorandum
                </span>
              </div>

              <h4 className="text-lg font-bold text-white leading-snug">
                Receive Full Financial Audit & Balance Sheets
              </h4>

              {ndaRequested ? (
                <div className="p-4 rounded-2xl bg-white/10 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#FFA9E9] mx-auto" />
                  <p className="text-xs text-white leading-relaxed">
                    Thank you! The electronic Non-Disclosure Agreement (NDA) has been sent to <strong>{buyerEmail}</strong>. Once signed, the complete dossier will unlock immediately.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestNda} className="space-y-3">
                  <p className="text-xs text-white/80 leading-relaxed">
                    Enter your credentials to receive the electronic NDA and unlock complete balance sheets.
                  </p>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name (Dr. Pharmacist)"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white text-neutral-900 text-xs focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white text-neutral-900 text-xs focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone Number"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white text-neutral-900 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full btn-bounce py-2.5 rounded-xl bg-[#FFA9E9] hover:bg-white text-[#09543D] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Request Confidential NDA</span>
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
