import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, FileText, Calculator } from 'lucide-react';

interface AkmalikHeroProps {
  activeRole: 'buyer' | 'seller';
  onRoleChange: (role: 'buyer' | 'seller') => void;
  onOpenValuation: () => void;
  onOpenContact: (mode?: 'buy' | 'sell' | 'general') => void;
}

export const AkmalikHero: React.FC<AkmalikHeroProps> = ({
  activeRole,
  onRoleChange,
  onOpenValuation,
  onOpenContact,
}) => {
  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-2 pb-12 overflow-hidden">
      {/* Signature Large Rounded Container in Forest Green */}
      <div className="max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.75rem] bg-[#09543D] text-[#FFFDF7] p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        
        {/* Playful Floating Hand Illustrations - Top Right */}
        <div className="hidden md:block absolute -top-4 right-10 lg:right-16 w-36 lg:w-48 pointer-events-none select-none animate-float">
          <img
            src="/images/akmalik/hands-shaka.svg"
            alt="Hand Shaka gesture illustration"
            className="w-full h-auto filter drop-shadow-md brightness-0 invert opacity-90"
          />
        </div>

        {/* Playful Floating Hand Illustration - Bottom Left */}
        <div className="hidden lg:block absolute bottom-8 -left-6 w-36 pointer-events-none select-none animate-float-delayed">
          <img
            src="/images/akmalik/hands-hello.svg"
            alt="Hand wave gesture illustration"
            className="w-full h-auto filter drop-shadow-md brightness-0 invert opacity-80"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Top Tag / Sub-Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FFA9E9]">
            <span className="w-2 h-2 rounded-full bg-[#FFA9E9] animate-pulse" />
            <span>Step Forward with Total Confidence</span>
          </div>

          {/* Massive Architectural Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] sm:leading-[1.1] text-[#FFFDF7] font-sans">
            Buying & Selling Pharmacies{' '}
            <span className="relative inline-block text-[#FFA9E9] italic font-normal">
              without the headache
              <svg
                className="absolute -bottom-2 left-0 w-full h-2.5 text-[#FFA9E9]/60"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          {/* Subtitle / Lead Paragraph */}
          <p className="text-base sm:text-xl text-[#FFFDF7]/90 font-normal leading-relaxed max-w-2xl mx-auto">
            <strong className="font-semibold text-white">akmalik</strong> does much more than help you find THE right pharmacy. We support you in launching with full autonomy: personalized advisory, financial modeling, digital tools, and comprehensive follow-through.
          </p>

          {/* Interactive Role Switcher Toggle */}
          <div className="inline-flex p-1.5 rounded-full bg-[#04261C] border border-white/15 shadow-inner">
            <button
              type="button"
              onClick={() => onRoleChange('buyer')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeRole === 'buyer'
                  ? 'bg-[#FFA9E9] text-[#09543D] shadow-md scale-102'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              I am a Buyer
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('seller')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeRole === 'seller'
                  ? 'bg-[#FFA9E9] text-[#09543D] shadow-md scale-102'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              I am a Seller
            </button>
          </div>

          {/* Dynamic Context Card based on Role */}
          <div className="bg-[#04261C]/70 backdrop-blur-md rounded-2xl border border-white/15 p-5 sm:p-7 text-left max-w-2xl mx-auto transition-all duration-300">
            {activeRole === 'buyer' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FFA9E9]" />
                    <span className="font-bold text-sm text-[#FFA9E9] uppercase tracking-wider">
                      Buyer Priority Track
                    </span>
                  </div>
                  <span className="text-xs text-white/60">Updated Daily</span>
                </div>
                <p className="text-sm text-[#FFFDF7]/90 leading-relaxed">
                  Gain access to exclusive off-market listings, pre-audited EBITDA balance sheets, bank financing negotiations, and Day-1 handover coaching.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#buy"
                    className="btn-bounce inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFA9E9] text-[#09543D] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    <span>Browse Pharmacies For Sale</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#calculator"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFDF7] text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-[#FFA9E9]" />
                    <span>Loan Simulator</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#FFA9E9]" />
                    <span className="font-bold text-sm text-[#FFA9E9] uppercase tracking-wider">
                      Seller Priority Track
                    </span>
                  </div>
                  <span className="text-xs text-[#FFA9E9] font-medium">Free 48h Turnaround</span>
                </div>
                <p className="text-sm text-[#FFFDF7]/90 leading-relaxed">
                  Discover the true market value of your business. We connect you discretely with pre-qualified pharmacist buyers backed by verified liquid capital.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onOpenValuation}
                    className="btn-bounce inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFA9E9] text-[#09543D] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    <span>Request Free 48h Valuation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenContact('sell')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFDF7] text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>Confidential Advisor Call</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar Under Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/15 max-w-4xl mx-auto">
            <div className="p-3 text-center sm:text-left">
              <span className="block text-2xl sm:text-3xl font-black text-[#FFA9E9] tracking-tight">
                98.4%
              </span>
              <span className="text-xs uppercase font-medium tracking-wider text-white/70">
                Bank Approval Rate
              </span>
            </div>
            <div className="p-3 text-center sm:text-left">
              <span className="block text-2xl sm:text-3xl font-black text-[#FFA9E9] tracking-tight">
                120+
              </span>
              <span className="text-xs uppercase font-medium tracking-wider text-white/70">
                Completed Transfers
              </span>
            </div>
            <div className="p-3 text-center sm:text-left">
              <span className="block text-2xl sm:text-3xl font-black text-[#FFA9E9] tracking-tight">
                5.2 Mo
              </span>
              <span className="text-xs uppercase font-medium tracking-wider text-white/70">
                Average Closing Delay
              </span>
            </div>
            <div className="p-3 text-center sm:text-left">
              <span className="block text-2xl sm:text-3xl font-black text-[#FFA9E9] tracking-tight">
                100%
              </span>
              <span className="text-xs uppercase font-medium tracking-wider text-white/70">
                NDA Strict Discretion
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
