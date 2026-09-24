/**
 * Forms & Leads Management CMS
 * Manage all incoming client inquiries, filter by status, export to CSV,
 * and review investment criteria submitted via the website.
 */

import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Download, Mail, Phone, Trash2, User, X } from 'lucide-react';
import { FormInquiry } from '../../types';

export const FormsManager: React.FC = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useCms();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewingInquiry, setViewingInquiry] = useState<FormInquiry | null>(null);

  const filtered = inquiries.filter((inq) => {
    if (filterStatus === 'all') return true;
    return inq.status === filterStatus;
  });

  const handleExportCsv = () => {
    if (inquiries.length === 0) return;
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Project', 'Status', 'Message'];
    const rows = inquiries.map((inq) => [
      `"${new Date(inq.date).toLocaleString()}"`,
      `"${inq.name.replace(/"/g, '""')}"`,
      `"${inq.email}"`,
      `"${inq.phone || ''}"`,
      `"${inq.projectName || ''}"`,
      `"${inq.status}"`,
      `"${(inq.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `akaber_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Forms & Private Client Inquiries</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time inbox of luxury inquiries, acquisition requests, and investment advisory submissions.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2 bg-[#222222] hover:bg-[#2C2C2C] text-white border border-[#333333] text-xs font-medium rounded transition-colors flex items-center gap-1.5 self-start"
        >
          <Download className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'new', 'in-progress', 'contacted', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded text-xs capitalize transition-colors ${
              filterStatus === status
                ? 'bg-[#C5A880] text-black font-semibold'
                : 'bg-[#181818] text-neutral-400 hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-[#141414] border border-[#242424] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-neutral-400 text-xs">
            No inquiries match this criteria. Inquiries submitted through the VIP Consultation desk will appear here immediately.
          </div>
        ) : (
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#181818] border-b border-[#242424] text-neutral-400 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Contact Name</th>
                <th className="py-3.5 px-4 font-semibold">Project Interest</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Submitted</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202020]">
              {filtered.map((inq) => (
                <tr key={inq.id} className="hover:bg-[#1A1A1A] transition-colors">
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-semibold text-white block">{inq.name}</span>
                      <span className="text-[11px] text-neutral-400">{inq.email} · {inq.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#C5A880] font-medium">
                    {inq.projectName || 'General Inquiries'}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                      className="bg-[#0D0D0D] border border-[#2A2A2A] rounded px-2 py-1 text-[11px] text-white focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-neutral-400 font-mono">
                    {new Date(inq.date).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewingInquiry(inq)}
                        className="text-xs text-[#C5A880] hover:underline"
                      >
                        View Note
                      </button>
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-1 text-neutral-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {viewingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-[#141414] border border-[#2B2B2B] rounded-2xl p-6 text-[#F5F5F0] space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
              <h3 className="text-sm font-semibold">Private Client Inquiry</h3>
              <button onClick={() => setViewingInquiry(null)}>
                <X className="w-4 h-4 text-neutral-400 hover:text-white" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-neutral-400 block">Lead Name:</span>
                <span className="text-white font-medium text-sm">{viewingInquiry.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-neutral-400 block">Email:</span>
                  <a href={`mailto:${viewingInquiry.email}`} className="text-[#C5A880] hover:underline">
                    {viewingInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] text-neutral-400 block">Phone:</span>
                  <a href={`tel:${viewingInquiry.phone}`} className="text-white">
                    {viewingInquiry.phone || 'N/A'}
                  </a>
                </div>
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block">Project of Interest:</span>
                <span className="text-[#C5A880]">{viewingInquiry.projectName}</span>
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block">Message / Criteria:</span>
                <p className="p-3 bg-[#0D0D0D] border border-[#262626] rounded-lg text-neutral-200 leading-relaxed mt-1">
                  {viewingInquiry.message || 'No additional notes provided.'}
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-3 border-t border-[#242424]">
              <button
                onClick={() => setViewingInquiry(null)}
                className="px-4 py-2 bg-[#C5A880] text-black font-semibold rounded hover:bg-[#D4AF37]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
