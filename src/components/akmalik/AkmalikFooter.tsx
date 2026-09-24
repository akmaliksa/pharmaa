import React, { useState } from 'react';
import { AkmalikLogo } from './AkmalikLogo';
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin, Send } from 'lucide-react';

interface AkmalikFooterProps {
  onOpenContact: (mode?: 'buy' | 'sell' | 'general') => void;
  onOpenValuation: () => void;
}

export const AkmalikFooter: React.FC<AkmalikFooterProps> = ({
  onOpenContact,
  onOpenValuation,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#FFFDF7] pt-16 pb-12 border-t border-[#09543D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Dual Cards Grid (Exact Phamily Footer Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Push Card 1: Newsletter */}
          <div className="rounded-[2.25rem] bg-[#09543D] text-[#FFFDF7] p-8 sm:p-10 relative overflow-hidden shadow-lg flex flex-col justify-between group">
            {/* Hand Illustration */}
            <div className="absolute top-4 right-4 w-20 h-20 sm:w-24 sm:h-24 opacity-25 pointer-events-none group-hover:scale-110 transition-transform">
              <img
                src="/images/akmalik/hands-no.svg"
                alt="Hand"
                className="w-full h-full filter invert"
              />
            </div>

            <div className="space-y-3 relative z-10 max-w-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFA9E9]">
                Stay Informed
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Stay up to date
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-normal">
                Every month, receive our latest pharmacy market reports, valuation benchmarks, and regulatory updates directly in your inbox.
              </p>
            </div>

            <div className="pt-6 relative z-10">
              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFA9E9]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You are subscribed to the akmalik Monthly Brief!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-full bg-white/15 border border-white/20 text-xs text-white placeholder:text-white/60 focus:outline-none focus:bg-white/25"
                  />
                  <button
                    type="submit"
                    className="btn-bounce px-5 py-3 rounded-full bg-[#FFA9E9] text-[#09543D] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shrink-0 shadow-xs"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Push Card 2: Advisory / Your Project */}
          <div className="rounded-[2.25rem] bg-[#09543D] text-[#FFFDF7] p-8 sm:p-10 relative overflow-hidden shadow-lg flex flex-col justify-between group">
            {/* Hand Illustration */}
            <div className="absolute top-4 right-4 w-20 h-20 sm:w-24 sm:h-24 opacity-25 pointer-events-none group-hover:scale-110 transition-transform">
              <img
                src="/images/akmalik/hands-hello.svg"
                alt="Hand"
                className="w-full h-full filter invert"
              />
            </div>

            <div className="space-y-3 relative z-10 max-w-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFA9E9]">
                Private Consultation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                And your project?
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-normal">
                We are at your disposal to take stock of your ambitions and review personalized opportunities across all French regions.
              </p>
            </div>

            <div className="pt-6 relative z-10">
              <button
                type="button"
                onClick={() => onOpenContact('general')}
                className="btn-bounce inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFA9E9] hover:bg-white text-[#09543D] text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Speak with an Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Navigation Menus Row */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col lg:flex-row items-center justify-between gap-8">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-neutral-700">
            <li>
              <a href="#about" className="hover:text-[#09543D] transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#concept" className="hover:text-[#09543D] transition-colors">
                Concept
              </a>
            </li>
            <li>
              <a href="#buy" className="hover:text-[#09543D] transition-colors">
                Buy a Pharmacy
              </a>
            </li>
            <li>
              <a href="#sell" className="hover:text-[#09543D] transition-colors">
                Sell / Valuation
              </a>
            </li>
            <li>
              <a href="#calculator" className="hover:text-[#09543D] transition-colors">
                Loan Calculator
              </a>
            </li>
            <li>
              <a href="#resources" className="hover:text-[#09543D] transition-colors">
                Resources & Blog
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-[#09543D] transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#team" className="hover:text-[#09543D] transition-colors">
                The Team
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-6 text-xs text-neutral-500">
            <span>© 2026 akmalik, all rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <a href="#privacy" className="hover:text-[#09543D] transition-colors">
              Privacy & Cookies
            </a>
            <span className="hidden sm:inline">·</span>
            <a href="#legal" className="hover:text-[#09543D] transition-colors">
              Legal Mentions
            </a>
          </div>
        </div>

        {/* Giant Bottom Architectural Wordmark */}
        <div className="pt-10 pb-4 text-center border-t border-neutral-200/60 overflow-hidden">
          <div className="inline-block transform hover:scale-[1.02] transition-transform duration-500">
            <AkmalikLogo size="xl" />
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 mt-4 font-semibold">
            Pharmacy Brokerage & Practice Transition • Simplified
          </p>
        </div>

      </div>
    </footer>
  );
};
