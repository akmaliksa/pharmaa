import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';

interface FloatingContactProps {
  onOpenConsultation: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ onOpenConsultation }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <button
        onClick={onOpenConsultation}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#1A264F] to-[#0A1128] border border-[#D4AF37]/60 shadow-xl shadow-black/80 text-white hover:scale-105 transition-all duration-300"
        title="Direct Real Estate Advisory"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-semibold text-[#F9F1D6] tracking-wide">
          Akaber Advisory
        </span>
        <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
      </button>
    </div>
  );
};
