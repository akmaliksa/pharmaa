/**
 * Pages Management Module
 * List, create, duplicate, delete pages, configure SEO metadata,
 * and launch directly into the Visual Page Builder.
 */

import React, { useState } from 'react';
import { BuilderPage } from '../../types';
import { useCms } from '../../context/CmsContext';
import {
  Check,
  Copy,
  ExternalLink,
  FileCode,
  FileText,
  Home,
  Layers,
  Plus,
  Trash2,
} from 'lucide-react';

interface PagesManagerProps {
  onOpenPageBuilder: (pageId: string) => void;
}

export const PagesManager: React.FC<PagesManagerProps> = ({ onOpenPageBuilder }) => {
  const {
    pages,
    createPage,
    deletePage,
    duplicatePage,
    updatePage,
    setCurrentPageId,
    t,
    openSaveModal,
  } = useCms();

  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const page = createPage(newTitle, newSlug || newTitle);
    setNewTitle('');
    setNewSlug('');
    setIsCreating(false);
    onOpenPageBuilder(page.id);
  };

  const handleSetHome = (pageId: string) => {
    pages.forEach((p) => {
      updatePage({ ...p, isHome: p.id === pageId }, false);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Pages Management</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Create, duplicate, manage SEO, and customize pages using the Visual Page Builder.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded transition-colors flex items-center gap-1.5 self-start shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Page</span>
        </button>
      </div>

      {/* Quick Creator Modal */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="p-5 bg-[#141414] border border-[#C5A880]/30 rounded-xl space-y-4 max-w-xl"
        >
          <h3 className="text-sm font-semibold text-white">Create New Page</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">Page Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Masterplans"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">URL Slug</label>
              <input
                type="text"
                placeholder="e.g. masterplans"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 text-xs">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3 py-1.5 text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#C5A880] text-black font-semibold rounded hover:bg-[#D4AF37]"
            >
              Create & Open Builder
            </button>
          </div>
        </form>
      )}

      {/* Pages Table */}
      <div className="bg-[#141414] border border-[#242424] rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-[#181818] border-b border-[#242424] text-neutral-400 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Page Title</th>
              <th className="py-3.5 px-4 font-semibold">Slug / Route</th>
              <th className="py-3.5 px-4 font-semibold">Sections</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#202020]">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-[#1A1A1A] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    {page.isHome ? (
                      <span
                        title="Home Page"
                        className="p-1 rounded bg-[#C5A880]/15 text-[#C5A880]"
                      >
                        <Home className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <FileText className="w-4 h-4 text-neutral-500" />
                    )}
                    <div>
                      <span className="font-semibold text-white block">{t(page.title)}</span>
                      <span className="text-[10px] text-neutral-500">
                        Updated {new Date(page.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-mono text-[11px] text-[#C5A880]">
                  /{page.slug}
                </td>

                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px]">
                    {page.sections.length} sections
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                      page.published
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950/60 text-amber-400 border border-amber-800'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {page.published ? 'Published' : 'Draft'}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => {
                        setCurrentPageId(page.id);
                        onOpenPageBuilder(page.id);
                      }}
                      className="px-3 py-1.5 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded text-[11px] flex items-center gap-1 transition-colors shadow-sm"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Edit with Page Builder</span>
                    </button>

                    <button
                      title="Duplicate Page"
                      onClick={() => duplicatePage(page.id)}
                      className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {!page.isHome && (
                      <button
                        title="Delete Page"
                        onClick={() => deletePage(page.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-400 rounded hover:bg-neutral-800 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
