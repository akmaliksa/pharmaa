/**
 * Akaber Enterprise Admin Panel
 * WordPress + Elementor inspired custom CMS dashboard.
 * Comprehensive navigation across all CMS collections, design systems, and page builder.
 */

import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { AdminTab } from '../../types';
import { AdminDashboard } from './AdminDashboard';
import { PagesManager } from './PagesManager';
import { ProjectsManager } from './ProjectsManager';
import { HeaderFooterManager } from './HeaderFooterManager';
import { MediaManager } from './MediaManager';
import { DesignSystemsManager } from './DesignSystemsManager';
import { NewsTestimonialsManager } from './NewsTestimonialsManager';
import { FormsManager } from './FormsManager';
import { SettingsSecurityManager } from './SettingsSecurityManager';
import { VisualPageBuilder } from '../builder/VisualPageBuilder';
import {
  Clock,
  Download,
  ExternalLink,
  FileCode,
  FileText,
  FolderKanban,
  Globe,
  Handshake,
  Image,
  Layers,
  Layout,
  LogOut,
  Mail,
  Menu,
  Minus,
  Newspaper,
  Palette,
  Quote,
  Shield,
  Sparkles,
  Type,
  User,
  X,
} from 'lucide-react';

interface NavItem {
  id: AdminTab;
  label: string;
  icon: any;
  badge?: number;
  section?: string;
}

