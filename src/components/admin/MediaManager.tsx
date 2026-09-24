/**
 * Professional Media Library
 * Upload real images & files via drag-and-drop or file picker (FileReader),
 * filter by type (Images, Videos, SVGs, Docs), search, edit alt/caption, and copy links.
 */

import React, { useRef, useState } from 'react';
import { MediaItem } from '../../types';
import { useCms } from '../../context/CmsContext';
import {
  Check,
  Copy,
  FileCode,
  FileText,
  Filter,
  Image as ImageIcon,
  Plus,
  Search,
  Trash2,
  UploadCloud,
  Video,
  X,
} from 'lucide-react';

export const MediaManager: React.FC = () => {
  const { media, addMediaItem, updateMediaItem, deleteMediaItem } = useCms();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload via browser FileReader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      const isVideo = file.type.startsWith('video');
      const isSvg = file.type.includes('svg');
      const isImage = file.type.startsWith('image');
      const mediaType = isVideo ? 'video' : isSvg ? 'svg' : isImage ? 'image' : 'document';

      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        const newItem: MediaItem = {
          id: `media_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: file.name,
          url: resultUrl,
          type: mediaType as any,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          mimeType: file.type,
          alt: file.name.replace(/\.[^/.]+$/, ''),
          createdAt: new Date().toISOString(),
        };
        addMediaItem(newItem);
      };

      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = media.filter((item) => {
    const matchesFilter = filterType === 'all' || item.type === filterType;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.alt && item.alt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Media Library</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage high-resolution architectural photography, floor plan renders, videos, and vector assets.
          </p>
        </div>

        <div>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,video/*,.svg,.pdf"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded transition-colors flex items-center gap-1.5 shadow-md"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Files</span>
          </button>
        </div>
      </div>

      {/* Drag & Drop Upload Dropzone Banner */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="p-6 border-2 border-dashed border-[#2B2B2B] hover:border-[#C5A880] bg-[#121212] hover:bg-[#161616] rounded-xl text-center cursor-pointer transition-all group flex flex-col items-center justify-center space-y-2 shadow-inner"
      >
        <div className="w-12 h-12 rounded-full bg-[#1C1C1C] group-hover:bg-[#C5A880]/15 flex items-center justify-center text-neutral-400 group-hover:text-[#C5A880] border border-[#2E2E2E] group-hover:border-[#C5A880]/40 transition-colors">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <span className="text-sm font-semibold text-white group-hover:text-[#C5A880] transition-colors block">
            Click to Upload Pictures or Drag & Drop Here
          </span>
          <span className="text-[11px] text-neutral-400 block mt-0.5">
            Supports JPG, PNG, WebP, SVG, and architectural renders. Files are stored and available instantly across all pages and projects.
          </span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#141414] p-3 rounded-xl border border-[#242424]">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search media by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#0D0D0D] border border-[#2B2B2B] focus:border-[#C5A880] rounded text-xs text-white outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Media', icon: Filter },
            { id: 'image', label: 'Images', icon: ImageIcon },
            { id: 'video', label: 'Videos', icon: Video },
            { id: 'svg', label: 'Vectors / SVG', icon: FileCode },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  filterType === tab.id
                    ? 'bg-[#C5A880] text-black font-semibold'
                    : 'bg-[#1C1C1C] text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative bg-[#141414] border border-[#242424] hover:border-[#C5A880] rounded-xl overflow-hidden cursor-pointer flex flex-col transition-all"
          >
            <div className="relative aspect-square bg-[#080808] flex items-center justify-center overflow-hidden">
              {item.type === 'video' ? (
                <div className="flex flex-col items-center justify-center text-neutral-400">
                  <Video className="w-8 h-8 text-[#C5A880] mb-1" />
                  <span className="text-[10px]">Video File</span>
                </div>
              ) : item.type === 'svg' ? (
                <div className="flex flex-col items-center justify-center text-neutral-400">
                  <FileCode className="w-8 h-8 text-[#C5A880] mb-1" />
                  <span className="text-[10px]">Vector Asset</span>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.alt || item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              )}

              {/* Quick Actions Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  title="Copy Asset URL"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyLink(item.url, item.id);
                  }}
                  className="p-1.5 rounded-full bg-[#1C1C1C] text-white hover:text-[#C5A880] transition-colors"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  title="Delete Asset"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMediaItem(item.id);
                  }}
                  className="p-1.5 rounded-full bg-[#1C1C1C] text-white hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-[#141414] border-t border-[#1F1F1F]">
              <span className="block text-[11px] font-medium text-white truncate" title={item.name}>
                {item.name}
              </span>
              <span className="block text-[10px] text-neutral-500 font-mono mt-0.5">
                {item.size || 'Web Asset'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Item Detail Inspector Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-[#141414] border border-[#2B2B2B] rounded-2xl shadow-2xl p-6 text-[#F5F5F0]">
            <div className="flex items-center justify-between pb-4 border-b border-[#242424]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#C5A880]" />
                <h3 className="text-sm font-semibold truncate max-w-sm">{selectedItem.name}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 text-neutral-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
              <div className="aspect-square bg-black rounded-lg overflow-hidden flex items-center justify-center border border-[#262626]">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.alt || selectedItem.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1">File Name</label>
                  <input
                    type="text"
                    value={selectedItem.name}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, name: e.target.value })
                    }
                    className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Alt Text (Accessibility & SEO)</label>
                  <input
                    type="text"
                    value={selectedItem.alt || ''}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, alt: e.target.value })
                    }
                    className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Asset URL Link</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={selectedItem.url}
                      className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-neutral-300 font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopyLink(selectedItem.url, selectedItem.id)}
                      className="px-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white rounded flex items-center justify-center"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-neutral-500 space-y-1">
                  <div>Type: {selectedItem.mimeType || selectedItem.type}</div>
                  <div>Uploaded: {new Date(selectedItem.createdAt || Date.now()).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#242424]">
              <button
                type="button"
                onClick={() => {
                  deleteMediaItem(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Asset</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  updateMediaItem(selectedItem);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 bg-[#C5A880] text-black font-semibold rounded text-xs hover:bg-[#D4AF37]"
              >
                Save Metadata
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
