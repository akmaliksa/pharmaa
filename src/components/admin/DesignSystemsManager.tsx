/**
 * Global Design Systems CMS
 * Comprehensive control over Colors (Primary, Background, Accents),
 * Typography (Headings, Body, Arabic Cairo), Custom Fonts, and Animation Physics.
 */

import React, { useRef, useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Check,
  Eye,
  Globe,
  Layers,
  Palette,
  Sparkles,
  Trash2,
  Type,
  Upload,
  UploadCloud,
} from 'lucide-react';
import { ThemeColors, ThemeTypography, UploadedFont } from '../../types';

export const DesignSystemsManager: React.FC = () => {
  const {
    themeColors,
    updateThemeColors,
    themeTypography,
    updateThemeTypography,
    themeAnimations,
    updateThemeAnimations,
    openSaveModal,
    activeLanguage,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'fonts' | 'animations'>('colors');
  const [customFontName, setCustomFontName] = useState('');

  const fontInputRef = useRef<HTMLInputElement>(null);
  const [fontScriptTarget, setFontScriptTarget] = useState<'all' | 'arabic' | 'english'>('all');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFontFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Detect format
    const ext = file.name.split('.').pop()?.toLowerCase();
    const format =
      ext === 'woff2'
        ? 'woff2'
        : ext === 'woff'
        ? 'woff'
        : ext === 'otf'
        ? 'opentype'
        : 'truetype';

    // Default clean font family name from file name
    const detectedName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, ' ')
      .trim();

    const fontName = customFontName.trim() || detectedName;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      const newFont: UploadedFont = {
        id: `font_${Date.now()}`,
        name: fontName,
        fileName: file.name,
        dataUrl,
        format,
        targetScript: fontScriptTarget,
      };

      const updatedUploaded = [...(themeTypography.uploadedFonts || []), newFont];
      const updatedCustom = Array.from(new Set([...(themeTypography.customFonts || []), fontName]));

      // If user uploaded an Arabic font, automatically suggest or apply
      const updatedTypography = {
        ...themeTypography,
        customFonts: updatedCustom,
        uploadedFonts: updatedUploaded,
        ...(fontScriptTarget === 'arabic' ? { arabicFont: `'${fontName}', sans-serif` } : {}),
      };

      updateThemeTypography(updatedTypography);
      setCustomFontName('');
      setUploadStatus(`Font "${fontName}" uploaded successfully! You can now apply it to Headings, Body, or Arabic.`);
      setTimeout(() => setUploadStatus(null), 5000);
    };

    reader.readAsDataURL(file);
    if (fontInputRef.current) fontInputRef.current.value = '';
  };

  const handleRemoveUploadedFont = (fontId: string, fontName: string) => {
    const updatedUploaded = (themeTypography.uploadedFonts || []).filter((f) => f.id !== fontId);
    const updatedCustom = (themeTypography.customFonts || []).filter((f) => f !== fontName);
    updateThemeTypography({
      ...themeTypography,
      uploadedFonts: updatedUploaded,
      customFonts: updatedCustom,
      ...(themeTypography.headingFont.includes(fontName) ? { headingFont: 'Cinzel, Georgia, serif' } : {}),
      ...(themeTypography.bodyFont.includes(fontName) ? { bodyFont: 'Plus Jakarta Sans, sans-serif' } : {}),
      ...(themeTypography.arabicFont?.includes(fontName) ? { arabicFont: 'Cairo, sans-serif' } : {}),
    });
  };

  const arabicPresetFonts = [
    { name: 'Cairo', family: 'Cairo, sans-serif', label: 'Cairo (القاهرة - قياسي ومعاصر)' },
    { name: 'Amiri', family: 'Amiri, serif', label: 'Amiri (أميري - فخم كلاسيكي)' },
    { name: 'Tajawal', family: 'Tajawal, sans-serif', label: 'Tajawal (تجوال - هندسي نظيف)' },
    { name: 'Almarai', family: 'Almarai, sans-serif', label: 'Almarai (المراعي - فائق الوضوح)' },
    { name: 'Scheherazade New', family: 'Scheherazade New, serif', label: 'Scheherazade New (شهرزاد - نسخ تقليدي)' },
    { name: 'Readex Pro', family: 'Readex Pro, sans-serif', label: 'Readex Pro (ريدكس برو - عصري)' },
  ];

  const englishPresetFonts = [
    { name: 'Cinzel', family: 'Cinzel, Georgia, serif', label: 'Cinzel (Luxury Roman Imperial Serif)' },
    { name: 'Playfair Display', family: 'Playfair Display, serif', label: 'Playfair Display (Editorial Serif)' },
    { name: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans, sans-serif', label: 'Plus Jakarta Sans (Ultra Clean Geometric)' },
    { name: 'Outfit', family: 'Outfit, sans-serif', label: 'Outfit (Modern Minimalist)' },
    { name: 'Inter', family: 'Inter, sans-serif', label: 'Inter (High Legibility)' },
    { name: 'Montserrat', family: 'Montserrat, sans-serif', label: 'Montserrat (Bold Architectural)' },
  ];

  const handleSaveColors = () => {
    openSaveModal('Global Color System', () => {
      updateThemeColors(themeColors);
    });
  };

  const handleSaveTypography = () => {
    openSaveModal('Global Typography Hierarchy', () => {
      updateThemeTypography(themeTypography);
    });
  };

  const handleSaveAnimations = () => {
    openSaveModal('Motion & Entrance Physics', () => {
      updateThemeAnimations(themeAnimations);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Global Design Systems</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure global color palette, luxury serif & sans-serif typography, custom fonts, and entrance animations.
          </p>
        </div>

        <div className="flex border border-[#2B2B2B] rounded-lg p-0.5 bg-[#141414] overflow-x-auto">
          {[
            { id: 'colors', label: 'Color Palette', icon: Palette },
            { id: 'typography', label: 'Typography Scales', icon: Type },
            { id: 'fonts', label: 'Custom Fonts', icon: Layers },
            { id: 'animations', label: 'Motion & Physics', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#C5A880] text-black shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- COLORS TAB --- */}
      {activeTab === 'colors' && (
        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-6 max-w-4xl text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: 'Primary Brand Color (Champagne Gold)', key: 'primary', val: themeColors.primary },
              { label: 'Secondary / Dark Structure', key: 'secondary', val: themeColors.secondary },
              { label: 'Accent Highlight', key: 'accent', val: themeColors.accent },
              { label: 'Background Canvas', key: 'background', val: themeColors.background },
              { label: 'Card / Surface Container', key: 'surface', val: themeColors.surface },
              { label: 'Body Text Color', key: 'text', val: themeColors.text },
              { label: 'Headings Color', key: 'heading', val: themeColors.heading },
              { label: 'Primary Button Background', key: 'buttonBg', val: themeColors.buttonBg },
              { label: 'Hairline Borders', key: 'border', val: themeColors.border },
            ].map((col) => (
              <div key={col.key} className="p-4 bg-[#0E0E0E] border border-[#222222] rounded-lg space-y-2">
                <span className="font-semibold text-white block text-[11px]">{col.label}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={col.val}
                    onChange={(e) =>
                      updateThemeColors({ ...themeColors, [col.key]: e.target.value })
                    }
                    className="w-9 h-9 rounded border border-neutral-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={col.val}
                    onChange={(e) =>
                      updateThemeColors({ ...themeColors, [col.key]: e.target.value })
                    }
                    className="flex-1 p-2 bg-[#171717] border border-[#2B2B2B] rounded text-white font-mono uppercase text-xs"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#242424] flex justify-end">
            <button
              onClick={handleSaveColors}
              className="px-5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded shadow-md"
            >
              Apply Color Palette
            </button>
          </div>
        </div>
      )}

      {/* --- TYPOGRAPHY TAB --- */}
      {activeTab === 'typography' && (
        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-6 max-w-4xl text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">
                Headings Display Font (English)
              </label>
              <select
                value={themeTypography.headingFont}
                onChange={(e) =>
                  updateThemeTypography({ ...themeTypography, headingFont: e.target.value })
                }
                className="w-full p-2.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white outline-none focus:border-[#C5A880]"
              >
                {(themeTypography.uploadedFonts || []).length > 0 && (
                  <optgroup label="Uploaded Custom Fonts">
                    {themeTypography.uploadedFonts?.map((f) => (
                      <option key={f.id} value={`'${f.name}', sans-serif`}>
                        {f.name} (Uploaded)
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="English Fonts">
                  {englishPresetFonts.map((f) => (
                    <option key={f.name} value={f.family}>
                      {f.label}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">
                Body Copy Font (English)
              </label>
              <select
                value={themeTypography.bodyFont}
                onChange={(e) =>
                  updateThemeTypography({ ...themeTypography, bodyFont: e.target.value })
                }
                className="w-full p-2.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white outline-none focus:border-[#C5A880]"
              >
                {(themeTypography.uploadedFonts || []).length > 0 && (
                  <optgroup label="Uploaded Custom Fonts">
                    {themeTypography.uploadedFonts?.map((f) => (
                      <option key={f.id} value={`'${f.name}', sans-serif`}>
                        {f.name} (Uploaded)
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="English Fonts">
                  {englishPresetFonts.map((f) => (
                    <option key={f.name} value={f.family}>
                      {f.label}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">
                Arabic Font (الخط العربي العام)
              </label>
              <select
                value={themeTypography.arabicFont || 'Cairo, sans-serif'}
                onChange={(e) =>
                  updateThemeTypography({ ...themeTypography, arabicFont: e.target.value })
                }
                className="w-full p-2.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white outline-none focus:border-[#C5A880]"
              >
                {(themeTypography.uploadedFonts || []).length > 0 && (
                  <optgroup label="Uploaded Custom Fonts">
                    {themeTypography.uploadedFonts?.map((f) => (
                      <option key={f.id} value={`'${f.name}', sans-serif`}>
                        {f.name} (Uploaded)
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="Arabic Fonts">
                  {arabicPresetFonts.map((f) => (
                    <option key={f.name} value={f.family}>
                      {f.label}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Live Dual Language Specimen */}
          <div className="p-5 bg-[#0D0D0D] border border-[#222222] rounded-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#222] pb-2">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                Live Dual-Language Type Specimen (العربية & English)
              </span>
              <span className="text-[10px] text-[#C5A880]">Real-time rendering</span>
            </div>

            {/* English Sample */}
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase">English Preview</span>
              <h1
                style={{ fontFamily: themeTypography.headingFont }}
                className="text-2xl md:text-3xl text-white font-bold tracking-tight"
              >
                Akaber Real Estate Development
              </h1>
              <p
                style={{ fontFamily: themeTypography.bodyFont }}
                className="text-xs text-neutral-300 leading-relaxed max-w-2xl"
              >
                Mastering luxury residential and commercial architecture. Crafted with precision, timeless proportions, and an enduring standard of excellence.
              </p>
            </div>

            {/* Arabic Sample */}
            <div dir="rtl" className="space-y-1 pt-3 border-t border-[#1C1C1C]">
              <span className="text-[10px] text-neutral-500 uppercase block">معاينة الخط العربي</span>
              <h2
                style={{ fontFamily: themeTypography.arabicFont || 'Cairo, sans-serif' }}
                className="text-2xl md:text-3xl text-[#C5A880] font-bold"
              >
                شركة أكابر للتطوير والاستثمار العقاري
              </h2>
              <p
                style={{ fontFamily: themeTypography.arabicFont || 'Cairo, sans-serif' }}
                className="text-xs text-neutral-300 leading-relaxed max-w-2xl"
              >
                نبتكر مساحات معمارية استثنائية تجمع بين الفخامة المعاصرة، وأعلى معايير الجودة والاستدامة، لنصنع معالم حضرية خالدة تلبي تطلعات المستقبل.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#242424] flex justify-end">
            <button
              onClick={handleSaveTypography}
              className="px-5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded shadow-md"
            >
              Apply Typography Settings
            </button>
          </div>
        </div>
      )}

      {/* --- CUSTOM FONTS TAB --- */}
      {activeTab === 'fonts' && (
        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-6 max-w-4xl text-xs">
          {/* Status Alert */}
          {uploadStatus && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-200 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {/* Section: Upload Custom Font File from Computer */}
          <div className="p-5 bg-[#0D0D0D] border border-[#2B2B2B] rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222] pb-3">
              <div>
                <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-[#C5A880]" />
                  <span>Upload Font File from Computer (English / Arabic)</span>
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Upload your own TTF, OTF, WOFF, or WOFF2 font file and apply it instantly across the website.
                </p>
              </div>
              <span className="px-2.5 py-0.5 bg-[#1F1F1F] text-[#C5A880] border border-[#333] rounded font-mono text-[10px]">
                .ttf .otf .woff .woff2
              </span>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fontInputRef}
              onChange={handleFontFileUpload}
              accept=".ttf,.otf,.woff,.woff2,font/ttf,font/otf,font/woff,font/woff2"
              className="hidden"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 mb-1">
                  Font Family Name (Optional - auto-detected from file)
                </label>
                <input
                  type="text"
                  placeholder="e.g. MyLuxurySerif or الخط الفاخر"
                  value={customFontName}
                  onChange={(e) => setCustomFontName(e.target.value)}
                  className="w-full p-2 bg-[#171717] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Font Script Target</label>
                <select
                  value={fontScriptTarget}
                  onChange={(e) => setFontScriptTarget(e.target.value as any)}
                  className="w-full p-2 bg-[#171717] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                >
                  <option value="all">Universal (English & Arabic)</option>
                  <option value="arabic">Arabic Font (خط عربي - تطبيق تلقائي على العربية)</option>
                  <option value="english">English / Latin Display Font</option>
                </select>
              </div>
            </div>

            <div
              onClick={() => fontInputRef.current?.click()}
              className="border-2 border-dashed border-[#333] hover:border-[#C5A880] bg-[#141414] hover:bg-[#1A1A1A] rounded-lg p-6 text-center cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1F1F1F] group-hover:bg-[#C5A880]/10 border border-[#333] group-hover:border-[#C5A880]/40 flex items-center justify-center mx-auto mb-2 text-neutral-400 group-hover:text-[#C5A880] transition-colors">
                <UploadCloud className="w-6 h-6" />
              </div>
              <span className="font-semibold text-white block text-sm mb-1">
                Click to Browse Font File from Your Computer
              </span>
              <span className="text-[11px] text-neutral-400 block">
                Supports TTF, OTF, WOFF, and WOFF2 formats
              </span>
            </div>
          </div>

          {/* Section: Uploaded Fonts List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C5A880]" />
              <span>Your Uploaded Custom Fonts ({themeTypography.uploadedFonts?.length || 0})</span>
            </h4>

            {(!themeTypography.uploadedFonts || themeTypography.uploadedFonts.length === 0) ? (
              <div className="p-4 bg-[#0D0D0D] border border-[#222] rounded-lg text-neutral-400 text-center">
                No custom font files uploaded yet. Upload a TTF/OTF/WOFF font file above to use it anywhere on the site.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {themeTypography.uploadedFonts.map((font) => {
                  const isCurrentHeading = themeTypography.headingFont.includes(font.name);
                  const isCurrentBody = themeTypography.bodyFont.includes(font.name);
                  const isCurrentArabic = themeTypography.arabicFont?.includes(font.name);

                  return (
                    <div
                      key={font.id}
                      className="p-4 bg-[#0D0D0D] border border-[#262626] rounded-xl space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-bold text-white text-sm block">{font.name}</span>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {font.fileName} • {font.format.toUpperCase()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveUploadedFont(font.id, font.name)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 rounded transition-colors"
                          title="Delete font"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Font Preview Sample */}
                      <div
                        style={{ fontFamily: `'${font.name}', sans-serif` }}
                        className="p-2.5 bg-[#171717] rounded border border-[#2B2B2B] text-white"
                      >
                        <p className="text-base font-semibold">
                          Akaber Luxury Architecture • أكابر العقارية
                        </p>
                        <p className="text-xs text-neutral-300">
                          The Art of Distinctive Proportions • فن التطوير المعماري
                        </p>
                      </div>

                      {/* Quick Apply Buttons */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateThemeTypography({
                              ...themeTypography,
                              headingFont: `'${font.name}', sans-serif`,
                            })
                          }
                          className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${
                            isCurrentHeading
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                              : 'bg-[#222] text-neutral-300 hover:text-white hover:bg-[#333]'
                          }`}
                        >
                          {isCurrentHeading ? '✓ Active Headings' : 'Set as Headings'}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateThemeTypography({
                              ...themeTypography,
                              bodyFont: `'${font.name}', sans-serif`,
                            })
                          }
                          className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${
                            isCurrentBody
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                              : 'bg-[#222] text-neutral-300 hover:text-white hover:bg-[#333]'
                          }`}
                        >
                          {isCurrentBody ? '✓ Active Body' : 'Set as Body'}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateThemeTypography({
                              ...themeTypography,
                              arabicFont: `'${font.name}', sans-serif`,
                            })
                          }
                          className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${
                            isCurrentArabic
                              ? 'bg-[#C5A880] text-black font-bold'
                              : 'bg-[#1C281F] text-emerald-400 border border-emerald-900/60 hover:bg-[#233527]'
                          }`}
                        >
                          {isCurrentArabic ? '✓ Active Arabic (الخط العربي الحالي)' : 'Set as Arabic Font (الخط العربي)'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: One-Click Arabic Fonts Presets */}
          <div className="p-5 bg-[#0D0D0D] border border-[#262626] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white text-sm">Preset Arabic Fonts (الخطوط العربية المدمجة)</h4>
                <p className="text-[11px] text-neutral-400">
                  Select any premium Arabic font with one click for the Arabic version and RTL layouts.
                </p>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded font-mono text-[10px]">
                Ready to Apply
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
              {arabicPresetFonts.map((f) => {
                const isActive = (themeTypography.arabicFont || 'Cairo, sans-serif').includes(f.name);
                return (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() =>
                      updateThemeTypography({
                        ...themeTypography,
                        arabicFont: f.family,
                      })
                    }
                    className={`p-3 rounded-lg border text-right transition-all flex flex-col justify-between ${
                      isActive
                        ? 'border-[#C5A880] bg-[#C5A880]/10 ring-1 ring-[#C5A880]'
                        : 'border-[#262626] bg-[#141414] hover:border-[#444]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      {isActive ? (
                        <span className="text-[10px] text-[#C5A880] font-bold">✓ المفعل حالياً</span>
                      ) : (
                        <span className="text-[10px] text-neutral-500">اختر هذا الخط</span>
                      )}
                      <span className="font-bold text-white text-xs">{f.name}</span>
                    </div>
                    <p style={{ fontFamily: f.family }} className="text-base text-[#F5F5F0] pt-1">
                      أكابر للتطوير العقاري
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: One-Click English Luxury Fonts Presets */}
          <div className="p-5 bg-[#0D0D0D] border border-[#262626] rounded-xl space-y-3">
            <h4 className="font-semibold text-white text-sm">Preset English Luxury Fonts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {englishPresetFonts.map((f) => {
                const isHeading = themeTypography.headingFont.includes(f.name);
                const isBody = themeTypography.bodyFont.includes(f.name);

                return (
                  <div
                    key={f.name}
                    className="p-3 rounded-lg border border-[#262626] bg-[#141414] space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-bold text-white text-xs block">{f.name}</span>
                      <p style={{ fontFamily: f.family }} className="text-base text-neutral-200 mt-1">
                        Akaber Luxury Real Estate
                      </p>
                    </div>

                    <div className="flex gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateThemeTypography({
                            ...themeTypography,
                            headingFont: f.family,
                          })
                        }
                        className={`flex-1 py-1 rounded text-[10px] font-semibold transition-colors ${
                          isHeading
                            ? 'bg-[#C5A880] text-black'
                            : 'bg-[#222] text-neutral-300 hover:text-white'
                        }`}
                      >
                        {isHeading ? '✓ Heading' : 'Set Heading'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateThemeTypography({
                            ...themeTypography,
                            bodyFont: f.family,
                          })
                        }
                        className={`flex-1 py-1 rounded text-[10px] font-semibold transition-colors ${
                          isBody
                            ? 'bg-[#C5A880] text-black'
                            : 'bg-[#222] text-neutral-300 hover:text-white'
                        }`}
                      >
                        {isBody ? '✓ Body' : 'Set Body'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- ANIMATIONS TAB --- */}
      {activeTab === 'animations' && (
        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-6 max-w-4xl text-xs">
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-[#0D0D0D] border border-[#262626] rounded-lg cursor-pointer">
              <div>
                <span className="font-semibold text-white block">Enable Scroll Reveal Entrance</span>
                <span className="text-[11px] text-neutral-400">
                  Elements smoothly fade and reveal as the visitor scrolls through sections
                </span>
              </div>
              <input
                type="checkbox"
                checked={themeAnimations.enableEntrance}
                onChange={(e) =>
                  updateThemeAnimations({
                    ...themeAnimations,
                    enableEntrance: e.target.checked,
                  })
                }
                className="accent-[#C5A880] w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[#0D0D0D] border border-[#262626] rounded-lg cursor-pointer">
              <div>
                <span className="font-semibold text-white block">Subtle Parallax Motion</span>
                <span className="text-[11px] text-neutral-400">
                  Architectural imagery drifts gently relative to scroll offset
                </span>
              </div>
              <input
                type="checkbox"
                checked={themeAnimations.enableParallax}
                onChange={(e) =>
                  updateThemeAnimations({
                    ...themeAnimations,
                    enableParallax: e.target.checked,
                  })
                }
                className="accent-[#C5A880] w-4 h-4"
              />
            </label>
          </div>

          <div className="pt-4 border-t border-[#242424] flex justify-end">
            <button
              onClick={handleSaveAnimations}
              className="px-5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded shadow-md"
            >
              Save Motion Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
