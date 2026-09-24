/**
 * Multilingual Save Confirmation Modal
 * Allows administrator to choose whether changes apply to:
 * - Current language only
 * - All languages
 * - Selected languages
 */

import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Check, Globe, X } from 'lucide-react';
import { SaveLanguageChoice } from '../../types';

export const SaveLanguageModal: React.FC = () => {
  const { saveModalTarget, closeSaveModal, activeLanguage, siteSettings } = useCms();
  const [mode, setMode] = useState<'current' | 'all' | 'selected'>('current');
  const [selectedLangs, setSelectedLangs] = useState<string[]>([activeLanguage]);

  if (!saveModalTarget || !saveModalTarget.isOpen) return null;

  const activeLanguages = siteSettings.activeLanguages || ['en', 'ar'];

  const handleToggleLang = (lang: string) => {
    if (selectedLangs.includes(lang)) {
      if (selectedLangs.length > 1) {
        setSelectedLangs(selectedLangs.filter((l) => l !== lang));
      }
    } else {
      setSelectedLangs([...selectedLangs, lang]);
    }
  };

  const handleConfirm = () => {
    const choice: SaveLanguageChoice = {
      mode,
      selectedLanguages:
        mode === 'current' ? [activeLanguage] : mode === 'all' ? activeLanguages : selectedLangs,
    };
    saveModalTarget.onConfirm(choice);
    closeSaveModal();
  };

  const currentLangLabel = activeLanguage === 'ar' ? 'Arabic (العربية)' : 'English';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#141414] border border-[#2A2A2A] rounded-xl shadow-2xl p-6 text-[#F5F5F0]">
        <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#C5A880]" />
            <h3 className="text-base font-semibold tracking-wide">Language Synchronization</h3>
          </div>
          <button
            onClick={closeSaveModal}
            className="p-1 text-neutral-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4">
          <p className="text-xs text-neutral-400 mb-1">Applying changes for:</p>
          <p className="text-sm font-medium text-[#C5A880] mb-4 truncate">
            {saveModalTarget.title}
          </p>

          <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
            Save this change in:
          </p>

          <div className="space-y-3">
            {/* Option 1: Current language only */}
            <label
              onClick={() => setMode('current')}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                mode === 'current'
                  ? 'border-[#C5A880] bg-[#C5A880]/10 text-white'
                  : 'border-[#262626] bg-[#1A1A1A] hover:border-neutral-700 text-neutral-300'
              }`}
            >
              <input
                type="radio"
                name="save_lang_mode"
                checked={mode === 'current'}
                onChange={() => setMode('current')}
                className="mt-0.5 accent-[#C5A880]"
              />
              <div className="flex-1">
                <span className="block text-sm font-medium">Current language only</span>
                <span className="block text-xs text-neutral-400 mt-0.5">
                  Update only in {currentLangLabel}
                </span>
              </div>
            </label>

            {/* Option 2: All languages */}
            <label
              onClick={() => setMode('all')}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                mode === 'all'
                  ? 'border-[#C5A880] bg-[#C5A880]/10 text-white'
                  : 'border-[#262626] bg-[#1A1A1A] hover:border-neutral-700 text-neutral-300'
              }`}
            >
              <input
                type="radio"
                name="save_lang_mode"
                checked={mode === 'all'}
                onChange={() => setMode('all')}
                className="mt-0.5 accent-[#C5A880]"
              />
              <div className="flex-1">
                <span className="block text-sm font-medium">All languages</span>
                <span className="block text-xs text-neutral-400 mt-0.5">
                  Replicate this value across English, Arabic, and all active locales
                </span>
              </div>
            </label>

            {/* Option 3: Selected languages */}
            <label
              onClick={() => setMode('selected')}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                mode === 'selected'
                  ? 'border-[#C5A880] bg-[#C5A880]/10 text-white'
                  : 'border-[#262626] bg-[#1A1A1A] hover:border-neutral-700 text-neutral-300'
              }`}
            >
              <input
                type="radio"
                name="save_lang_mode"
                checked={mode === 'selected'}
                onChange={() => setMode('selected')}
                className="mt-0.5 accent-[#C5A880]"
              />
              <div className="flex-1">
                <span className="block text-sm font-medium">Selected languages</span>
                <span className="block text-xs text-neutral-400 mt-0.5">
                  Pick specific language targets
                </span>
              </div>
            </label>
          </div>

          {/* Sub-selector when "selected" mode is active */}
          {mode === 'selected' && (
            <div className="mt-3 p-3 rounded-lg bg-[#0F0F0F] border border-[#262626] space-y-2">
              <span className="text-xs text-neutral-400 block mb-2">Choose target languages:</span>
              <div className="flex flex-wrap gap-2">
                {activeLanguages.map((langCode) => {
                  const isChecked = selectedLangs.includes(langCode);
                  const label =
                    langCode === 'en'
                      ? 'English (EN)'
                      : langCode === 'ar'
                      ? 'Arabic (AR - العربية)'
                      : langCode.toUpperCase();
                  return (
                    <button
                      key={langCode}
                      type="button"
                      onClick={() => handleToggleLang(langCode)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        isChecked
                          ? 'bg-[#C5A880] text-black'
                          : 'bg-[#222222] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262626]">
          <button
            type="button"
            onClick={closeSaveModal}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 text-xs font-semibold text-black bg-[#C5A880] hover:bg-[#D4AF37] rounded-lg transition-colors shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
