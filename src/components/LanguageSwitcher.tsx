import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { LANGUAGES } from '../data/translations';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
  dropDirection?: 'down' | 'up';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  className = '',
  dropDirection = 'down',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = LANGUAGES[currentLanguage];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        id="language-switcher-button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#F9F1D6] bg-[#0B152E]/90 hover:bg-[#121F3D] border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-lg transition-all duration-200 shadow-sm shadow-black/20 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span className="text-sm leading-none">{activeLang.flag}</span>
        <span className="font-bold tracking-wider">{activeLang.code.toUpperCase()}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#C5A059] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          id="language-dropdown-menu"
          className={`absolute ${
            dropDirection === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          } right-0 w-44 bg-[#070D1E] border border-[#D4AF37]/40 rounded-xl shadow-2xl py-1.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="px-3 py-1 text-[10px] uppercase tracking-widest text-[#C5A059]/80 font-bold border-b border-slate-800/80 mb-1">
            Select Language / Dil / اللغة
          </div>
          {(Object.values(LANGUAGES) as typeof LANGUAGES[keyof typeof LANGUAGES][]).map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                id={`lang-option-${lang.code}`}
                type="button"
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-[#121F3D] text-[#D4AF37] font-semibold'
                    : 'text-slate-300 hover:bg-[#0F1E3D] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-slate-100">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400">{lang.name}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
