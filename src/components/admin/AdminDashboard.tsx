/**
 * Admin Dashboard Overview
 * Quick statistics, recent leads inquiries, quick action launches (Page Builder, New Project, Media)
 */

import React from 'react';
import { useCms } from '../../context/CmsContext';
import {
  ArrowUpRight,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileText,
  FolderKanban,
  Image,
  Layers,
  Mail,
  Plus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  onOpenPageBuilder: () => void;
  onNavigateTab: (tab: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onOpenPageBuilder,
  onNavigateTab,
}) => {
  const {
    pages,
    projects,
    news,
    inquiries,
    media,
    activityLog,
    session,
    siteSettings,
    t,
    isRtl,
  } = useCms();

  const totalPages = pages.length;
  const totalProjects = projects.length;
  const totalMedia = media.length;
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-[#171717] to-[#121212] border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#C5A880] uppercase tracking-wider font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Content Architecture</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            Welcome back, {session?.user.username || 'Administrator'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Managing <strong className="text-white">{t(siteSettings.brandName)}</strong> digital portal.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={onOpenPageBuilder}
            className="px-4 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded transition-colors shadow-md flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            <span>Launch Visual Page Builder</span>
          </button>
          <a
            href="/akaber-real-estate.zip"
            download="akaber-real-estate.zip"
            className="px-3.5 py-2 bg-[#1B1B1B] hover:bg-[#252525] text-[#C5A880] text-xs font-medium rounded transition-colors border border-[#C5A880]/30 hover:border-[#C5A880] flex items-center gap-1.5"
            title="Download full project source code as ZIP file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download ZIP</span>
          </a>
          <button
            onClick={() => onNavigateTab('projects')}
            className="px-3.5 py-2 bg-[#222222] hover:bg-[#2A2A2A] text-white text-xs font-medium rounded transition-colors border border-[#333333] flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('pages')}
          className="p-5 bg-[#141414] border border-[#242424] hover:border-[#C5A880]/50 rounded-xl cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs uppercase tracking-wider">Total Pages</span>
            <FileText className="w-4 h-4 text-[#C5A880]" />
          </div>
          <div className="text-2xl font-serif font-bold text-white tabular-nums">
            {totalPages}
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">Live & published</span>
        </div>

        <div
          onClick={() => onNavigateTab('projects')}
          className="p-5 bg-[#141414] border border-[#242424] hover:border-[#C5A880]/50 rounded-xl cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs uppercase tracking-wider">Projects Catalog</span>
            <FolderKanban className="w-4 h-4 text-[#C5A880]" />
          </div>
          <div className="text-2xl font-serif font-bold text-white tabular-nums">
            {totalProjects}
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">Luxury developments</span>
        </div>

        <div
          onClick={() => onNavigateTab('forms')}
          className="p-5 bg-[#141414] border border-[#242424] hover:border-[#C5A880]/50 rounded-xl cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs uppercase tracking-wider">Leads & Inquiries</span>
            <Mail className="w-4 h-4 text-[#C5A880]" />
          </div>
          <div className="text-2xl font-serif font-bold text-white tabular-nums">
            {totalInquiries}
          </div>
          <span className="text-[11px] text-[#C5A880] mt-1 block font-medium">
            {newInquiries} unread private inquiries
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('media')}
          className="p-5 bg-[#141414] border border-[#242424] hover:border-[#C5A880]/50 rounded-xl cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs uppercase tracking-wider">Media Assets</span>
            <Image className="w-4 h-4 text-[#C5A880]" />
          </div>
          <div className="text-2xl font-serif font-bold text-white tabular-nums">
            {totalMedia}
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">High-res photography</span>
        </div>
      </div>

      {/* Two Column Layout: Recent Inquiries & Activity Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Inquiries (7 cols) */}
        <div className="lg:col-span-7 bg-[#141414] border border-[#242424] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C5A880]" />
              <h3 className="text-sm font-semibold text-white">Recent Advisory Inquiries</h3>
            </div>
            <button
              onClick={() => onNavigateTab('forms')}
              className="text-xs text-[#C5A880] hover:underline"
            >
              View All ({inquiries.length})
            </button>
          </div>

          {inquiries.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No private inquiries received yet. Inquiries submitted via the public website will show up here.
            </div>
          ) : (
            <div className="divide-y divide-[#1F1F1F]">
              {inquiries.slice(0, 5).map((inq) => (
                <div key={inq.id} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-white">{inq.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          inq.status === 'new'
                            ? 'bg-[#C5A880]/20 text-[#C5A880]'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      {inq.email} · {inq.phone || 'No phone'}
                    </div>
                    <p className="text-xs text-neutral-300 mt-1 line-clamp-1 italic">
                      "{inq.message || inq.projectName}"
                    </p>
                  </div>
                  <span className="text-[10px] text-neutral-500 whitespace-nowrap">
                    {new Date(inq.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Log (5 cols) */}
        <div className="lg:col-span-5 bg-[#141414] border border-[#242424] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A880]" />
              <h3 className="text-sm font-semibold text-white">Activity Log</h3>
            </div>
            <button
              onClick={() => onNavigateTab('activity')}
              className="text-xs text-[#C5A880] hover:underline"
            >
              Full Log
            </button>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {activityLog.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-400">
                All administrator actions will be recorded here.
              </div>
            ) : (
              activityLog.slice(0, 7).map((log) => (
                <div key={log.id} className="text-xs border-l-2 border-[#C5A880] pl-3 py-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{log.action}</span>
                    <span className="text-[10px] text-neutral-500">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 truncate">{log.target}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
