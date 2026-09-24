import React from 'react';
import { ADVISORS } from '../../data/akmalikData';
import { AdvisorItem } from '../../types/akmalik';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

interface AkmalikTeamProps {
  onSelectAdvisor: (advisor: AdvisorItem) => void;
}

export const AkmalikTeam: React.FC<AkmalikTeamProps> = ({ onSelectAdvisor }) => {
  return (
    <section id="team" className="py-16 sm:py-24 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F5EF] text-[#09543D] text-xs font-bold uppercase tracking-wider">
            <span>The akmalik Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight">
            Here for You.{' '}
            <span className="text-[#09543D]">Right Beside You.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            From Lyon to Montpellier, Nice to Marseille, our local advisors know every corner of your regional pharmacy network.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ADVISORS.map((advisor) => (
            <div
              key={advisor.id}
              className="rounded-3xl bg-[#F8F6F0] border border-[#09543D]/15 overflow-hidden p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                {/* Photo & Role Tag */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto border-4 border-white shadow-md">
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="absolute -bottom-2 inset-x-0 mx-auto w-fit px-3 py-0.5 rounded-full bg-[#09543D] text-[#FFFDF7] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {advisor.role.split('&')[0]}
                  </span>
                </div>

                <div className="text-center space-y-2 mt-4">
                  <h3 className="text-xl font-black text-[#1E1E1E]">{advisor.name}</h3>
                  <p className="text-xs font-semibold text-[#09543D] italic">
                    "{advisor.slogan}"
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                    {advisor.bio}
                  </p>
                </div>

                {/* Covered Departments Pills */}
                <div className="pt-4 border-t border-neutral-200 mt-4">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 text-center mb-2">
                    Territory Departments
                  </span>
                  <div className="flex flex-wrap justify-center gap-1">
                    {advisor.departments.map((dept) => (
                      <span
                        key={dept}
                        className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-[10px] font-bold text-neutral-700"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Connect Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onSelectAdvisor(advisor)}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-[#09543D] text-[#09543D] hover:text-[#FFFDF7] border border-[#09543D]/20 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Connect with {advisor.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
