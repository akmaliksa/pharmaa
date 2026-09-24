import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface AkmalikMissionProps {
  onOpenContact: () => void;
}

export const AkmalikMission: React.FC<AkmalikMissionProps> = ({ onOpenContact }) => {
  const pillars = [
    {
      title: 'A Serene Acquisition',
      frenchTitle: 'Un achat serein',
      tag: 'Rigorous Audits & Zero Surprises',
      desc: 'Transparent balance sheet deconstruction, reconstituted EBITDA modeling, and equitable price negotiation. We ensure your pharmacy acquisition is built on solid, audited foundations.',
      handSvg: '/images/akmalik/hands-ok.svg',
      points: [
        'Multi-factor balance sheet audit & EBITDA reconstitution',
        'Verification of prescription and parapharmacy margins',
        'Debt-service coverage ratio (DSCR) stress testing',
        'Fair market valuation benchmarking'
      ],
      colorBg: 'bg-[#FFFDF7]',
      colorBorder: 'border-[#09543D]/15',
      badgeColor: 'bg-[#E6F5EF] text-[#09543D]'
    },
    {
      title: 'Streamlined Formalities',
      frenchTitle: 'Des démarches allégées',
      tag: 'Legal, Bank & Board Filings Handled',
      desc: 'Simplified administrative, banking, and regional healthcare board (ARS / Ordre) applications. We assemble every piece of the puzzle so you keep your peace of mind.',
      handSvg: '/images/akmalik/hands-clac.svg',
      points: [
        'Comprehensive bank loan financing dossiers',
        'National and Regional Pharmacists Board coordination',
        'Commercial lease audit & non-compete validation',
        'Closing inventory supervision'
      ],
      colorBg: 'bg-[#FFFDF7]',
      colorBorder: 'border-[#09543D]/15',
      badgeColor: 'bg-[#FFF3D6] text-[#461E10]'
    },
    {
      title: 'Unfailing Proximity',
      frenchTitle: 'Une proximité sans faille',
      tag: 'Dedicated On-The-Ground Advisors',
      desc: 'Local advisors who understand the exact medical and demographic dynamics of your territory. Readily available for confidential chats, coffees, or evening strategy meetings.',
      handSvg: '/images/akmalik/hands-heart.svg',
      points: [
        'Direct line to your personal regional advisor',
        'Discrete vendor and buyer matchmaking',
        'In-depth knowledge of local prescriber trends',
        'Support extending long after closing day'
      ],
      colorBg: 'bg-[#FFFDF7]',
      colorBorder: 'border-[#09543D]/15',
      badgeColor: 'bg-[#FFA9E9]/25 text-[#09543D]'
    }
  ];

  return (
    <section id="concept" className="py-16 sm:py-24 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F5EF] text-[#09543D] text-xs font-bold uppercase tracking-wider">
            <span>Our Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight leading-tight">
            Beyond Simple Pharmacy Brokerage:{' '}
            <span className="text-[#09543D]">Our Mission</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            Buying or selling a pharmacy should not feel like an uphill battle. At <strong className="text-[#09543D]">akmalik</strong>, we turn a complex regulatory procedure into a smooth, rewarding transition.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`rounded-3xl ${pillar.colorBg} border ${pillar.colorBorder} p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden`}
            >
              {/* Hand Illustration in Corner */}
              <div className="absolute top-5 right-5 w-16 h-16 sm:w-20 sm:h-20 opacity-80 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 pointer-events-none">
                <img
                  src={pillar.handSvg}
                  alt={pillar.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${pillar.badgeColor}`}>
                  {pillar.tag}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1E1E1E] group-hover:text-[#09543D] transition-colors pr-14 mb-3">
                  {pillar.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {pillar.desc}
                </p>

                {/* Key check points */}
                <div className="space-y-2.5 pt-2 border-t border-neutral-200/60">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <div className="w-4 h-4 rounded-full bg-[#09543D]/10 text-[#09543D] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#09543D] group-hover:text-[#04261C] transition-colors"
                >
                  <span>Learn how we assist</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
