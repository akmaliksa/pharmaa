/**
 * Elementor-Style Element Palette
 * Categorized catalog of all builder widgets:
 * Basic, Media, Content, Layout, Forms, Advanced
 */

import React, { useState } from 'react';
import { BuilderElement, ElementType } from '../../types';
import {
  AlignLeft,
  Columns,
  CreditCard,
  FileCode,
  FolderKanban,
  HelpCircle,
  Image,
  Layers,
  LayoutGrid,
  Mail,
  Maximize2,
  Minus,
  MoveVertical,
  Play,
  Quote,
  SlidersHorizontal,
  Sparkles,
  Table,
  Timer,
  Type,
  Video,
  X,
} from 'lucide-react';

interface ElementPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectElementType: (type: ElementType) => void;
}

interface PaletteItem {
  type: ElementType;
  label: string;
  category: 'basic' | 'media' | 'content' | 'layout' | 'forms' | 'advanced';
  icon: any;
  description: string;
}

const PALETTE_ITEMS: PaletteItem[] = [
  // Basic
  { type: 'heading', label: 'Heading', category: 'basic', icon: Type, description: 'Display title with luxury typography' },
  { type: 'text', label: 'Paragraph Text', category: 'basic', icon: AlignLeft, description: 'Editorial body copy or subtitle' },
  { type: 'button', label: 'Button / CTA', category: 'basic', icon: CreditCard, description: 'Single or dual action trigger' },
  { type: 'divider', label: 'Divider', category: 'basic', icon: Minus, description: 'Gold or hairline border separator' },
  { type: 'spacer', label: 'Spacer', category: 'basic', icon: MoveVertical, description: 'Custom responsive whitespace gap' },

  // Media
  { type: 'image', label: 'Image', category: 'media', icon: Image, description: 'Single architectural photograph' },
  { type: 'video', label: 'Video Player', category: 'media', icon: Video, description: 'Self-hosted MP4, YouTube, or Vimeo' },
  { type: 'before-after', label: 'Before / After', category: 'media', icon: SlidersHorizontal, description: 'Interactive split architectural slider' },

  // Content
  { type: 'projects-grid', label: 'Projects Showcase', category: 'content', icon: FolderKanban, description: 'Dynamic CMS projects catalog with modal dossiers' },
  { type: 'testimonials', label: 'Client Quotes', category: 'content', icon: Quote, description: 'Curated reviews and advisory ratings' },
  { type: 'counter', label: 'Metrics Counter', category: 'content', icon: Timer, description: 'Quantitative development statistics' },
  { type: 'faq', label: 'FAQ / Accordion', category: 'content', icon: HelpCircle, description: 'Collapsible questions and specifications' },

  // Forms
  { type: 'inquiry-form', label: 'Private Inquiry Desk', category: 'forms', icon: Mail, description: 'VIP client acquisition & contact desk' },

  // Advanced
  { type: 'html-embed', label: 'HTML / Code Embed', category: 'advanced', icon: FileCode, description: 'Custom markup, iframes, or scripts' },
];

export const ElementPalette: React.FC<ElementPaletteProps> = ({
  isOpen,
  onClose,
  onSelectElementType,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = PALETTE_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-[#141414] border border-[#2A2A2A] rounded-xl shadow-2xl p-6 text-[#F5F5F0] flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C5A880]" />
            <div>
              <h3 className="text-base font-semibold tracking-wide">Add Element</h3>
              <p className="text-xs text-neutral-400">Choose a widget to insert into this column</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="py-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-[#222222]">
          <input
            type="text"
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 bg-[#0D0D0D] border border-[#2B2B2B] focus:border-[#C5A880] rounded text-xs text-white outline-none"
          />

          <div className="flex flex-wrap gap-1 w-full sm:w-auto">
            {['all', 'basic', 'media', 'content', 'forms', 'advanced'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded text-[11px] font-medium uppercase tracking-wider transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#C5A880] text-black font-semibold'
                    : 'bg-[#1E1E1E] text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Elements */}
        <div className="flex-1 overflow-y-auto pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.type}
                type="button"
                onClick={() => {
                  onSelectElementType(item.type);
                  onClose();
                }}
                className="flex flex-col items-start p-3.5 bg-[#171717] hover:bg-[#1F1F1F] border border-[#262626] hover:border-[#C5A880] rounded-lg transition-all text-left group"
              >
                <div className="w-8 h-8 rounded bg-[#222222] group-hover:bg-[#C5A880] flex items-center justify-center text-[#C5A880] group-hover:text-black transition-colors mb-2.5">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-semibold text-white group-hover:text-[#C5A880] transition-colors">
                  {item.label}
                </h4>
                <p className="text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-tight">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
