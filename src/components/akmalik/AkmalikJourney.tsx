import React from 'react';
import { ArrowRight, Compass, ShieldAlert, Award, UserCheck, BarChart3, Clock, HelpCircle } from 'lucide-react';

interface AkmalikJourneyProps {
  onOpenValuation: () => void;
  onOpenContact: (mode?: 'buy' | 'sell') => void;
}

export const AkmalikJourney: React.FC<AkmalikJourneyProps> = ({
  onOpenValuation,
  onOpenContact,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Personalized Support for a Resilient Business Plan',
      tag: 'Strategic Modeling',
      desc: 'We tailor financial forecasts and simulate multiple interest rate scenarios. Every buyer enters negotiations backed by a rock-solid business model vetted by specialized healthcare accountants.',
      icon: BarChart3,
      actionText: 'Discuss your project',
      action: () => onOpenContact('buy')
    },
    {
      num: '02',
      title: 'Buying & Selling Your Pharmacy Without Hassle',
      tag: 'End-to-End Handling',
      desc: 'From initial Non-Disclosure Agreements (NDAs) to the critical inventory count on takeover night, our brokers oversee the entire administrative, technical, and human handover.',
      icon: Compass,
      actionText: 'Explore our method',
      action: () => onOpenContact('buy')
    },
    {
      num: '03',
      title: 'Need an Accurate, Confidential Valuation?',
      tag: 'Free 48h Turnaround',
      desc: 'Selling your life\'s work deserves an honest, nuanced assessment. We deliver a multi-angle valuation combining EBITDA, turnover, prescriber stability, and commercial lease security.',
      icon: Award,
      actionText: 'Request your free valuation',
      action: onOpenValuation,
      featured: true
    },
    {
      num: '04',
      title: 'Executive Coaching to Hit the Ground Running on Day 1',
      tag: 'Day-1 Readiness',
      desc: 'Transitioning from employee pharmacist to owner-manager is a major mindset shift. We provide practical guidance on purchasing group (groupement) selection, team leadership, and supplier renegotiation.',
      icon: UserCheck,
      actionText: 'Discover coaching',
      action: () => onOpenContact('buy')
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F8F6F0] border-y border-[#09543D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#09543D] text-[#FFFDF7] text-xs font-bold uppercase tracking-wider">
              <span>The akmalik Standard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight leading-tight">
              A Champion's Journey.{' '}
              <span className="text-[#09543D]">Not an obstacle course.</span>
            </h2>
            <p className="text-base text-neutral-600 font-normal leading-relaxed">
              We replace bureaucratic friction with clarity, speed, and trusted expertise. Every step is transparently mapped from Day 1.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenValuation}
              className="btn-bounce px-6 py-3 rounded-full bg-[#09543D] hover:bg-[#04261C] text-[#FFFDF7] text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              Get a Free Valuation
            </button>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-7 sm:p-9 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                  step.featured
                    ? 'bg-[#09543D] text-[#FFFDF7] border-transparent shadow-md'
                    : 'bg-[#FFFDF7] text-[#1E1E1E] border-[#09543D]/15 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-2xl font-black font-sans ${
                        step.featured ? 'text-[#FFA9E9]' : 'text-[#09543D]'
                      }`}
                    >
                      {step.num}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        step.featured
                          ? 'bg-white/15 text-[#FFA9E9]'
                          : 'bg-[#E6F5EF] text-[#09543D]'
                      }`}
                    >
                      {step.tag}
                    </span>
                  </div>

                  <h3
                    className={`text-xl sm:text-2xl font-bold tracking-tight mb-3 ${
                      step.featured ? 'text-[#FFFDF7]' : 'text-[#1E1E1E]'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      step.featured ? 'text-[#FFFDF7]/85' : 'text-neutral-600'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-current/10">
                  <button
                    type="button"
                    onClick={step.action}
                    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                      step.featured
                        ? 'text-[#FFA9E9] hover:text-white'
                        : 'text-[#09543D] hover:text-[#04261C]'
                    }`}
                  >
                    <span>{step.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
