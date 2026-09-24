/**
 * Section Settings Inspector
 * Allows configuring Section Layout, Backgrounds (color/image/video),
 * Responsive Padding, and Columns Structure.
 */

import React, { useState } from 'react';
import { BuilderSection, DeviceView } from '../../types';
import { useCms } from '../../context/CmsContext';
import { Columns, Layout, Palette, Sparkles, X } from 'lucide-react';
import { ImageUploadControl } from '../common/ImageUploadControl';

interface SectionInspectorProps {
  section: BuilderSection | null;
  onClose: () => void;
  onUpdateSection: (updated: BuilderSection) => void;
  activeDevice: DeviceView;
}

export const SectionInspector: React.FC<SectionInspectorProps> = ({
  section,
  onClose,
  onUpdateSection,
  activeDevice,
}) => {
  const { media } = useCms();
  const [activeTab, setActiveTab] = useState<'layout' | 'background' | 'padding' | 'columns'>('layout');

  if (!section) return null;

  // Responsive padding
  const currentPadding =
    activeDevice === 'mobile' && section.padding.mobile
      ? section.padding.mobile
      : activeDevice === 'tablet' && section.padding.tablet
      ? section.padding.tablet
      : section.padding.desktop;

  const handlePaddingChange = (side: 'top' | 'bottom' | 'left' | 'right', val: number) => {
    const updatedPadding = {
      ...section.padding,
      [activeDevice]: {
        ...currentPadding,
        [side]: val,
      },
    };
    onUpdateSection({ ...section, padding: updatedPadding });
  };

  const setColumnPreset = (preset: number[]) => {
    const newCols = preset.map((span, idx) => {
      const existing = section.columns[idx];
      return {
        id: existing?.id || `col_${Date.now()}_${idx}`,
        span,
        elements: existing?.elements || [],
      };
    });
    onUpdateSection({ ...section, columns: newCols });
  };

  return (
    <aside className="w-80 md:w-96 bg-[#141414] border-l border-[#262626] h-full flex flex-col text-neutral-200 z-50 shadow-2xl select-none">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#262626] bg-[#181818]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-white">
              Section Settings
            </h3>
            <span className="text-[10px] text-neutral-400">
              {section.name} ({activeDevice})
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

      <div className="flex border-b border-[#262626] bg-[#111111]">
        {[
          { id: 'layout', label: 'Layout', icon: Layout },
          { id: 'background', label: 'Background', icon: Palette },
          { id: 'padding', label: 'Spacing', icon: Sparkles },
          { id: 'columns', label: 'Columns', icon: Columns },
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

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* LAYOUT TAB */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Section Label</label>
              <input
                type="text"
                value={section.name}
                onChange={(e) => onUpdateSection({ ...section, name: e.target.value })}
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Container Width</label>
              <select
                value={section.layout}
                onChange={(e) =>
                  onUpdateSection({ ...section, layout: e.target.value as any })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
              >
                <option value="contained">Contained (1280px / 7xl)</option>
                <option value="boxed">Boxed (1024px / 5xl)</option>
                <option value="full-width">Full Width (100% viewport)</option>
              </select>
            </div>
          </div>
        )}

        {/* BACKGROUND TAB */}
        {activeTab === 'background' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Background Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['color', 'image'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      onUpdateSection({
                        ...section,
                        background: { ...section.background, type: t as any },
                      })
                    }
                    className={`py-2 rounded capitalize font-medium transition-colors ${
                      section.background.type === t
                        ? 'bg-[#C5A880] text-black font-semibold'
                        : 'bg-[#1D1D1D] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {section.background.type === 'color' && (
              <div className="space-y-1">
                <label className="font-semibold text-neutral-300">Solid Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={section.background.color || '#0A0A0A'}
                    onChange={(e) =>
                      onUpdateSection({
                        ...section,
                        background: { ...section.background, color: e.target.value },
                      })
                    }
                    className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={section.background.color || '#0A0A0A'}
                    onChange={(e) =>
                      onUpdateSection({
                        ...section,
                        background: { ...section.background, color: e.target.value },
                      })
                    }
                    className="flex-1 p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white font-mono uppercase"
                  />
                </div>
              </div>
            )}

            {section.background.type === 'image' && (
              <div className="space-y-4">
                <ImageUploadControl
                  label="Background Image Asset"
                  value={section.background.imageUrl || ''}
                  onChange={(url) =>
                    onUpdateSection({
                      ...section,
                      background: { ...section.background, imageUrl: url },
                    })
                  }
                  helperText="Upload any picture from your computer to use as section background"
                />

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between">
                    <label className="font-semibold text-neutral-300">Dark Scrim Overlay Opacity</label>
                    <span className="text-neutral-400 font-mono">
                      {Math.round((section.background.overlayOpacity ?? 0.6) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={section.background.overlayOpacity ?? 0.6}
                    onChange={(e) =>
                      onUpdateSection({
                        ...section,
                        background: {
                          ...section.background,
                          overlayOpacity: parseFloat(e.target.value),
                        },
                      })
                    }
                    className="w-full accent-[#C5A880]"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SPACING TAB */}
        {activeTab === 'padding' && (
          <div className="space-y-3">
            <span className="font-semibold text-neutral-300 block mb-1">
              Padding ({activeDevice})
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Top (px)</label>
                <input
                  type="number"
                  value={currentPadding.top}
                  onChange={(e) => handlePaddingChange('top', Number(e.target.value))}
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Bottom (px)</label>
                <input
                  type="number"
                  value={currentPadding.bottom}
                  onChange={(e) => handlePaddingChange('bottom', Number(e.target.value))}
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Left (px)</label>
                <input
                  type="number"
                  value={currentPadding.left}
                  onChange={(e) => handlePaddingChange('left', Number(e.target.value))}
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Right (px)</label>
                <input
                  type="number"
                  value={currentPadding.right}
                  onChange={(e) => handlePaddingChange('right', Number(e.target.value))}
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* COLUMNS TAB */}
        {activeTab === 'columns' && (
          <div className="space-y-3">
            <span className="font-semibold text-neutral-300 block mb-1">Column Presets</span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setColumnPreset([12])}
                className="w-full p-2.5 bg-[#171717] hover:bg-[#202020] border border-[#2B2B2B] rounded flex items-center justify-between text-left"
              >
                <span>Full Width (1 Column)</span>
                <span className="text-[10px] font-mono text-[#C5A880]">[ 100% ]</span>
              </button>
              <button
                type="button"
                onClick={() => setColumnPreset([6, 6])}
                className="w-full p-2.5 bg-[#171717] hover:bg-[#202020] border border-[#2B2B2B] rounded flex items-center justify-between text-left"
              >
                <span>Split Screen (2 Columns)</span>
                <span className="text-[10px] font-mono text-[#C5A880]">[ 50% | 50% ]</span>
              </button>
              <button
                type="button"
                onClick={() => setColumnPreset([4, 4, 4])}
                className="w-full p-2.5 bg-[#171717] hover:bg-[#202020] border border-[#2B2B2B] rounded flex items-center justify-between text-left"
              >
                <span>Three Columns (33% each)</span>
                <span className="text-[10px] font-mono text-[#C5A880]">[ 33% | 33% | 33% ]</span>
              </button>
              <button
                type="button"
                onClick={() => setColumnPreset([7, 5])}
                className="w-full p-2.5 bg-[#171717] hover:bg-[#202020] border border-[#2B2B2B] rounded flex items-center justify-between text-left"
              >
                <span>Asymmetric Focus (7 : 5)</span>
                <span className="text-[10px] font-mono text-[#C5A880]">[ 58% | 42% ]</span>
              </button>
              <button
                type="button"
                onClick={() => setColumnPreset([3, 3, 3, 3])}
                className="w-full p-2.5 bg-[#171717] hover:bg-[#202020] border border-[#2B2B2B] rounded flex items-center justify-between text-left"
              >
                <span>Four Columns (25% each)</span>
                <span className="text-[10px] font-mono text-[#C5A880]">[ 25% | 25% | 25% | 25% ]</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-[#262626] bg-[#181818] flex items-center justify-end">
        <button
          onClick={onClose}
          className="px-4 py-1.5 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded text-xs transition-colors"
        >
          Done
        </button>
      </div>
    </aside>
  );
};
