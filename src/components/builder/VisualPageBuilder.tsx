/**
 * Visual Page Builder (Elementor-Style Visual Experience)
 * Live responsive canvas with Desktop, Tablet, Mobile preview modes,
 * Section reordering, Element inspector, Palette inserter, and Undo/Redo history.
 */

import React, { useState } from 'react';
import {
  BuilderElement,
  BuilderSection,
  DeviceView,
  ElementType,
} from '../../types';
import { useCms } from '../../context/CmsContext';
import { SectionRenderer } from './SectionRenderer';
import { ElementInspector } from './ElementInspector';
import { SectionInspector } from './SectionInspector';
import { ElementPalette } from './ElementPalette';
import {
  ArrowLeft,
  Check,
  Eye,
  Globe,
  Monitor,
  Plus,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from 'lucide-react';

interface VisualPageBuilderProps {
  onExit: () => void;
}

export const VisualPageBuilder: React.FC<VisualPageBuilderProps> = ({ onExit }) => {
  const {
    currentPage,
    updatePage,
    canUndo,
    canRedo,
    undo,
    redo,
    activeLanguage,
    setActiveLanguage,
    isRtl,
    t,
  } = useCms();

  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<BuilderElement | null>(null);
  const [selectedSection, setSelectedSection] = useState<BuilderSection | null>(null);
  const [paletteTargetColId, setPaletteTargetColId] = useState<string | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const [savedBanner, setSavedBanner] = useState<boolean>(false);

  // Add Element to targeted column
  const handleSelectElementType = (type: ElementType) => {
    if (!paletteTargetColId) return;

    const newElement: BuilderElement = {
      id: `el_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type,
      content: {
        text: {
          en: type === 'heading' ? 'Add Heading' : 'Add Description',
          ar: type === 'heading' ? 'أضف العنوان' : 'أضف الوصف',
        },
        url: '',
      },
      styles: {
        color: '#FFFFFF',
        fontSize: {
          desktop: type === 'heading' ? '36px' : '16px',
          mobile: type === 'heading' ? '28px' : '14px',
        },
      },
      animation: {
        type: 'fade-up',
        duration: 700,
        delay: 100,
      },
      responsive: {},
    };

    const updatedSections = currentPage.sections.map((sec) => ({
      ...sec,
      columns: sec.columns.map((col) => {
        if (col.id === paletteTargetColId) {
          return {
            ...col,
            elements: [...col.elements, newElement],
          };
        }
        return col;
      }),
    }));

    updatePage({ ...currentPage, sections: updatedSections });
    setSelectedElement(newElement);
    setPaletteTargetColId(null);
  };

  // Update specific element in current page
  const handleUpdateElement = (updatedEl: BuilderElement) => {
    setSelectedElement(updatedEl);
    const updatedSections = currentPage.sections.map((sec) => ({
      ...sec,
      columns: sec.columns.map((col) => ({
        ...col,
        elements: col.elements.map((el) => (el.id === updatedEl.id ? updatedEl : el)),
      })),
    }));
    updatePage({ ...currentPage, sections: updatedSections });
  };

  // Section handlers
  const handleUpdateSection = (updatedSec: BuilderSection) => {
    setSelectedSection(updatedSec);
    const updatedSections = currentPage.sections.map((s) =>
      s.id === updatedSec.id ? updatedSec : s
    );
    updatePage({ ...currentPage, sections: updatedSections });
  };

  const handleDeleteSection = (secId: string) => {
    const updatedSections = currentPage.sections.filter((s) => s.id !== secId);
    updatePage({ ...currentPage, sections: updatedSections });
    if (selectedSection?.id === secId) setSelectedSection(null);
  };

  const handleDuplicateSection = (sec: BuilderSection) => {
    const duplicated: BuilderSection = {
      ...JSON.parse(JSON.stringify(sec)),
      id: `sec_${Date.now()}`,
      name: `${sec.name} (Copy)`,
    };
    const index = currentPage.sections.findIndex((s) => s.id === sec.id);
    const updatedSections = [...currentPage.sections];
    updatedSections.splice(index + 1, 0, duplicated);
    updatePage({ ...currentPage, sections: updatedSections });
  };

  const handleMoveSectionUp = (secId: string) => {
    const index = currentPage.sections.findIndex((s) => s.id === secId);
    if (index <= 0) return;
    const updatedSections = [...currentPage.sections];
    const [moved] = updatedSections.splice(index, 1);
    updatedSections.splice(index - 1, 0, moved);
    updatePage({ ...currentPage, sections: updatedSections });
  };

  const handleMoveSectionDown = (secId: string) => {
    const index = currentPage.sections.findIndex((s) => s.id === secId);
    if (index >= currentPage.sections.length - 1 || index === -1) return;
    const updatedSections = [...currentPage.sections];
    const [moved] = updatedSections.splice(index, 1);
    updatedSections.splice(index + 1, 0, moved);
    updatePage({ ...currentPage, sections: updatedSections });
  };

  // Add new Section with preset columns
  const handleAddNewSection = (colsPreset: number[]) => {
    const newSection: BuilderSection = {
      id: `sec_${Date.now()}`,
      name: 'Add Section',
      layout: 'contained',
      background: {
        type: 'color',
        color: '#0D0D0D',
      },
      padding: {
        desktop: { top: 100, bottom: 100, left: 48, right: 48 },
        tablet: { top: 70, bottom: 70, left: 32, right: 32 },
        mobile: { top: 50, bottom: 50, left: 20, right: 20 },
      },
      animation: {
        type: 'fade',
        duration: 700,
        delay: 100,
      },
      columns: colsPreset.map((span, idx) => ({
        id: `col_${Date.now()}_${idx}`,
        span,
        elements: [
          {
            id: `el_${Date.now()}_${idx}`,
            type: idx === 0 ? 'heading' : 'text',
            content: {
              text: {
                en: idx === 0 ? 'Add Heading' : 'Add Description',
                ar: idx === 0 ? 'أضف العنوان' : 'أضف الوصف',
              },
            },
            styles: {
              color: '#FFFFFF',
              fontSize: { desktop: idx === 0 ? '36px' : '16px' },
            },
            animation: { type: 'fade-up', duration: 700, delay: 100 },
            responsive: {},
          },
        ],
      })),
    };

    updatePage({
      ...currentPage,
      sections: [...currentPage.sections, newSection],
    });
  };

  const handleTriggerSave = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2500);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 flex flex-col bg-[#080808] text-[#F5F5F0] overflow-hidden"
    >
      {/* Visual Page Builder Control Header */}
      <header className="h-14 bg-[#111111] border-b border-[#242424] px-4 flex items-center justify-between shrink-0 z-50">
        {/* Left: Back & Page Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-[#1C1C1C] hover:bg-[#252525] rounded transition-colors"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            <span>Dashboard</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-neutral-800">
            <span className="text-xs text-neutral-400">Page:</span>
            <span className="text-xs font-semibold text-[#C5A880]">{t(currentPage.title)}</span>
          </div>
        </div>

        {/* Center: Device Switcher & Language Switcher */}
        <div className="flex items-center gap-2">
          {/* Device Controls */}
          <div className="flex items-center bg-[#181818] border border-[#2B2B2B] rounded p-0.5">
            <button
              title="Desktop View (1440px)"
              onClick={() => setDeviceView('desktop')}
              className={`p-1.5 rounded transition-colors ${
                deviceView === 'desktop' ? 'bg-[#C5A880] text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              title="Tablet View (768px)"
              onClick={() => setDeviceView('tablet')}
              className={`p-1.5 rounded transition-colors ${
                deviceView === 'tablet' ? 'bg-[#C5A880] text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              title="Mobile View (390px)"
              onClick={() => setDeviceView('mobile')}
              className={`p-1.5 rounded transition-colors ${
                deviceView === 'mobile' ? 'bg-[#C5A880] text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Language Preview Switcher */}
          <div className="flex items-center bg-[#181818] border border-[#2B2B2B] rounded text-xs overflow-hidden">
            <button
              onClick={() => setActiveLanguage('en')}
              className={`px-2.5 py-1 transition-colors ${
                activeLanguage === 'en' ? 'bg-[#C5A880] text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setActiveLanguage('ar')}
              className={`px-2.5 py-1 transition-colors ${
                activeLanguage === 'ar' ? 'bg-[#C5A880] text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              العربية (AR)
            </button>
          </div>

          {/* Mode Switch: Edit vs Preview */}
          <button
            onClick={() => {
              setIsPreviewMode(!isPreviewMode);
              setSelectedElement(null);
              setSelectedSection(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              isPreviewMode
                ? 'bg-[#C5A880] text-black'
                : 'bg-[#1F1F1F] text-neutral-300 hover:text-white border border-[#2C2C2C]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isPreviewMode ? 'Preview Mode' : 'Edit Mode'}</span>
          </button>
        </div>

        {/* Right: History (Undo/Redo) & Save Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              disabled={!canUndo}
              onClick={undo}
              title="Undo Change"
              className={`p-1.5 rounded transition-colors ${
                canUndo ? 'text-neutral-300 hover:bg-[#202020]' : 'text-neutral-600 cursor-not-allowed'
              }`}
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              disabled={!canRedo}
              onClick={redo}
              title="Redo Change"
              className={`p-1.5 rounded transition-colors ${
                canRedo ? 'text-neutral-300 hover:bg-[#202020]' : 'text-neutral-600 cursor-not-allowed'
              }`}
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleTriggerSave}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded transition-all shadow-md"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Publish</span>
          </button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div className="flex-1 flex overflow-hidden relative">
        <main
          id="builder-canvas-main"
          className={`flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300 bg-[#070707] ${
            deviceView === 'mobile'
              ? 'py-8 px-4 sm:px-6'
              : deviceView === 'tablet'
              ? 'py-6 px-4 sm:px-6'
              : 'p-0'
          }`}
        >
          {/* Device Mockup Wrapper */}
          <div
            className={`w-full transition-all duration-300 bg-[#0A0A0A] mx-auto ${
              deviceView === 'mobile'
                ? 'max-w-[412px] border-[10px] border-[#1E1E1E] rounded-[44px] shadow-[0_25px_70px_rgba(0,0,0,0.85)] my-4 relative ring-1 ring-[#333333]'
                : deviceView === 'tablet'
                ? 'max-w-[768px] border-[10px] border-[#1E1E1E] rounded-[28px] shadow-[0_25px_70px_rgba(0,0,0,0.85)] my-4 relative ring-1 ring-[#333333]'
                : 'max-w-none'
            }`}
          >
            {/* Mobile / Tablet Simulated Status Header Bar */}
            {deviceView === 'mobile' && (
              <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md px-6 py-2.5 flex items-center justify-between text-[11px] text-neutral-400 border-b border-[#1A1A1A] select-none rounded-t-[34px]">
                <span className="font-semibold text-white">9:41</span>
                {/* Dynamic Island / Speaker Notch */}
                <div className="w-24 h-4 bg-black rounded-full border border-[#222] mx-auto" />
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="text-[10px]">5G</span>
                  <div className="w-4 h-2.5 border border-neutral-400 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-neutral-300 rounded-[1px]" />
                  </div>
                </div>
              </div>
            )}

            {deviceView === 'tablet' && (
              <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md px-6 py-2 flex items-center justify-between text-[11px] text-neutral-400 border-b border-[#1A1A1A] select-none rounded-t-[18px]">
                <span className="font-semibold text-white">iPad • 9:41 AM</span>
                <div className="w-3 h-3 rounded-full bg-[#181818] border border-[#2B2B2B]" />
                <span className="text-[10px] text-neutral-400">100% Charged</span>
              </div>
            )}

            {/* Render All Sections in the Page */}
            {currentPage.sections.map((section) => (
              <SectionRenderer
                key={section.id}
                section={section}
                deviceView={deviceView}
                isEditing={!isPreviewMode}
                selectedElementId={selectedElement?.id}
                onSelectElement={(el) => {
                  setSelectedElement(el);
                  setSelectedSection(null);
                }}
                onEditSection={(sec) => {
                  setSelectedSection(sec);
                  setSelectedElement(null);
                }}
                onDeleteSection={handleDeleteSection}
                onDuplicateSection={handleDuplicateSection}
                onMoveSectionUp={handleMoveSectionUp}
                onMoveSectionDown={handleMoveSectionDown}
                onAddElementToColumn={(colId) => {
                  setPaletteTargetColId(colId);
                  setIsPaletteOpen(true);
                }}
              />
            ))}

            {/* In Edit Mode: Add Section Callout Bar */}
            {!isPreviewMode && (
              <div className="py-12 px-4 bg-[#0E0E0E] border-t border-dashed border-[#262626] text-center space-y-4">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                  Add New Section
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleAddNewSection([12])}
                    className="px-4 py-2 bg-[#171717] hover:bg-[#222222] border border-[#2B2B2B] hover:border-[#C5A880] rounded text-xs font-medium text-white transition-colors"
                  >
                    + 1 Full Column
                  </button>
                  <button
                    onClick={() => handleAddNewSection([6, 6])}
                    className="px-4 py-2 bg-[#171717] hover:bg-[#222222] border border-[#2B2B2B] hover:border-[#C5A880] rounded text-xs font-medium text-white transition-colors"
                  >
                    + 2 Columns (50 / 50)
                  </button>
                  <button
                    onClick={() => handleAddNewSection([4, 4, 4])}
                    className="px-4 py-2 bg-[#171717] hover:bg-[#222222] border border-[#2B2B2B] hover:border-[#C5A880] rounded text-xs font-medium text-white transition-colors"
                  >
                    + 3 Columns (33 / 33 / 33)
                  </button>
                  <button
                    onClick={() => handleAddNewSection([7, 5])}
                    className="px-4 py-2 bg-[#171717] hover:bg-[#222222] border border-[#2B2B2B] hover:border-[#C5A880] rounded text-xs font-medium text-white transition-colors"
                  >
                    + Asymmetric (70 / 30)
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Drawer: Element Inspector */}
        {!isPreviewMode && selectedElement && (
          <ElementInspector
            element={selectedElement}
            onClose={() => setSelectedElement(null)}
            onUpdateElement={handleUpdateElement}
            activeDevice={deviceView}
          />
        )}

        {/* Right Drawer: Section Inspector */}
        {!isPreviewMode && selectedSection && (
          <SectionInspector
            section={selectedSection}
            onClose={() => setSelectedSection(null)}
            onUpdateSection={handleUpdateSection}
            activeDevice={deviceView}
          />
        )}
      </div>

      {/* Widget Inserter Palette Modal */}
      <ElementPalette
        isOpen={isPaletteOpen}
        onClose={() => {
          setIsPaletteOpen(false);
          setPaletteTargetColId(null);
        }}
        onSelectElementType={handleSelectElementType}
      />

      {/* Toast Banner when published */}
      {savedBanner && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#C5A880] text-black px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 font-semibold text-xs animate-bounce">
          <Check className="w-4 h-4" />
          <span>Page changes saved & published live!</span>
        </div>
      )}
    </div>
  );
};