export const AdminPanel: React.FC = () => {
  const {
    activeAdminTab,
    setActiveAdminTab,
    setAdminOpen,
    session,
    logout,
    inquiries,
    activeLanguage,
    setActiveLanguage,
    isRtl,
    t,
    currentPageId,
    setCurrentPageId,
  } = useCms();

  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const unreadInquiries = inquiries.filter((i) => i.status === 'new').length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout, section: 'Core' },
    { id: 'pages', label: 'Pages', icon: FileText, section: 'Core' },
    { id: 'page-builder', label: 'Page Builder', icon: Layers, section: 'Core' },
    { id: 'header-footer', label: 'Header & Footer', icon: Minus, section: 'Structure' },
    { id: 'projects', label: 'Projects CMS', icon: FolderKanban, section: 'Content' },
    { id: 'news', label: 'News & Press', icon: Newspaper, section: 'Content' },
    { id: 'testimonials', label: 'Testimonials', icon: Quote, section: 'Content' },
    { id: 'partners', label: 'Partners', icon: Handshake, section: 'Content' },
    { id: 'media', label: 'Media Library', icon: Image, section: 'Media' },
    { id: 'typography', label: 'Typography & Fonts', icon: Type, section: 'Design System' },
    { id: 'colors', label: 'Global Colors', icon: Palette, section: 'Design System' },
    { id: 'animations', label: 'Motion & Animations', icon: Sparkles, section: 'Design System' },
    { id: 'forms', label: 'Forms & Leads', icon: Mail, badge: unreadInquiries, section: 'Client Services' },
    { id: 'languages', label: 'Languages & RTL', icon: Globe, section: 'System' },
    { id: 'settings', label: 'Site Settings', icon: FileCode, section: 'System' },
    { id: 'security', label: 'Users & Security', icon: Shield, section: 'System' },
    { id: 'backups', label: 'Backups & Restore', icon: Download, section: 'System' },
    { id: 'activity', label: 'Activity Log', icon: Clock, section: 'System' },
  ];

  // If page builder is triggered, render full-screen Elementor-style builder
  if (isBuilderOpen || activeAdminTab === 'page-builder') {
    return (
      <VisualPageBuilder
        onExit={() => {
          setIsBuilderOpen(false);
          setActiveAdminTab('pages');
        }}
      />
    );
  }

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 flex bg-[#0A0A0A] text-[#F5F5F0] overflow-hidden"
    >
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
        />
      )}

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#111111] border-r border-[#202020] flex flex-col transition-transform duration-300 ${
          mobileSidebarOpen
            ? 'translate-x-0'
            : isRtl
            ? 'translate-x-full lg:translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 px-5 border-b border-[#202020] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] ring-4 ring-[#C5A880]/20" />
            <div>
              <h1 className="text-sm font-serif font-bold uppercase tracking-wider text-white">
                Akaber
              </h1>
              <span className="text-[10px] text-neutral-400 font-sans tracking-wide block">
                Enterprise CMS
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1 text-neutral-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeAdminTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === 'page-builder') {
                    setIsBuilderOpen(true);
                  } else {
                    setActiveAdminTab(item.id);
                  }
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-[#C5A880] text-black font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black text-[#C5A880]' : 'bg-[#C5A880] text-black'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Info & Logout Footer */}
        <div className="p-3.5 border-t border-[#202020] bg-[#0E0E0E]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1F1F1F] border border-[#2B2B2B] flex items-center justify-center text-[#C5A880]">
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">
                  {session?.user.username || 'admin'}
                </span>
                <span className="text-[10px] text-[#C5A880] uppercase tracking-wider">
                  {session?.user.role || 'administrator'}
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-neutral-400 hover:text-red-400 rounded hover:bg-neutral-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setAdminOpen(false)}
            className="w-full py-2 bg-[#1A1A1A] hover:bg-[#242424] text-neutral-300 hover:text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>View Public Website</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#111111] border-b border-[#202020] px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold hidden sm:inline">
                Admin
              </span>
              <span className="text-neutral-600 hidden sm:inline">/</span>
              <span className="text-sm font-semibold text-white capitalize">
                {activeAdminTab.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Quick Actions & Language Toggle */}
          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <div className="flex items-center bg-[#1A1A1A] border border-[#2B2B2B] rounded text-xs overflow-hidden">
              <button
                onClick={() => setActiveLanguage('en')}
                className={`px-3 py-1 transition-colors ${
                  activeLanguage === 'en'
                    ? 'bg-[#C5A880] text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setActiveLanguage('ar')}
                className={`px-3 py-1 transition-colors ${
                  activeLanguage === 'ar'
                    ? 'bg-[#C5A880] text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                العربية
              </button>
            </div>

            {/* Quick Exit to Public Website */}
            <button
              onClick={() => setAdminOpen(false)}
              className="px-3.5 py-1.5 bg-[#1F1F1F] hover:bg-[#282828] text-white border border-[#333333] text-xs font-medium rounded transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="hidden sm:inline">Website</span>
            </button>
          </div>
        </header>

        {/* Content Body Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeAdminTab === 'dashboard' && (
            <AdminDashboard
              onOpenPageBuilder={() => setIsBuilderOpen(true)}
              onNavigateTab={(tab) => setActiveAdminTab(tab)}
            />
          )}

          {activeAdminTab === 'pages' && (
            <PagesManager
              onOpenPageBuilder={(pageId) => {
                setCurrentPageId(pageId);
                setIsBuilderOpen(true);
              }}
            />
          )}

          {activeAdminTab === 'header-footer' && <HeaderFooterManager />}

          {activeAdminTab === 'projects' && <ProjectsManager />}

          {(activeAdminTab === 'news' ||
            activeAdminTab === 'testimonials' ||
            activeAdminTab === 'partners') && <NewsTestimonialsManager />}

          {activeAdminTab === 'media' && <MediaManager />}

          {(activeAdminTab === 'typography' ||
            activeAdminTab === 'colors' ||
            activeAdminTab === 'animations') && <DesignSystemsManager />}

          {activeAdminTab === 'forms' && <FormsManager />}

          {(activeAdminTab === 'settings' ||
            activeAdminTab === 'languages' ||
            activeAdminTab === 'security' ||
            activeAdminTab === 'backups' ||
            activeAdminTab === 'activity') && (
            <SettingsSecurityManager initialTab={activeAdminTab as any} />
          )}
        </main>
      </div>
    </div>
  );
};
