/**
 * Real Estate Projects CMS
 * Complete project management: add, edit, delete, duplicate, media gallery,
 * architectural specifications, amenities, and floor plans.
 */

import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { useCms } from '../../context/CmsContext';
import {
  Building,
  Check,
  Copy,
  Edit2,
  ExternalLink,
  Eye,
  Globe,
  Image,
  MapPin,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { ImageUploadControl } from '../common/ImageUploadControl';

export const ProjectsManager: React.FC = () => {
  const {
    projects,
    updateProject,
    deleteProject,
    media,
    activeLanguage,
    openSaveModal,
    t,
    isRtl,
    setSelectedProject: setPublicSelectedProject,
  } = useCms();

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'media' | 'plans'>('details');

  const handleCreateNew = () => {
    const newProj: ProjectItem = {
      id: `proj_${Date.now()}`,
      name: { en: 'Add Project', ar: 'أضف المشروع' },
      location: { en: 'Add Location', ar: 'أضف الموقع' },
      category: 'Residential',
      status: 'Under Development',
      shortDesc: { en: 'Add Description', ar: 'أضف الوصف' },
      fullDesc: { en: 'Add Content', ar: 'أضف المحتوى' },
      mainImage: '/src/assets/images/akaber_hero_architecture_1790230991956.jpg',
      gallery: [
        '/src/assets/images/akaber_hero_architecture_1790230991956.jpg',
        '/src/assets/images/akaber_project_facade_1790231002730.jpg',
      ],
      specs: {
        area: 'Add Area (m²)',
        units: 'Add Units',
        completion: 'Add Year',
        investmentVolume: 'Price On Request',
      },
      amenities: ['Private Terrace', 'Smart Home Automation'],
      floorPlans: [],
      published: true,
      order: projects.length + 1,
    };
    setEditingProject(newProj);
  };

  const handleDuplicate = (proj: ProjectItem) => {
    const dup: ProjectItem = {
      ...JSON.parse(JSON.stringify(proj)),
      id: `proj_${Date.now()}`,
      name: {
        en: `${proj.name.en} (Copy)`,
        ar: `${proj.name.ar} (نسخة)`,
      },
      order: projects.length + 1,
    };
    updateProject(dup);
  };

  const handleSave = () => {
    if (!editingProject) return;

    openSaveModal(`Project: ${editingProject.name.en || 'Development'}`, (choice) => {
      let finalProj = { ...editingProject };
      if (choice.mode === 'all') {
        finalProj.name.ar = finalProj.name.en;
        finalProj.location.ar = finalProj.location.en;
        finalProj.shortDesc.ar = finalProj.shortDesc.en;
      }
      updateProject(finalProj);
      setEditingProject(null);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Projects CMS</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage real estate portfolio, architectural dossiers, specifications, and floor plans.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded transition-colors flex items-center gap-1.5 self-start shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table / Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-[#141414] border border-[#242424] hover:border-[#383838] rounded-xl overflow-hidden flex flex-col justify-between transition-all"
          >
            <div>
              <div className="relative aspect-[16/10] bg-black/50">
                <img
                  src={proj.mainImage || '/src/assets/images/akaber_hero_architecture_1790230991956.jpg'}
                  alt={t(proj.name)}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-black/80 text-[#C5A880] border border-[#333333]">
                  {proj.status}
                </span>
                {!proj.published && (
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-800">
                    Draft
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <MapPin className="w-3 h-3 text-[#C5A880]" />
                  <span>{t(proj.location)}</span>
                  <span>·</span>
                  <span>{proj.category}</span>
                </div>
                <h3 className="text-base font-serif font-semibold text-white truncate">
                  {t(proj.name)}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {t(proj.shortDesc)}
                </p>
                <div className="pt-2 text-[11px] font-mono text-[#C5A880]">
                  {proj.specs.area} · {proj.specs.units || 'Custom Units'}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-[#202020] flex items-center justify-between gap-2 mt-2">
              <button
                onClick={() => setPublicSelectedProject(proj)}
                title="Preview Dossier"
                className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDuplicate(proj)}
                  title="Duplicate Project"
                  className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingProject(proj)}
                  title="Edit Project"
                  className="p-1.5 text-[#C5A880] hover:text-white rounded hover:bg-neutral-800 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
                  title="Delete Project"
                  className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-neutral-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-3xl bg-[#141414] border border-[#2B2B2B] rounded-2xl shadow-2xl p-6 text-[#F5F5F0] flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-[#242424]">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#C5A880]" />
                <h3 className="text-base font-semibold">
                  {editingProject.id ? 'Edit Real Estate Project' : 'New Project'}
                </h3>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 text-neutral-400 hover:text-white rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex border-b border-[#222222] my-3">
              {[
                { id: 'details', label: 'General & Text' },
                { id: 'specs', label: 'Specifications & Amenities' },
                { id: 'media', label: 'Images & Video' },
                { id: 'plans', label: 'Floor Plans' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#C5A880] border-b-2 border-[#C5A880] font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div className="flex-1 overflow-y-auto space-y-4 p-1 text-xs">
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-400 mb-1">Project Name (English)</label>
                      <input
                        type="text"
                        value={editingProject.name.en}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            name: { ...editingProject.name, en: e.target.value },
                          })
                        }
                        className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">اسم المشروع (عربي)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={editingProject.name.ar}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            name: { ...editingProject.name, ar: e.target.value },
                          })
                        }
                        className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-400 mb-1">Location (English)</label>
                      <input
                        type="text"
                        value={editingProject.location.en}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            location: { ...editingProject.location, en: e.target.value },
                          })
                        }
                        className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">الموقع (عربي)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={editingProject.location.ar}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            location: { ...editingProject.location, ar: e.target.value },
                          })
                        }
                        className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-400 mb-1">Category</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            category: e.target.value as any,
                          })
                        }
                        className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Masterplan">Masterplan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1">Development Status</label>
                      <select
                        value={editingProject.status}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            status: e.target.value as any,
                          })
                        }
                        className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                      >
                        <option value="Under Development">Under Development</option>
                        <option value="Completed">Completed</option>
                        <option value="Upcoming">Upcoming</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">Short Description (EN)</label>
                    <textarea
                      rows={2}
                      value={editingProject.shortDesc.en}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          shortDesc: { ...editingProject.shortDesc, en: e.target.value },
                        })
                      }
                      className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">Full Architectural Content (EN)</label>
                    <textarea
                      rows={4}
                      value={editingProject.fullDesc.en}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          fullDesc: { ...editingProject.fullDesc, en: e.target.value },
                        })
                      }
                      className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-400 mb-1">Total Built Area</label>
                      <input
                        type="text"
                        value={editingProject.specs.area}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            specs: { ...editingProject.specs, area: e.target.value },
                          })
                        }
                        placeholder="e.g. 1,450 m²"
                        className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">Units / Configurations</label>
                      <input
                        type="text"
                        value={editingProject.specs.units || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            specs: { ...editingProject.specs, units: e.target.value },
                          })
                        }
                        placeholder="e.g. 6 Luxury Residences"
                        className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-2">Amenities Checklist</label>
                    <div className="space-y-2">
                      {editingProject.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={amenity}
                            onChange={(e) => {
                              const updated = [...editingProject.amenities];
                              updated[idx] = e.target.value;
                              setEditingProject({ ...editingProject, amenities: updated });
                            }}
                            className="flex-1 p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingProject.amenities.filter((_, i) => i !== idx);
                              setEditingProject({ ...editingProject, amenities: updated });
                            }}
                            className="p-2 text-neutral-400 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            amenities: [...editingProject.amenities, 'Add Feature / Amenity'],
                          })
                        }
                        className="text-xs text-[#C5A880] hover:underline"
                      >
                        + Add Amenity
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-5">
                  <ImageUploadControl
                    label="Main Cover Photography"
                    value={editingProject.mainImage}
                    onChange={(url) =>
                      setEditingProject({ ...editingProject, mainImage: url })
                    }
                    helperText="Upload main architectural photo from your computer (JPG, PNG, WEBP)"
                  />

                  {/* Project Gallery */}
                  <div className="space-y-2 pt-3 border-t border-[#262626]">
                    <div className="flex items-center justify-between">
                      <label className="block text-neutral-300 font-semibold">
                        Additional Gallery Photos ({editingProject.gallery?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(editingProject.gallery || []), editingProject.mainImage];
                          setEditingProject({ ...editingProject, gallery: updated });
                        }}
                        className="text-xs text-[#C5A880] hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Gallery Image</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(editingProject.gallery || []).map((imgUrl, idx) => (
                        <div key={idx} className="p-3 bg-[#0D0D0D] border border-[#262626] rounded-lg space-y-2">
                          <ImageUploadControl
                            label={`Gallery Photo #${idx + 1}`}
                            value={imgUrl}
                            onChange={(newUrl) => {
                              const updated = [...editingProject.gallery];
                              updated[idx] = newUrl;
                              setEditingProject({ ...editingProject, gallery: updated });
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingProject.gallery.filter((_, i) => i !== idx);
                              setEditingProject({ ...editingProject, gallery: updated });
                            }}
                            className="text-[11px] text-red-400 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove Photo #{idx + 1}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">Project Video URL (optional)</label>
                    <input
                      type="text"
                      value={editingProject.videoUrl || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, videoUrl: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white outline-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'plans' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-300">Floor Plans Dossier</span>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject({
                          ...editingProject,
                          floorPlans: [
                            ...editingProject.floorPlans,
                            {
                              title: { en: 'Add Floor Plan', ar: 'أضف مخطط الطابق' },
                              dimensions: 'Add Dimensions',
                              image: editingProject.mainImage,
                            },
                          ],
                        })
                      }
                      className="text-xs text-[#C5A880] hover:underline"
                    >
                      + Add Floor Plan
                    </button>
                  </div>

                  {editingProject.floorPlans.map((plan, idx) => (
                    <div key={idx} className="p-3 bg-[#0D0D0D] border border-[#262626] rounded-lg space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Plan Title (EN)"
                          value={plan.title.en}
                          onChange={(e) => {
                            const updated = [...editingProject.floorPlans];
                            updated[idx].title.en = e.target.value;
                            setEditingProject({ ...editingProject, floorPlans: updated });
                          }}
                          className="flex-1 p-1.5 bg-[#171717] border border-[#2B2B2B] rounded text-white"
                        />
                        <input
                          type="text"
                          placeholder="Dimensions (e.g. 420 m²)"
                          value={plan.dimensions}
                          onChange={(e) => {
                            const updated = [...editingProject.floorPlans];
                            updated[idx].dimensions = e.target.value;
                            setEditingProject({ ...editingProject, floorPlans: updated });
                          }}
                          className="w-36 p-1.5 bg-[#171717] border border-[#2B2B2B] rounded text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = editingProject.floorPlans.filter((_, i) => i !== idx);
                            setEditingProject({ ...editingProject, floorPlans: updated });
                          }}
                          className="p-1.5 text-neutral-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <ImageUploadControl
                        label="Plan Blueprint / Rendering"
                        value={plan.image}
                        onChange={(newImg) => {
                          const updated = [...editingProject.floorPlans];
                          updated[idx].image = newImg;
                          setEditingProject({ ...editingProject, floorPlans: updated });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#242424] mt-4">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                <input
                  type="checkbox"
                  checked={editingProject.published}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, published: e.target.checked })
                  }
                  className="accent-[#C5A880]"
                />
                <span>Published on Website</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded shadow-md"
                >
                  Save Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
