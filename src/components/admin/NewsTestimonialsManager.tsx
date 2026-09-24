/**
 * News, Testimonials & Partners CMS Manager
 */

import React, { useState } from 'react';
import { NewsItem, PartnerItem, TestimonialItem } from '../../types';
import { useCms } from '../../context/CmsContext';
import {
  Building,
  Edit2,
  Globe,
  Handshake,
  Newspaper,
  Plus,
  Quote,
  Star,
  Trash2,
  X,
} from 'lucide-react';

export const NewsTestimonialsManager: React.FC = () => {
  const {
    news,
    updateNews,
    deleteNews,
    testimonials,
    updateTestimonial,
    deleteTestimonial,
    partners,
    updatePartner,
    deletePartner,
    t,
    openSaveModal,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'news' | 'testimonials' | 'partners'>('news');
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Content Collections</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage press releases, editorial articles, client endorsements, and institutional partners.
          </p>
        </div>

        <div className="flex border border-[#2B2B2B] rounded-lg p-0.5 bg-[#141414]">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'news' ? 'bg-[#C5A880] text-black shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>News & Press</span>
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'testimonials' ? 'bg-[#C5A880] text-black shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>Testimonials</span>
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'partners' ? 'bg-[#C5A880] text-black shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Handshake className="w-3.5 h-3.5" />
            <span>Partners</span>
          </button>
        </div>
      </div>

      {/* --- NEWS SECTION --- */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingNews({
                  id: `news_${Date.now()}`,
                  title: { en: 'Add Article Title', ar: 'أضف عنوان المقال' },
                  slug: 'new-article',
                  excerpt: { en: 'Add Excerpt Description', ar: 'أضف نبذة المقال' },
                  content: { en: 'Add Full Editorial Content', ar: 'أضف المحتوى الكامل' },
                  image: '/src/assets/images/akaber_hero_architecture_1790230991956.jpg',
                  publishedAt: new Date().toISOString(),
                  published: true,
                })
              }
              className="px-3.5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded transition-colors flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add News Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-[#141414] border border-[#242424] rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <img src={item.image} alt={t(item.title)} className="h-40 w-full object-cover" />
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                      {new Date(item.publishedAt || Date.now()).toLocaleDateString()}
                    </span>
                    <h3 className="font-semibold text-white text-sm">{t(item.title)}</h3>
                    <p className="text-xs text-neutral-400 line-clamp-2">{t(item.excerpt)}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex justify-end gap-1 border-t border-[#1F1F1F]">
                  <button
                    onClick={() => setEditingNews(item)}
                    className="p-1.5 text-[#C5A880] hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteNews(item.id)}
                    className="p-1.5 text-neutral-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TESTIMONIALS SECTION --- */}
      {activeTab === 'testimonials' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingTestimonial({
                  id: `test_${Date.now()}`,
                  name: { en: 'Add Client Name', ar: 'أضف اسم العميل' },
                  role: { en: 'Add Role / Title', ar: 'أضف المنصب' },
                  quote: { en: 'Add Client Quote', ar: 'أضف كلمة العميل' },
                  rating: 5,
                  published: true,
                })
              }
              className="px-3.5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded transition-colors flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Testimonial</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-[#141414] border border-[#242424] rounded-xl p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex gap-1 text-[#C5A880] mb-2">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-300 italic">"{t(item.quote)}"</p>
                </div>

                <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white">{t(item.name)}</h4>
                    <span className="text-[10px] text-neutral-400">{t(item.role)}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingTestimonial(item)}
                      className="p-1.5 text-[#C5A880] hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTestimonial(item.id)}
                      className="p-1.5 text-neutral-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- PARTNERS SECTION --- */}
      {activeTab === 'partners' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingPartner({
                  id: `part_${Date.now()}`,
                  name: 'Add Partner Name',
                  category: 'Architectural Consultant',
                  published: true,
                })
              }
              className="px-3.5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded transition-colors flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Partner</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partners.map((item) => (
              <div
                key={item.id}
                className="bg-[#141414] border border-[#242424] rounded-xl p-4 flex flex-col justify-between text-center space-y-2"
              >
                <div className="py-4">
                  <h4 className="font-serif font-semibold text-white text-sm">{item.name}</h4>
                  <span className="text-[11px] text-neutral-400">{item.category}</span>
                </div>
                <div className="pt-2 border-t border-[#1F1F1F] flex justify-center gap-2">
                  <button
                    onClick={() => deletePartner(item.id)}
                    className="text-neutral-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News Edit Modal */}
      {editingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-[#141414] border border-[#2B2B2B] rounded-2xl p-6 text-[#F5F5F0] space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
              <h3 className="text-sm font-semibold">Edit News Article</h3>
              <button onClick={() => setEditingNews(null)}>
                <X className="w-4 h-4 text-neutral-400 hover:text-white" />
              </button>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Title (EN)</label>
              <input
                type="text"
                value={editingNews.title.en}
                onChange={(e) =>
                  setEditingNews({
                    ...editingNews,
                    title: { ...editingNews.title, en: e.target.value },
                  })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">العنوان (عربي)</label>
              <input
                type="text"
                dir="rtl"
                value={editingNews.title.ar}
                onChange={(e) =>
                  setEditingNews({
                    ...editingNews,
                    title: { ...editingNews.title, ar: e.target.value },
                  })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Excerpt (EN)</label>
              <textarea
                rows={2}
                value={editingNews.excerpt.en}
                onChange={(e) =>
                  setEditingNews({
                    ...editingNews,
                    excerpt: { ...editingNews.excerpt, en: e.target.value },
                  })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white resize-none"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Image URL</label>
              <input
                type="text"
                value={editingNews.image}
                onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-[#242424]">
              <button
                onClick={() => setEditingNews(null)}
                className="px-4 py-2 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateNews(editingNews);
                  setEditingNews(null);
                }}
                className="px-4 py-2 bg-[#C5A880] text-black font-semibold rounded hover:bg-[#D4AF37]"
              >
                Save Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Edit Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-[#141414] border border-[#2B2B2B] rounded-2xl p-6 text-[#F5F5F0] space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
              <h3 className="text-sm font-semibold">Edit Testimonial</h3>
              <button onClick={() => setEditingTestimonial(null)}>
                <X className="w-4 h-4 text-neutral-400 hover:text-white" />
              </button>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Client Name (EN)</label>
              <input
                type="text"
                value={editingTestimonial.name.en}
                onChange={(e) =>
                  setEditingTestimonial({
                    ...editingTestimonial,
                    name: { ...editingTestimonial.name, en: e.target.value },
                  })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Title / Role (EN)</label>
              <input
                type="text"
                value={editingTestimonial.role.en}
                onChange={(e) =>
                  setEditingTestimonial({
                    ...editingTestimonial,
                    role: { ...editingTestimonial.role, en: e.target.value },
                  })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Quote Remarks (EN)</label>
              <textarea
                rows={3}
                value={editingTestimonial.quote.en}
                onChange={(e) =>
                  setEditingTestimonial({
                    ...editingTestimonial,
                    quote: { ...editingTestimonial.quote, en: e.target.value },
                  })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-[#242424]">
              <button
                onClick={() => setEditingTestimonial(null)}
                className="px-4 py-2 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateTestimonial(editingTestimonial);
                  setEditingTestimonial(null);
                }}
                className="px-4 py-2 bg-[#C5A880] text-black font-semibold rounded hover:bg-[#D4AF37]"
              >
                Save Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
