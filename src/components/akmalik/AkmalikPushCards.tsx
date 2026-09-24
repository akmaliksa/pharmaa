import React from 'react';
import { ArrowRight, Sparkles, Building, Key } from 'lucide-react';

interface AkmalikPushCardsProps {
  onOpenValuation: () => void;
  onScrollToPharmacies: () => void;
}

export const AkmalikPushCards: React.FC<AkmalikPushCardsProps> = ({
  onOpenValuation,
  onScrollToPharmacies,
}) => {
  return (
    <section id="sell" className="py-12 sm:py-16 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: For Sellers */}
          <div className="rounded-[2.25rem] bg-[#461E10] text-[#FFFDF7] p-8 sm:p-12 relative overflow-hidden shadow-xl flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
            {/* Playful Floating Hand in Corner */}
            <div className="absolute top-4 right-4 w-24 h-24 sm:w-28 sm:h-28 opacity-20 pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <img
                src="/images/akmalik/hands-heart.svg"
                alt="Heart hand gesture"
                className="w-full h-full filter invert"
              />
            </div>

            <div className="space-y-4 relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFA9E9] text-xs font-bold uppercase tracking-wider">
                <Key className="w-3.5 h-3.5" />
                <span>Pharmacy Owners & Sellers</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Need a change of scenery?{' '}
                <span className="text-[#FFA9E9]">Ready to sell?</span>
              </h3>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                Crystallize the true value of your career's dedication. We connect you with verified, financially vetted buyers under absolute Non-Disclosure Agreement (NDA) discretion.
              </p>

              <div className="pt-2 text-xs text-white/70 space-y-1">
                <p>✓ 100% Confidential valuation within 48 hours</p>
                <p>✓ Pre-qualified buyers with verified equity contribution</p>
                <p>✓ Gentle, stress-free staff transition coaching</p>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <button
                type="button"
                onClick={onOpenValuation}
                className="btn-bounce inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FFA9E9] hover:bg-white text-[#461E10] text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Value My Pharmacy for Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: For Buyers */}
          <div className="rounded-[2.25rem] bg-[#09543D] text-[#FFFDF7] p-8 sm:p-12 relative overflow-hidden shadow-xl flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
            {/* Playful Floating Hand in Corner */}
            <div className="absolute top-4 right-4 w-24 h-24 sm:w-28 sm:h-28 opacity-20 pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <img
                src="/images/akmalik/hands-ok.svg"
                alt="OK hand gesture"
                className="w-full h-full filter invert"
              />
            </div>

            <div className="space-y-4 relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFA9E9] text-xs font-bold uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" />
                <span>First-Time Buyers & Investors</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Ready to take the leap?{' '}
                <span className="text-[#FFA9E9]">Become an owner.</span>
              </h3>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                Discover pre-audited pharmacies offering prime commercial locations, healthy gross margins, and immediate cash flow. We build your bank financing file from A to Z.
              </p>

              <div className="pt-2 text-xs text-white/70 space-y-1">
                <p>✓ Audited balance sheets with reconstituted EBITDA</p>
                <p>✓ Negotiated bank loan terms with specialized healthcare lenders</p>
                <p>✓ Day-1 practical coaching and groupement advisory</p>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <button
                type="button"
                onClick={onScrollToPharmacies}
                className="btn-bounce inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FFFDF7] hover:bg-[#FFA9E9] text-[#09543D] text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Explore Pharmacies For Sale</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
