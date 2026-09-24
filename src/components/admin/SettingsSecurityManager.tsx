/**
 * Site Settings, Multilingual Languages, Users & Security, Backups, and Activity Log
 * Supports password change with SHA-256 salted hashing, full JSON backup export & restore,
 * and activity audit tracking.
 */

import React, { useRef, useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  AlertTriangle,
  Check,
  Clock,
  Download,
  FileCode,
  Globe,
  KeyRound,
  RotateCcw,
  Save,
  Shield,
  Upload,
  User,
} from 'lucide-react';
import { ImageUploadControl } from '../common/ImageUploadControl';
import { getStoredAdminUser, updateAdminUser } from '../../utils/security';

interface SettingsSecurityManagerProps {
  initialTab?: 'settings' | 'languages' | 'security' | 'backups' | 'activity';
}

export const SettingsSecurityManager: React.FC<SettingsSecurityManagerProps> = ({
  initialTab = 'settings',
}) => {
  const {
    siteSettings,
    updateSiteSettings,
    exportSiteJson,
    importSiteJson,
    resetToDefaults,
    activityLog,
    logActivity,
    session,
    setSession,
    t,
    openSaveModal,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'settings' | 'languages' | 'security' | 'backups' | 'activity'>(initialTab);

  // Security Credentials Form State
  const [newUsername, setNewUsername] = useState(session?.user.username || 'admin');
  const [newEmail, setNewEmail] = useState(session?.user.email || 'admin@akaber.sa');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityStatus, setSecurityStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Backup File Ref
  const backupInputRef = useRef<HTMLInputElement>(null);
  const [backupStatus, setBackupStatus] = useState<string | null>(null);

  // Save Settings with Multilingual Modal
  const handleSaveSettings = () => {
    openSaveModal('Global Site Configuration', () => {
      updateSiteSettings(siteSettings);
    });
  };

  // Password / Credentials Update
  const handleSecurityUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityStatus(null);

    if (newPassword && newPassword !== confirmPassword) {
      setSecurityStatus({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    try {
      const success = await updateAdminUser(
        newUsername,
        newEmail,
        newPassword || undefined,
        currentPassword
      );

      if (success) {
        setSecurityStatus({
          type: 'success',
          message: 'Security credentials updated successfully! New password is now securely hashed.',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        logActivity('Security Credentials Updated', newUsername);
      } else {
        setSecurityStatus({
          type: 'error',
          message: 'Current password verification failed. Please re-enter current password.',
        });
      }
    } catch (err) {
      setSecurityStatus({ type: 'error', message: 'Failed to update credentials.' });
    }
  };

  // Export JSON Backup
  const handleDownloadBackup = () => {
    const jsonStr = exportSiteJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `akaber_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    logActivity('Exported Website Backup', 'JSON Archive');
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importSiteJson(content);
      if (success) {
        setBackupStatus('Website backup restored successfully!');
      } else {
        setBackupStatus('Invalid backup file. Restoration failed.');
      }
    };
    reader.readAsText(file);
    if (backupInputRef.current) backupInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242424]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">System & Administration</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure site identity, multilingual locales, administrator credentials, backups, and security.
          </p>
        </div>

        <div className="flex border border-[#2B2B2B] rounded-lg p-0.5 bg-[#141414] overflow-x-auto">
          {[
            { id: 'settings', label: 'Site Settings', icon: FileCode },
            { id: 'languages', label: 'Languages & RTL', icon: Globe },
            { id: 'security', label: 'Users & Security', icon: Shield },
            { id: 'backups', label: 'Backups & Restore', icon: Download },
            { id: 'activity', label: 'Activity Audit', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#C5A880] text-black shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- SITE SETTINGS TAB --- */}
      {activeTab === 'settings' && (
        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-5 max-w-4xl text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-400 mb-1">Company / Brand Name (EN)</label>
              <input
                type="text"
                value={siteSettings.brandName.en}
                onChange={(e) =>
                  updateSiteSettings({
                    ...siteSettings,
                    brandName: { ...siteSettings.brandName, en: e.target.value },
                  })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">اسم المؤسسة (عربي)</label>
              <input
                type="text"
                dir="rtl"
                value={siteSettings.brandName.ar}
                onChange={(e) =>
                  updateSiteSettings({
                    ...siteSettings,
                    brandName: { ...siteSettings.brandName, ar: e.target.value },
                  })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-400 mb-1">Brand Tagline (EN)</label>
              <input
                type="text"
                value={siteSettings.tagline.en}
                onChange={(e) =>
                  updateSiteSettings({
                    ...siteSettings,
                    tagline: { ...siteSettings.tagline, en: e.target.value },
                  })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">الشعار اللفظي (عربي)</label>
              <input
                type="text"
                dir="rtl"
                value={siteSettings.tagline.ar}
                onChange={(e) =>
                  updateSiteSettings({
                    ...siteSettings,
                    tagline: { ...siteSettings.tagline, ar: e.target.value },
                  })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-neutral-400 mb-1">Contact Phone</label>
              <input
                type="text"
                value={siteSettings.contactPhone}
                onChange={(e) =>
                  updateSiteSettings({ ...siteSettings, contactPhone: e.target.value })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Contact Email</label>
              <input
                type="email"
                value={siteSettings.contactEmail}
                onChange={(e) =>
                  updateSiteSettings({ ...siteSettings, contactEmail: e.target.value })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">WhatsApp Direct Link</label>
              <input
                type="text"
                value={siteSettings.contactWhatsapp}
                onChange={(e) =>
                  updateSiteSettings({ ...siteSettings, contactWhatsapp: e.target.value })
                }
                className="w-full p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#262626]">
            <ImageUploadControl
              label="Primary Brand Logo (Dark / Light Background)"
              value={siteSettings.logoLight || ''}
              onChange={(url) =>
                updateSiteSettings({ ...siteSettings, logoLight: url, logoDark: url })
              }
              helperText="Upload official company logo image (PNG / SVG transparent)"
            />
            <ImageUploadControl
              label="Favicon / Browser Icon"
              value={siteSettings.favicon || ''}
              onChange={(url) =>
                updateSiteSettings({ ...siteSettings, favicon: url })
              }
              helperText="Square 32x32 or 64x64 PNG / ICO browser tab icon"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">Custom CSS Styles (Optional)</label>
            <textarea
              rows={3}
              value={siteSettings.customCss || ''}
              onChange={(e) =>
                updateSiteSettings({ ...siteSettings, customCss: e.target.value })
              }
              placeholder="/* Custom CSS rules applied globally */"
              className="w-full font-mono text-[11px] p-2 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-neutral-200 resize-none"
            />
          </div>

          <div className="pt-4 border-t border-[#242424] flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded shadow-md"
            >
              Save Site Settings
            </button>
          </div>
        </div>
      )}

      {/* --- LANGUAGES & RTL TAB --- */}
      {activeTab === 'languages' && (
        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-6 max-w-4xl text-xs">
          <div className="p-4 bg-[#0D0D0D] border border-[#262626] rounded-lg">
            <h3 className="font-semibold text-white text-sm mb-1">Multilingual System Architecture</h3>
            <p className="text-neutral-400 text-xs">
              Public site supports initial launch in English with instant toggle to Arabic (RTL).
              All headings, descriptions, project fields, and menus are fully translatable.
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 bg-[#0D0D0D] border border-[#262626] rounded-lg cursor-pointer">
              <div>
                <span className="font-semibold text-white block">Arabic Language (العربية) Enabled</span>
                <span className="text-[11px] text-neutral-400">
                  Enables Arabic switch on public navbar and full Right-To-Left (RTL) styling.
                </span>
              </div>
              <input
                type="checkbox"
                checked={siteSettings.arabicEnabled}
                onChange={(e) =>
                  updateSiteSettings({
                    ...siteSettings,
                    arabicEnabled: e.target.checked,
                  })
                }
                className="accent-[#C5A880] w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-[#0D0D0D] border border-[#262626] rounded-lg cursor-pointer">
              <div>
                <span className="font-semibold text-white block">RTL Auto-Direction</span>
                <span className="text-[11px] text-neutral-400">
                  Automatically flips layout flow, icons, and typography when Arabic is selected.
                </span>
              </div>
              <input
                type="checkbox"
                checked={siteSettings.rtlSupport}
                onChange={(e) =>
                  updateSiteSettings({
                    ...siteSettings,
                    rtlSupport: e.target.checked,
                  })
                }
                className="accent-[#C5A880] w-4 h-4"
              />
            </label>
          </div>

          <div className="pt-4 border-t border-[#242424] flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-5 py-2 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded shadow-md"
            >
              Save Language Settings
            </button>
          </div>
        </div>
      )}

      {/* --- USERS & SECURITY TAB --- */}
      {activeTab === 'security' && (
        <form
          onSubmit={handleSecurityUpdate}
          className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-5 max-w-2xl text-xs"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-[#242424]">
            <KeyRound className="w-4 h-4 text-[#C5A880]" />
            <h3 className="font-semibold text-white text-sm">
              Administrator Credentials & Password Hashing
            </h3>
          </div>

          <p className="text-neutral-400 text-xs">
            Change initial setup credentials (<code className="text-[#C5A880]">admin</code> /{' '}
            <code className="text-[#C5A880]">Admin@2027</code>). Passwords are cryptographically salted and hashed using the Web Crypto API SHA-256 standard.
          </p>

          {securityStatus && (
            <div
              className={`p-3 rounded-lg text-xs ${
                securityStatus.type === 'success'
                  ? 'bg-emerald-950/70 border border-emerald-800 text-emerald-300'
                  : 'bg-red-950/70 border border-red-800 text-red-300'
              }`}
            >
              {securityStatus.message}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-400 mb-1">Username</label>
              <input
                type="text"
                required
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full p-2.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full p-2.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-[#222222] space-y-3">
            <div>
              <label className="block text-neutral-400 mb-1">
                Current Password (Verification Required)
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full p-2.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 mb-1">
                  New Password (Optional, leave blank to keep unchanged)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New strong password"
                  className="w-full p-2.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full p-2.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded text-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#242424] flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded shadow-md"
            >
              Update Security Credentials
            </button>
          </div>
        </form>
      )}

      {/* --- BACKUPS & RESTORE TAB --- */}
      {activeTab === 'backups' && (
        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-6 max-w-3xl text-xs">
          <div>
            <h3 className="font-semibold text-white text-sm mb-1">Full Website Snapshots & Restoration</h3>
            <p className="text-neutral-400 text-xs">
              Export entire website state (all pages, sections, builder elements, projects, media references, and custom colors) to a portable JSON backup file.
            </p>
          </div>

          {backupStatus && (
            <div className="p-3 bg-neutral-800 border border-neutral-700 rounded text-neutral-200">
              {backupStatus}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-[#0D0D0D] border border-[#242424] rounded-xl flex flex-col justify-between space-y-4">
              <div>
                <Download className="w-6 h-6 text-[#C5A880] mb-2" />
                <h4 className="font-semibold text-white text-sm">Download JSON Backup</h4>
                <p className="text-neutral-400 text-[11px] mt-1">
                  Exports complete snapshot of all CMS content, pages, and theme settings.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadBackup}
                className="w-full py-2.5 bg-[#1F1F1F] hover:bg-[#282828] text-white font-medium rounded border border-[#333333] transition-colors"
              >
                Download Archive (.json)
              </button>
            </div>

            <div className="p-5 bg-[#0D0D0D] border border-[#C5A880]/30 rounded-xl flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#141414] to-[#0D0D0D]">
              <div>
                <FileCode className="w-6 h-6 text-[#C5A880] mb-2" />
                <h4 className="font-semibold text-white text-sm">Download Offline ZIP</h4>
                <p className="text-neutral-400 text-[11px] mt-1">
                  Complete website ZIP with all photos, fonts, and offline index.html. No localhost needed.
                </p>
              </div>
              <a
                href="./akaber-real-estate-offline.zip"
                download="akaber-real-estate-offline.zip"
                className="w-full py-2.5 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold rounded text-center transition-colors block"
              >
                Download Offline ZIP
              </a>
            </div>

            <div className="p-5 bg-[#0D0D0D] border border-[#242424] rounded-xl flex flex-col justify-between space-y-4">
              <div>
                <Upload className="w-6 h-6 text-[#C5A880] mb-2" />
                <h4 className="font-semibold text-white text-sm">Restore from JSON</h4>
                <p className="text-neutral-400 text-[11px] mt-1">
                  Upload an exported snapshot to restore previous versions or replicate content.
                </p>
              </div>
              <input
                type="file"
                ref={backupInputRef}
                onChange={handleImportBackup}
                accept=".json"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => backupInputRef.current?.click()}
                className="w-full py-2.5 bg-[#1F1F1F] hover:bg-[#282828] text-white font-semibold rounded transition-colors border border-[#333]"
              >
                Upload & Restore Backup
              </button>
            </div>
          </div>

          {/* Danger Zone: Reset to Defaults */}
          <div className="pt-6 border-t border-red-950/60 p-4 bg-red-950/10 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Reset to Akaber Default Framework</span>
            </div>
            <p className="text-neutral-400 text-[11px]">
              Restores initial clean placeholders and default pages. This clears local customization.
            </p>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all pages, projects, and themes to initial Akaber defaults?')) {
                  resetToDefaults();
                  setBackupStatus('Restored to initial Akaber defaults.');
                }
              }}
              className="px-4 py-2 bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700 rounded font-medium text-xs transition-colors"
            >
              Reset to Initial State
            </button>
          </div>
        </div>
      )}

      {/* --- ACTIVITY AUDIT TAB --- */}
      {activeTab === 'activity' && (
        <div className="bg-[#141414] border border-[#242424] rounded-xl p-6 space-y-4 max-w-4xl text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
            <h3 className="font-semibold text-white text-sm">Security & Activity Audit Log</h3>
            <span className="text-[11px] text-neutral-500 font-mono">
              {activityLog.length} recorded events
            </span>
          </div>

          {activityLog.length === 0 ? (
            <div className="py-12 text-center text-neutral-400">
              No audit log entries recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-[#202020]">
              {activityLog.map((log) => (
                <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{log.action}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                        {log.user}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400">{log.target}</p>
                  </div>
                  <span className="text-[10px] text-neutral-500 whitespace-nowrap font-mono">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
