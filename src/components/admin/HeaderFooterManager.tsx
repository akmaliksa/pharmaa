/**
 * Header & Footer Visual CMS Builder
 * Fully configurable navigation header (logos, sticky, transparency, buttons, search)
 * and multi-column luxury footer (about copy, quick links, contact coordinates, social icons, copyright).
 */

import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  AlignLeft,
  Columns,
  Eye,
  Globe,
  Image,
  Layers,
  Palette,
  Sliders,
  Type,
} from 'lucide-react';
import { ImageUploadControl } from '../common/ImageUploadControl';

export const HeaderFooterManager: React.FC = () => {
  const {
    headerConfig,
    updateHeaderConfig,
    footerConfig,
    updateFooterConfig,
    openSaveModal,
    activeLanguage,
    t,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');

  const handleSaveHeader = () => {
    openSaveModal('Header Settings', (choice) => {
      updateHeaderConfig(headerConfig);
    });
  };

  const handleSaveFooter = () => {
    openSaveModal('Footer Settings', (choice) => {
      updateFooterConfig(footerConfig);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Header & Footer Builders</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure global website chrome, navigation menus, transparency, sticky behavior, and footer columns.
          </p>
        </div>

        <div className="flex border border-[#2B2B2B] rounded-lg p-0.5 bg-[#141414]">
          <button
            onClick={() => setActiveTab('header')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'header'
                ? 'bg-[#C5A880] text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Header Builder
          </button>
          <button
            onClick={() => setActiveTab('footer')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'footer'
                ? 'bg-[#C5A880] text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Footer Builder
          </button>
        </div>
      </div>

      {/* HEADER BUILDER FORM */}
      {activeTab === 'header' && (
        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-6 max-w-4xl text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-[#242424] pb-2">
                Brand & Logo Identity
              </h3>

              <div>
                <label className="block text-neutral-400 mb-1">Logo Text Brand</label>
                <input
                  type="text"
                  value={headerConfig.logoText.en}
                  onChange={(e) =>
                    updateHeaderConfig({
                      ...headerConfig,
                      logoText: { ...headerConfig.logoText, en: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white focus:border-[#C5A880] outline-none"
                />
              </div>

              <ImageUploadControl
                label="Custom Image Logo"
                value={headerConfig.logoUrl || ''}
                onChange={(url) =>
                  updateHeaderConfig({ ...headerConfig, logoUrl: url })
                }
                helperText="Upload your company logo (PNG with transparent background, SVG, or JPG)"
              />

              <div>
                <label className="block text-neutral-400 mb-1">Header Height (Desktop px)</label>
                <input
                  type="number"
                  value={headerConfig.height.desktop}
                  onChange={(e) =>
                    updateHeaderConfig({
                      ...headerConfig,
                      height: { ...headerConfig.height, desktop: Number(e.target.value) },
                    })
                  }
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                />
              </div>
            </div>

            {/* Behavior & Styling */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-[#242424] pb-2">
                Header Behavior & Toggles
              </h3>

              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#262626] rounded cursor-pointer">
                  <span>Sticky Header on Scroll</span>
                  <input
                    type="checkbox"
                    checked={headerConfig.sticky}
                    onChange={(e) =>
                      updateHeaderConfig({ ...headerConfig, sticky: e.target.checked })
                    }
                    className="accent-[#C5A880]"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#262626] rounded cursor-pointer">
                  <span>Transparent Overlay on Hero</span>
                  <input
                    type="checkbox"
                    checked={headerConfig.transparent}
                    onChange={(e) =>
                      updateHeaderConfig({ ...headerConfig, transparent: e.target.checked })
                    }
                    className="accent-[#C5A880]"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#262626] rounded cursor-pointer">
                  <span>Show Language Switcher in Header</span>
                  <input
                    type="checkbox"
                    checked={headerConfig.showLanguageSwitcher}
                    onChange={(e) =>
                      updateHeaderConfig({
                        ...headerConfig,
                        showLanguageSwitcher: e.target.checked,
                      })
                    }
                    className="accent-[#C5A880]"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#262626] rounded cursor-pointer">
                  <span>Show Primary Action Button</span>
                  <input
                    type="checkbox"
                    checked={headerConfig.showActionButton}
                    onChange={(e) =>
                      updateHeaderConfig({
                        ...headerConfig,
                        showActionButton: e.target.checked,
                      })
                    }
                    className="accent-[#C5A880]"
                  />
                </label>
              </div>

              {headerConfig.showActionButton && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-neutral-400 mb-1">Button Label (EN)</label>
                    <input
                      type="text"
                      value={headerConfig.actionButtonText?.en || ''}
                      onChange={(e) =>
                        updateHeaderConfig({
                          ...headerConfig,
                          actionButtonText: {
                            en: e.target.value,
                            ar: headerConfig.actionButtonText?.ar || 'استشارة خاصة',
                          },
                        })
                      }
                      className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Button URL Anchor</label>
                    <input
                      type="text"
                      value={headerConfig.actionButtonUrl || '#contact'}
                      onChange={(e) =>
                        updateHeaderConfig({
                          ...headerConfig,
                          actionButtonUrl: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#242424] flex justify-end">
            <button
              onClick={handleSaveHeader}
              className="px-5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded shadow-md"
            >
              Save Header Configuration
            </button>
          </div>
        </div>
      )}

      {/* FOOTER BUILDER FORM */}
      {activeTab === 'footer' && (
        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-6 max-w-4xl text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: Brand & Bio */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-[#242424] pb-2">
                Brand Summary & About Copy
              </h3>

              <div>
                <label className="block text-neutral-400 mb-1">Footer Brand Title</label>
                <input
                  type="text"
                  value={footerConfig.logoText.en}
                  onChange={(e) =>
                    updateFooterConfig({
                      ...footerConfig,
                      logoText: { ...footerConfig.logoText, en: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Brand Description (English)</label>
                <textarea
                  rows={3}
                  value={footerConfig.description.en}
                  onChange={(e) =>
                    updateFooterConfig({
                      ...footerConfig,
                      description: { ...footerConfig.description, en: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">وصف المؤسسة (عربي)</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={footerConfig.description.ar}
                  onChange={(e) =>
                    updateFooterConfig({
                      ...footerConfig,
                      description: { ...footerConfig.description, ar: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white resize-none"
                />
              </div>
            </div>

            {/* Column 2: Contact Coordinates & Copyright */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-[#242424] pb-2">
                Coordinates & Legal
              </h3>

              <div>
                <label className="block text-neutral-400 mb-1">Physical Address / Headquarters</label>
                <input
                  type="text"
                  value={footerConfig.contactInfo.address.en}
                  onChange={(e) =>
                    updateFooterConfig({
                      ...footerConfig,
                      contactInfo: {
                        ...footerConfig.contactInfo,
                        address: { ...footerConfig.contactInfo.address, en: e.target.value },
                      },
                    })
                  }
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Phone</label>
                  <input
                    type="text"
                    value={footerConfig.contactInfo.phone}
                    onChange={(e) =>
                      updateFooterConfig({
                        ...footerConfig,
                        contactInfo: {
                          ...footerConfig.contactInfo,
                          phone: e.target.value,
                        },
                      })
                    }
                    className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={footerConfig.contactInfo.email}
                    onChange={(e) =>
                      updateFooterConfig({
                        ...footerConfig,
                        contactInfo: {
                          ...footerConfig.contactInfo,
                          email: e.target.value,
                        },
                      })
                    }
                    className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Copyright Notice (English)</label>
                <input
                  type="text"
                  value={footerConfig.copyrightText.en}
                  onChange={(e) =>
                    updateFooterConfig({
                      ...footerConfig,
                      copyrightText: { ...footerConfig.copyrightText, en: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={footerConfig.showSocial}
                    onChange={(e) =>
                      updateFooterConfig({ ...footerConfig, showSocial: e.target.checked })
                    }
                    className="accent-[#C5A880]"
                  />
                  <span>Show Social Media Links</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={footerConfig.showNewsletter}
                    onChange={(e) =>
                      updateFooterConfig({ ...footerConfig, showNewsletter: e.target.checked })
                    }
                    className="accent-[#C5A880]"
                  />
                  <span>Newsletter Subscription</span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#242424] flex justify-end">
            <button
              onClick={handleSaveFooter}
              className="px-5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded shadow-md"
            >
              Save Footer Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
