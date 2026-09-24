/**
 * Dynamic Section Renderer
 * Renders a BuilderSection with its responsive layout, columns, background treatment,
 * and element children. In edit mode, provides Elementor-style hovering toolbars.
 */

import React from 'react';
import { BuilderElement, BuilderSection, DeviceView } from '../../types';
import { ElementRenderer } from './ElementRenderer';
import { ArrowDown, ArrowUp, Copy, Edit3, Plus, Trash2 } from 'lucide-react';

interface SectionRendererProps {
  section: BuilderSection;
  deviceView?: DeviceView;
  isEditing?: boolean;
  selectedElementId?: string;
  onSelectElement?: (el: BuilderElement) => void;
  onEditSection?: (sec: BuilderSection) => void;
  onDeleteSection?: (id: string) => void;
  onDuplicateSection?: (sec: BuilderSection) => void;
  onMoveSectionUp?: (id: string) => void;
  onMoveSectionDown?: (id: string) => void;
  onAddElementToColumn?: (colId: string) => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  deviceView = 'desktop',
  isEditing = false,
  selectedElementId,
  onSelectElement,
  onEditSection,
  onDeleteSection,
  onDuplicateSection,
  onMoveSectionUp,
  onMoveSectionDown,
  onAddElementToColumn,
}) => {
  const { id, name, layout, background, padding, minHeight, columns } = section;

  // Resolve responsive padding
  const currentPadding =
    deviceView === 'mobile' && padding.mobile
      ? padding.mobile
      : deviceView === 'tablet' && padding.tablet
      ? padding.tablet
      : padding.desktop;

  const currentMinHeight =
    deviceView === 'mobile' && minHeight?.mobile
      ? minHeight.mobile
      : deviceView === 'tablet' && minHeight?.tablet
      ? minHeight.tablet
      : minHeight?.desktop;

  // Background styling
  const sectionBgStyle: React.CSSProperties = {
    paddingTop: `${currentPadding.top}px`,
    paddingBottom: `${currentPadding.bottom}px`,
    paddingLeft: `${currentPadding.left}px`,
    paddingRight: `${currentPadding.right}px`,
    minHeight: currentMinHeight || undefined,
    backgroundColor: background.type === 'color' ? background.color || '#0A0A0A' : '#0A0A0A',
    backgroundImage:
      background.type === 'image' && background.imageUrl
        ? `url(${background.imageUrl})`
        : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  };

  // Layout container classes
  const containerClass =
    layout === 'contained'
      ? 'max-w-7xl mx-auto w-full'
      : layout === 'boxed'
      ? 'max-w-5xl mx-auto w-full'
      : 'w-full';

  return (
    <section
      id={id}
      style={sectionBgStyle}
      className={`relative overflow-hidden transition-all duration-200 ${
        isEditing ? 'border border-dashed border-[#2A2A2A] hover:border-[#C5A880]/50' : ''
      }`}
    >
      {/* Background Image Overlay if applicable */}
      {background.type === 'image' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: '#0A0A0A',
            opacity: background.overlayOpacity !== undefined ? background.overlayOpacity : 0.6,
          }}
        />
      )}

      {/* Edit Mode Toolbar Header */}
      {isEditing && (
        <div className="absolute top-2 left-4 z-40 flex items-center gap-1 bg-[#181818]/90 backdrop-blur border border-[#333333] px-2 py-1 rounded text-xs text-neutral-300 shadow-md">
          <span className="font-semibold text-[#C5A880] mr-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            {name || 'Section'}
          </span>
          <button
            type="button"
            title="Edit Section Styles"
            onClick={() => onEditSection?.(section)}
            className="p-1 hover:text-[#C5A880] hover:bg-neutral-800 rounded transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Duplicate Section"
            onClick={() => onDuplicateSection?.(section)}
            className="p-1 hover:text-white hover:bg-neutral-800 rounded transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Move Section Up"
            onClick={() => onMoveSectionUp?.(id)}
            className="p-1 hover:text-white hover:bg-neutral-800 rounded transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Move Section Down"
            onClick={() => onMoveSectionDown?.(id)}
            className="p-1 hover:text-white hover:bg-neutral-800 rounded transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Delete Section"
            onClick={() => onDeleteSection?.(id)}
            className="p-1 hover:text-red-400 hover:bg-neutral-800 rounded transition-colors ml-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Section Content with Grid Columns */}
      <div className={`relative z-10 ${containerClass}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {columns.map((col) => {
            // Span can be 1..12
            const spanClass =
              col.span === 12
                ? 'col-span-12'
                : col.span === 8
                ? 'col-span-12 md:col-span-8'
                : col.span === 7
                ? 'col-span-12 md:col-span-7'
                : col.span === 6
                ? 'col-span-12 md:col-span-6'
                : col.span === 5
                ? 'col-span-12 md:col-span-5'
                : col.span === 4
                ? 'col-span-12 md:col-span-4'
                : col.span === 3
                ? 'col-span-12 md:col-span-3'
                : 'col-span-12';

            return (
              <div
                key={col.id}
                className={`${spanClass} flex flex-col gap-4 relative ${
                  isEditing
                    ? 'p-2 min-h-[60px] border border-dashed border-neutral-800 hover:border-neutral-600 rounded'
                    : ''
                }`}
              >
                {col.elements.map((el) => (
                  <ElementRenderer
                    key={el.id}
                    element={el}
                    deviceView={deviceView}
                    isEditing={isEditing}
                    isSelected={selectedElementId === el.id}
                    onSelectElement={onSelectElement}
                  />
                ))}

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => onAddElementToColumn?.(col.id)}
                    className="w-full py-2 border border-dashed border-[#C5A880]/30 hover:border-[#C5A880] text-xs text-neutral-400 hover:text-[#C5A880] rounded flex items-center justify-center gap-1.5 transition-colors mt-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Element Here</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
