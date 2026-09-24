/**
 * Element Settings Inspector
 * Elementor-style Inspector panel with Content, Style, Animation, and Responsive tabs
 * Includes font selection, color picker, spacing dials, and multilingual synchronization trigger.
 */

import React, { useState } from 'react';
import { BuilderElement, DeviceView, ElementStyles, ElementType } from '../../types';
import { useCms } from '../../context/CmsContext';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Eye,
  EyeOff,
  Globe,
  Layers,
  Palette,
  Sparkles,
  Type,
  X,
} from 'lucide-react';
import { ImageUploadControl } from '../common/ImageUploadControl';

interface ElementInspectorProps {
  element: BuilderElement | null;
  onClose: () => void;
  onUpdateElement: (updated: BuilderElement) => void;
  activeDevice: DeviceView;
}

export const ElementInspector: React.FC<ElementInspectorProps> = ({
  element,
  onClose,
  onUpdateElement,
  activeDevice,
}) => {
  const { activeLanguage, openSaveModal, siteSettings, media, themeTypography } = useCms();
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'animation' | 'advanced'>('content');

  if (!element) return null;

  const currentText = element.content.text?.[activeLanguage] ?? (typeof element.content.text === 'string' ? element.content.text : '');
  const activeLangLabel = activeLanguage === 'ar' ? 'Arabic' : 'English';

  // Handler for text change with optional language sync dialog
  const handleTextChange = (newVal: string) => {
    const updatedContent = {
      ...element.content,
      text: {
        ...(typeof element.content.text === 'object' ? element.content.text : {}),
        [activeLanguage]: newVal,
      },
    };
    onUpdateElement({ ...element, content: updatedContent });
  };

  const handleApplyMultilingualSync = (field: string, val: any) => {
    openSaveModal(`Update ${field} (${element.type})`, (choice) => {
      let updatedObj: Record<string, any> = {};
      if (choice.mode === 'all') {
        (siteSettings.activeLanguages || ['en', 'ar']).forEach((l) => {
          updatedObj[l] = val;
        });
      } else if (choice.mode === 'selected') {
        choice.selectedLanguages.forEach((l) => {
          updatedObj[l] = val;
        });
      } else {
        updatedObj[activeLanguage] = val;
      }

      onUpdateElement({
        ...element,
        content: {
          ...element.content,
          [field]: {
            ...(typeof element.content[field] === 'object' ? element.content[field] : {}),
            ...updatedObj,
          },
        },
      });
    });
  };

  // Style change helper
  const handleStyleChange = (key: keyof ElementStyles, val: any) => {
    onUpdateElement({
      ...element,
      styles: {
        ...element.styles,
        [key]: val,
      },
    });
  };

  // Responsive font size
  const currentFontSize =
    activeDevice === 'mobile' && element.styles.fontSize?.mobile
      ? element.styles.fontSize.mobile
      : activeDevice === 'tablet' && element.styles.fontSize?.tablet
      ? element.styles.fontSize.tablet
      : element.styles.fontSize?.desktop || '16px';

  const handleFontSizeChange = (sizeStr: string) => {
    const current = element.styles.fontSize || { desktop: '16px' };
    const updated = {
      ...current,
      [activeDevice]: sizeStr,
    };
    handleStyleChange('fontSize', updated);
  };

  return (
    <aside className="w-80 md:w-96 bg-[#141414] border-l border-[#262626] h-full flex flex-col text-neutral-200 z-50 shadow-2xl select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#262626] bg-[#181818]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-white">
              Edit: {element.type}
            </h3>
            <span className="text-[10px] text-neutral-400">
              Editing for: <strong className="text-[#C5A880]">{activeLangLabel}</strong> ({activeDevice})
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-neutral-400 hover:text-white rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#262626] bg-[#111111]">
        {[
          { id: 'content', label: 'Content', icon: Type },
          { id: 'style', label: 'Style', icon: Palette },
          { id: 'animation', label: 'Motion', icon: Sparkles },
          { id: 'advanced', label: 'Advanced', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === tab.id
                  ? 'text-[#C5A880] border-b-2 border-[#C5A880] bg-[#171717]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {/* --- CONTENT TAB --- */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* Primary Text Field if applicable */}
            {['heading', 'text', 'button'].includes(element.type) && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-neutral-300">
                    Text ({activeLangLabel})
                  </label>
                  <button
                    type="button"
                    onClick={() => handleApplyMultilingualSync('text', currentText)}
                    className="inline-flex items-center gap-1 text-[10px] text-[#C5A880] hover:underline"
                  >
                    <Globe className="w-3 h-3" />
                    <span>Sync Languages</span>
                  </button>
                </div>
                {element.type === 'text' ? (
                  <textarea
                    rows={4}
                    value={currentText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full p-2.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={currentText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full p-2.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                  />
                )}
              </div>
            )}

            {/* Link / URL for Button */}
            {element.type === 'button' && (
              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">Button URL / Anchor</label>
                <input
                  type="text"
                  value={element.content.url || ''}
                  onChange={(e) =>
                    onUpdateElement({
                      ...element,
                      content: { ...element.content, url: e.target.value },
                    })
                  }
                  placeholder="#projects or https://"
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                />
              </div>
            )}

            {/* Image Upload & Asset Picker */}
            {element.type === 'image' && (
              <ImageUploadControl
                label="Image Asset"
                value={element.content.url || ''}
                onChange={(url) =>
                  onUpdateElement({
                    ...element,
                    content: { ...element.content, url },
                  })
                }
                helperText="Upload any picture from your computer or choose from the media library"
              />
            )}

            {/* Video URL */}
            {element.type === 'video' && (
              <div className="space-y-2">
                <label className="font-semibold text-neutral-300">Video Source URL</label>
                <input
                  type="text"
                  value={element.content.url || ''}
                  onChange={(e) =>
                    onUpdateElement({
                      ...element,
                      content: { ...element.content, url: e.target.value },
                    })
                  }
                  placeholder="Direct .mp4, YouTube, or Vimeo URL"
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                />
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-1.5 text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={element.content.autoPlay ?? false}
                      onChange={(e) =>
                        onUpdateElement({
                          ...element,
                          content: { ...element.content, autoPlay: e.target.checked },
                        })
                      }
                      className="accent-[#C5A880]"
                    />
                    Autoplay
                  </label>
                  <label className="flex items-center gap-1.5 text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={element.content.muted ?? true}
                      onChange={(e) =>
                        onUpdateElement({
                          ...element,
                          content: { ...element.content, muted: e.target.checked },
                        })
                      }
                      className="accent-[#C5A880]"
                    />
                    Muted
                  </label>
                  <label className="flex items-center gap-1.5 text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={element.content.loop ?? false}
                      onChange={(e) =>
                        onUpdateElement({
                          ...element,
                          content: { ...element.content, loop: e.target.checked },
                        })
                      }
                      className="accent-[#C5A880]"
                    />
                    Loop
                  </label>
                </div>
              </div>
            )}

            {/* HTML embed content */}
            {element.type === 'html-embed' && (
              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">Custom HTML Code</label>
                <textarea
                  rows={6}
                  value={element.content.html || ''}
                  onChange={(e) =>
                    onUpdateElement({
                      ...element,
                      content: { ...element.content, html: e.target.value },
                    })
                  }
                  className="w-full font-mono text-[11px] p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-neutral-200 outline-none"
                />
              </div>
            )}
          </div>
        )}

        {/* --- STYLE TAB --- */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            {/* Font Family */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Font Family</label>
              <select
                value={element.styles.fontFamily || 'Cinzel, Georgia, serif'}
                onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
              >
                {themeTypography?.customFonts && themeTypography.customFonts.length > 0 && (
                  <optgroup label="Uploaded Custom Fonts">
                    {themeTypography.customFonts.map((f: string) => (
                      <option key={f} value={`'${f}', sans-serif`}>
                        {f} (Uploaded)
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="English Fonts">
                  <option value="Cinzel, Georgia, serif">Cinzel (Luxury Roman Serif)</option>
                  <option value="Playfair Display, serif">Playfair Display (Editorial)</option>
                  <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans (Ultra Clean)</option>
                  <option value="Outfit, sans-serif">Outfit (Geometric)</option>
                  <option value="Inter, sans-serif">Inter (Modern)</option>
                  <option value="Montserrat, sans-serif">Montserrat (Bold Architectural)</option>
                </optgroup>
                <optgroup label="Arabic Fonts (الخطوط العربية)">
                  <option value="Cairo, sans-serif">Cairo (القاهرة - قياسي)</option>
                  <option value="Amiri, serif">Amiri (أميري - كلاسيكي)</option>
                  <option value="Tajawal, sans-serif">Tajawal (تجوال)</option>
                  <option value="Almarai, sans-serif">Almarai (المراعي)</option>
                  <option value="Scheherazade New, serif">Scheherazade New (شهرزاد)</option>
                  <option value="Readex Pro, sans-serif">Readex Pro (ريدكس)</option>
                </optgroup>
              </select>
            </div>

            {/* Font Size responsive */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-neutral-300">Font Size ({activeDevice})</label>
                <span className="text-neutral-400 font-mono">{currentFontSize}</span>
              </div>
              <input
                type="text"
                value={currentFontSize}
                onChange={(e) => handleFontSizeChange(e.target.value)}
                placeholder="e.g. 48px, 2.5rem"
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
              />
            </div>

            {/* Text Color */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={element.styles.color || '#FFFFFF'}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={element.styles.color || '#FFFFFF'}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="flex-1 p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white uppercase font-mono"
                />
              </div>
            </div>

            {/* Alignment */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Alignment</label>
              <div className="flex border border-[#2B2B2B] rounded overflow-hidden">
                {[
                  { id: 'left', icon: AlignLeft },
                  { id: 'center', icon: AlignCenter },
                  { id: 'right', icon: AlignRight },
                  { id: 'justify', icon: AlignJustify },
                ].map((item) => {
                  const Icon = item.icon;
                  const currentAlign = element.styles.textAlign?.desktop || 'left';
                  const isCur = currentAlign === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        handleStyleChange('textAlign', {
                          ...element.styles.textAlign,
                          desktop: item.id,
                        })
                      }
                      className={`flex-1 py-2 flex items-center justify-center transition-colors ${
                        isCur ? 'bg-[#C5A880] text-black font-bold' : 'hover:bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Background Color */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={element.styles.backgroundColor || '#000000'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={element.styles.backgroundColor || ''}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  placeholder="transparent or #141414"
                  className="flex-1 p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* --- ANIMATION TAB --- */}
        {activeTab === 'animation' && (() => {
          const anim = element.animation || {
            type: 'none',
            duration: 600,
            delay: 0,
            easing: 'ease-out',
            trigger: 'viewport',
            hoverEffect: 'none',
          };
          return (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-300">Entrance Animation</label>
                <select
                  value={anim.type || 'none'}
                  onChange={(e) =>
                    onUpdateElement({
                      ...element,
                      animation: { ...anim, type: e.target.value as any },
                    })
                  }
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                >
                  <option value="none">None</option>
                  <option value="fade">Fade In</option>
                  <option value="fade-up">Fade Up</option>
                  <option value="fade-down">Fade Down</option>
                  <option value="fade-left">Fade Left</option>
                  <option value="fade-right">Fade Right</option>
                  <option value="zoom">Zoom In</option>
                  <option value="blur-reveal">Blur Reveal</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="font-semibold text-neutral-300">Duration (ms)</label>
                  <span className="text-neutral-400 font-mono">{anim.duration || 600}ms</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="50"
                  value={anim.duration || 600}
                  onChange={(e) =>
                    onUpdateElement({
                      ...element,
                      animation: { ...anim, duration: Number(e.target.value) },
                    })
                  }
                  className="w-full accent-[#C5A880]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="font-semibold text-neutral-300">Delay (ms)</label>
                  <span className="text-neutral-400 font-mono">{anim.delay || 0}ms</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={anim.delay || 0}
                  onChange={(e) =>
                    onUpdateElement({
                      ...element,
                      animation: { ...anim, delay: Number(e.target.value) },
                    })
                  }
                  className="w-full accent-[#C5A880]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-300">Hover Animation</label>
                <select
                  value={anim.hoverEffect || 'none'}
                  onChange={(e) =>
                    onUpdateElement({
                      ...element,
                      animation: { ...anim, hoverEffect: e.target.value as any },
                    })
                  }
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                >
                  <option value="none">None</option>
                  <option value="lift">Slight Lift (-4px)</option>
                  <option value="glow">Gold Ambient Glow</option>
                  <option value="scale">Subtle Scale (1.02)</option>
                  <option value="gold-border">Gold Border Highlight</option>
                </select>
              </div>
            </div>
          );
        })()}

        {/* --- ADVANCED / RESPONSIVE TAB --- */}
        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <span className="font-semibold text-neutral-300 block mb-2">Device Visibility</span>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#262626] rounded cursor-pointer">
                <span>Hide on Desktop</span>
                <input
                  type="checkbox"
                  checked={element.responsive?.hideDesktop || false}
                  onChange={(e) =>
                    onUpdateElement({
                      ...element,
                      responsive: { ...element.responsive, hideDesktop: e.target.checked },
                    })
                  }
                  className="accent-[#C5A880]"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#262626] rounded cursor-pointer">
                <span>Hide on Tablet</span>
                <input
                  type="checkbox"
                  checked={element.responsive?.hideTablet || false}
                  onChange={(e) =>
                    onUpdateElement({
                      ...element,
                      responsive: { ...element.responsive, hideTablet: e.target.checked },
                    })
                  }
                  className="accent-[#C5A880]"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#262626] rounded cursor-pointer">
                <span>Hide on Mobile</span>
                <input
                  type="checkbox"
                  checked={element.responsive?.hideMobile || false}
                  onChange={(e) =>
                    onUpdateElement({
                      ...element,
                      responsive: { ...element.responsive, hideMobile: e.target.checked },
                    })
                  }
                  className="accent-[#C5A880]"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Inspector Footer with Quick Action */}
      <div className="p-3 border-t border-[#262626] bg-[#181818] flex items-center justify-between">
        <button
          onClick={() => handleApplyMultilingualSync('all', null)}
          className="text-xs text-[#C5A880] hover:underline flex items-center gap-1"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Multilingual Options</span>
        </button>
        <button
          onClick={onClose}
          className="px-4 py-1.5 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded text-xs transition-colors"
        >
          Apply
        </button>
      </div>
    </aside>
  );
};
