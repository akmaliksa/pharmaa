import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../data/akmalikData';
import { Plus, Minus, ArrowRight, HelpCircle } from 'lucide-react';

interface AkmalikFaqProps {
  onOpenContact: () => void;
}

export const AkmalikFaq: React.FC<AkmalikFaqProps> = ({ onOpenContact }) => {
  const [openId, setOpenId] = useState<string>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading, intro, hand illustration */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F5EF] text-[#09543D] text-xs font-bold uppercase tracking-wider">
              <span>Your Questions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight leading-tight">
              Pharmacy Brokerage:{' '}
              <span className="text-[#09543D]">The FAQ by akmalik</span>
            </h2>

            <p className="text-base text-neutral-600 font-normal leading-relaxed">
              Transparent, practical answers to every critical question you might have about buying, financing, or transferring an officine.
            </p>

            {/* Hand SVG Illustration */}
            <div className="w-28 sm:w-36 py-4">
              <img
                src="/images/akmalik/hands-no.svg"
                alt="FAQ hand gesture illustration"
                className="w-full h-auto filter opacity-90"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-bounce inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09543D] hover:bg-[#04261C] text-[#FFFDF7] text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Have a Specific Question?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Numbered Accordion Cards */}
          <div className="lg:col-span-7 space-y-4">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#09543D] shadow-md ring-1 ring-[#09543D]/10'
                      : 'bg-[#F8F6F0] border-neutral-200/80 hover:border-[#09543D]/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-6 sm:p-7 flex items-start gap-4 sm:gap-6 justify-between"
                  >
                    <div className="flex items-start gap-4">
                      {/* Number Tag */}
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#09543D] text-[#FFFDF7]'
                            : 'bg-[#E6F5EF] text-[#09543D]'
                        }`}
                      >
                        {item.number}
                      </span>

                      <h3 className="text-base sm:text-lg font-bold text-[#1E1E1E] leading-snug pt-1">
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#FFA9E9] text-[#09543D]'
                          : 'bg-white text-neutral-500'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Content */}
                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-6 pt-0 space-y-3.5 border-t border-neutral-100 text-sm text-neutral-600 leading-relaxed animate-in fade-in duration-200">
                      <p className="font-medium text-[#1E1E1E] pt-3">
                        {item.answer}
                      </p>

                      {item.moreDetails && (
                        <ul className="space-y-2 pt-1">
                          {item.moreDetails.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#09543D] shrink-0 mt-2" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
