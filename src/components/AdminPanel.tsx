import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  X, 
  Settings, 
  Palette, 
  Languages, 
  Layers, 
  Database, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Code, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Save, 
  Sparkles,
  Copy,
  ExternalLink,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Language, Property, SectionVisibility, ThemeId } from '../types';
import { THEMES } from '../data/themes';
import { TRANSLATIONS } from '../data/translations';
import { WORDPRESS_INTEGRATION_CODE } from '../data/wordpressGuide';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  // State from parent
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  sectionVisibility: SectionVisibility;
  onSectionVisibilityChange: (sections: SectionVisibility) => void;
  properties: Property[];
  onPropertiesChange: (properties: Property[]) => void;
  customTranslations: Record<Language, any>;
  onCustomTranslationsChange: (translations: Record<Language, any>) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
  currentLanguage,
  onLanguageChange,
  sectionVisibility,
  onSectionVisibilityChange,
  properties,
  onPropertiesChange,
  customTranslations,
  onCustomTranslationsChange,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'themes' | 'textEditor' | 'sections' | 'properties' | 'backup' | 'wordpress'
  >('themes');

  // Text Customizer state
  const [editorLanguage, setEditorLanguage] = useState<Language>(currentLanguage);
  const [selectedSectionKey, setSelectedSectionKey] = useState<string>('hero');
  const [draftTexts, setDraftTexts] = useState<Record<string, string>>({});
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [pendingSaveField, setPendingSaveField] = useState<{ path: string; val: string } | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Property Editor Modal
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isNewProperty, setIsNewProperty] = useState(false);

  // Backup & Restore
  const [backupRestoreStatus, setBackupRestoreStatus] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Show notification helper
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === 'admin' && passwordInput === 'Admin@123') {
      setIsAuthenticated(true);
      setAuthError('');
      showNotification('Access Granted! Welcome to Akaber Master Control.');
    } else {
      setAuthError('Invalid credentials. Expected username: admin / password: Admin@123');
    }
  };

  // Get active translation dictionary
  const currentTrans = customTranslations[editorLanguage] || TRANSLATIONS[editorLanguage] || TRANSLATIONS.en;

  // Save Text changes with Language Scope (Only this language VS All languages)
  const executeTextSave = (applyToAll: boolean) => {
    if (!pendingSaveField) return;
    const { path, val } = pendingSaveField;
    const pathParts = path.split('.');

    const updated = JSON.parse(JSON.stringify(customTranslations));

    const setNestedValue = (obj: any, keys: string[], value: any) => {
      let current = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
    };

    if (applyToAll) {
      (['en', 'tr', 'ar'] as Language[]).forEach((lang) => {
        if (!updated[lang]) updated[lang] = JSON.parse(JSON.stringify(TRANSLATIONS[lang]));
        setNestedValue(updated[lang], pathParts, val);
      });
      showNotification(`Text updated across ALL languages (EN, TR, AR)!`);
    } else {
      if (!updated[editorLanguage]) {
        updated[editorLanguage] = JSON.parse(JSON.stringify(TRANSLATIONS[editorLanguage]));
      }
      setNestedValue(updated[editorLanguage], pathParts, val);
      showNotification(`Text updated for [${editorLanguage.toUpperCase()}] language only.`);
    }

    onCustomTranslationsChange(updated);
    setSaveModalOpen(false);
    setPendingSaveField(null);
  };

  // Trigger Save Modal
  const requestFieldSave = (path: string, val: string) => {
    setPendingSaveField({ path, val });
    setSaveModalOpen(true);
  };

  // Export Backup
  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      theme: currentTheme,
      language: currentLanguage,
      sectionVisibility,
      properties,
      customTranslations,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `akaber-site-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showNotification('Backup exported successfully to your device!');
  };

  // Import Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target?.result as string);
        if (data.theme) onThemeChange(data.theme);
        if (data.language) onLanguageChange(data.language);
        if (data.sectionVisibility) onSectionVisibilityChange(data.sectionVisibility);
        if (data.properties) onPropertiesChange(data.properties);
        if (data.customTranslations) onCustomTranslationsChange(data.customTranslations);
        setBackupRestoreStatus('Backup successfully restored! All website settings applied.');
        showNotification('Full website restored from backup JSON!');
      } catch (err) {
        setBackupRestoreStatus('Error: Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  // Reset to Factory Defaults
  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all customizations and texts to factory defaults?')) {
      onCustomTranslationsChange(JSON.parse(JSON.stringify(TRANSLATIONS)));
      onSectionVisibilityChange({
        hero: true,
        trustStats: true,
        aboutCompany: true,
        services: true,
        featuredProperties: true,
        turkeyInvestment: true,
        contact: true,
        footer: true,
      });
      onThemeChange('royal-navy');
      showNotification('All settings restored to factory state.');
    }
  };

  // Property Deletion
  const handleDeleteProperty = (id: string) => {
    if (window.confirm('Are you sure you want to remove this property listing?')) {
      const updated = properties.filter((p) => p.id !== id);
      onPropertiesChange(updated);
      showNotification('Property removed from catalog.');
    }
  };

  // Property Save
  const handleSaveProperty = (p: Property) => {
    if (isNewProperty) {
      onPropertiesChange([p, ...properties]);
      showNotification('New property added to catalog!');
    } else {
      const updated = properties.map((item) => (item.id === p.id ? p : item));
      onPropertiesChange(updated);
      showNotification('Property updated successfully!');
    }
    setEditingProperty(null);
    setIsNewProperty(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#090F22] border border-[#D4AF37]/40 rounded-2xl shadow-2xl shadow-black/80 flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#0B152E] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
                  Akaber Master Control Panel
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-[#070D1E]">
                  Admin Mode
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live Website Customizer, Trilingual Word Editor, Theme Switcher & WordPress Exporter
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Global Toast Notification */}
        {notification && (
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#AA8022] text-[#070D1E] px-4 py-2.5 text-xs font-bold flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-sm font-bold opacity-75 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Auth Gate vs Control Dashboard */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-cinzel text-2xl font-bold text-white mb-2">
              Administrator Login Required
            </h4>
            <p className="text-slate-400 text-sm max-w-md mb-6">
              Enter the designated administrative credentials to customize website text, switch luxury themes, manage properties, and configure WordPress deployment.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="admin"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-[#070D1E] border border-slate-700 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#070D1E] border border-slate-700 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#070D1E] bg-gradient-to-r from-[#F9F1D6] via-[#D4AF37] to-[#C5A059] hover:from-white hover:to-[#E6CA65] shadow-lg transition-transform hover:scale-[1.01]"
              >
                Access Control Panel
              </button>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-500">
                  Pre-configured login: <strong className="text-slate-300">admin</strong> / <strong className="text-slate-300">Admin@123</strong>
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-[#070D1E] border-r border-slate-800 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
              <button
                onClick={() => setActiveTab('themes')}
                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-left transition-all ${
                  activeTab === 'themes'
                    ? 'bg-[#D4AF37] text-[#070D1E] font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Palette className="w-4 h-4 shrink-0" />
                <span>Themes & Video Styles</span>
              </button>

              <button
                onClick={() => setActiveTab('textEditor')}
                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-left transition-all ${
                  activeTab === 'textEditor'
                    ? 'bg-[#D4AF37] text-[#070D1E] font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Languages className="w-4 h-4 shrink-0" />
                <span>Trilingual Text Editor</span>
              </button>

              <button
                onClick={() => setActiveTab('sections')}
                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-left transition-all ${
                  activeTab === 'sections'
                    ? 'bg-[#D4AF37] text-[#070D1E] font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Sections Manager (Show/Hide)</span>
              </button>

              <button
                onClick={() => setActiveTab('properties')}
                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-left transition-all ${
                  activeTab === 'properties'
                    ? 'bg-[#D4AF37] text-[#070D1E] font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Database className="w-4 h-4 shrink-0" />
                <span>Properties ({properties.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-left transition-all ${
                  activeTab === 'backup'
                    ? 'bg-[#D4AF37] text-[#070D1E] font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Backup & Restore</span>
              </button>

              <button
                onClick={() => setActiveTab('wordpress')}
                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-left transition-all ${
                  activeTab === 'wordpress'
                    ? 'bg-[#D4AF37] text-[#070D1E] font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Code className="w-4 h-4 shrink-0" />
                <span>WordPress Plugin & Setup</span>
              </button>

              <div className="mt-auto pt-4 border-t border-slate-800/80 hidden md:block">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full text-center py-2 px-3 text-[11px] text-slate-500 hover:text-red-400 transition-colors"
                >
                  Sign Out of Admin
                </button>
              </div>
            </div>

            {/* Main Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#090F22]">
              
              {/* TAB 1: ARCHITECTURAL THEMES */}
              {activeTab === 'themes' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-cinzel text-xl font-bold text-white">
                      Architectural Themes & Video Interaction Styles
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">
                      Choose from the Awwwards-inspired "FIND Real Estate" video PropTech theme or our bespoke luxury palace themes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.values(THEMES).map((th) => {
                      const isSelected = currentTheme === th.id;
                      return (
                        <div
                          key={th.id}
                          onClick={() => {
                            onThemeChange(th.id as ThemeId);
                            showNotification(`Applied Theme: ${th.name}`);
                          }}
                          className={`cursor-pointer rounded-xl border p-4 transition-all relative group flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#D4AF37] bg-[#0F1E3D] shadow-lg shadow-[#D4AF37]/10'
                              : 'border-slate-800 bg-[#070D1E]/60 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            {/* Color Bar Preview */}
                            <div className="flex items-center gap-2 mb-3">
                              <div
                                className="w-8 h-8 rounded-lg border border-white/20 shrink-0 shadow-inner"
                                style={{ backgroundColor: th.previewColor }}
                              />
                              <div
                                className="w-6 h-8 rounded-lg border border-white/20 shrink-0 shadow-inner"
                                style={{ backgroundColor: th.previewAccent }}
                              />
                              <div className="flex-1 text-right">
                                {isSelected ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                                    <Check className="w-3 h-3" /> ACTIVE
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-500 group-hover:text-slate-300">
                                    Click to Activate
                                  </span>
                                )}
                              </div>
                            </div>

                            <h5 className="font-cinzel text-sm font-bold text-white mb-1">
                              {th.name}
                            </h5>
                            <p className="text-[11px] text-[#D4AF37] mb-2 font-arabic">
                              {th.nativeName}
                            </p>
                            <p className="text-xs text-slate-400 leading-relaxed font-light">
                              {th.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                            <span className="text-slate-500">Accent: {th.accentGold}</span>
                            <button
                              type="button"
                              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                isSelected
                                  ? 'bg-[#D4AF37] text-[#070D1E]'
                                  : 'bg-slate-800 text-slate-200 group-hover:bg-[#D4AF37] group-hover:text-[#070D1E]'
                              } transition-colors`}
                            >
                              {isSelected ? 'Applied' : 'Select Theme'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: TRILINGUAL TEXT EDITOR */}
              {activeTab === 'textEditor' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-cinzel text-xl font-bold text-white">
                        Trilingual Live Text Customizer
                      </h4>
                      <p className="text-slate-400 text-xs mt-1">
                        Modify any English, Arabic, or Turkish headline, paragraph, badge or quote. When you save, choose whether to update only this language or propagate across all languages.
                      </p>
                    </div>

                    {/* Language Selector */}
                    <div className="flex items-center gap-2 bg-[#070D1E] p-1.5 rounded-xl border border-slate-800 shrink-0">
                      {(['en', 'tr', 'ar'] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setEditorLanguage(lang)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            editorLanguage === lang
                              ? 'bg-[#D4AF37] text-[#070D1E]'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          {lang === 'en' ? '🇬🇧 English' : lang === 'tr' ? '🇹🇷 Türkçe' : '🇸🇦 العربية'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section Navigator */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
                    {[
                      { key: 'hero', label: 'Hero & Search' },
                      { key: 'about', label: 'Company Overview' },
                      { key: 'services', label: '4 Core Services' },
                      { key: 'turkeySection', label: 'Turkey Investment' },
                      { key: 'contact', label: 'Contact & Inquiry Form' },
                      { key: 'footer', label: 'Footer Information' },
                    ].map((sec) => (
                      <button
                        key={sec.key}
                        onClick={() => setSelectedSectionKey(sec.key)}
                        className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                          selectedSectionKey === sec.key
                            ? 'bg-[#0F1E3D] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </div>

                  {/* Editable Fields for Selected Section */}
                  <div className="space-y-4">
                    {selectedSectionKey === 'hero' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            Hero Badge Text
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              defaultValue={currentTrans.hero.badge}
                              onChange={(e) => (draftTexts['hero.badge'] = e.target.value)}
                              className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave('hero.badge', draftTexts['hero.badge'] || currentTrans.hero.badge)
                              }
                              className="px-4 py-2 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl hover:bg-white transition-colors"
                            >
                              Save Field
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                              Headline Part 1
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                defaultValue={currentTrans.hero.title1}
                                onChange={(e) => (draftTexts['hero.title1'] = e.target.value)}
                                className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                              />
                              <button
                                onClick={() =>
                                  requestFieldSave('hero.title1', draftTexts['hero.title1'] || currentTrans.hero.title1)
                                }
                                className="px-3 py-2 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl hover:bg-white transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                              Headline Highlight (Gold Gradient)
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                defaultValue={currentTrans.hero.titleHighlight}
                                onChange={(e) => (draftTexts['hero.titleHighlight'] = e.target.value)}
                                className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                              />
                              <button
                                onClick={() =>
                                  requestFieldSave(
                                    'hero.titleHighlight',
                                    draftTexts['hero.titleHighlight'] || currentTrans.hero.titleHighlight
                                  )
                                }
                                className="px-3 py-2 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl hover:bg-white transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            Hero Subtitle / Description
                          </label>
                          <div className="flex gap-2">
                            <textarea
                              rows={3}
                              defaultValue={currentTrans.hero.subtitle}
                              onChange={(e) => (draftTexts['hero.subtitle'] = e.target.value)}
                              className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave('hero.subtitle', draftTexts['hero.subtitle'] || currentTrans.hero.subtitle)
                              }
                              className="px-4 py-2 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl hover:bg-white transition-colors self-end"
                            >
                              Save Field
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedSectionKey === 'about' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            Core Company Quote (User's Exact Mission Statement)
                          </label>
                          <div className="flex gap-2">
                            <textarea
                              rows={3}
                              defaultValue={currentTrans.about.quote}
                              onChange={(e) => (draftTexts['about.quote'] = e.target.value)}
                              className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave('about.quote', draftTexts['about.quote'] || currentTrans.about.quote)
                              }
                              className="px-4 py-2 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl hover:bg-white transition-colors self-end"
                            >
                              Save Field
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            About Heading
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              defaultValue={currentTrans.about.heading}
                              onChange={(e) => (draftTexts['about.heading'] = e.target.value)}
                              className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave('about.heading', draftTexts['about.heading'] || currentTrans.about.heading)
                              }
                              className="px-4 py-2 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl hover:bg-white transition-colors"
                            >
                              Save Field
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            Paragraph 1 (Analysis & Purchasing)
                          </label>
                          <div className="flex gap-2">
                            <textarea
                              rows={3}
                              defaultValue={currentTrans.about.descP1}
                              onChange={(e) => (draftTexts['about.descP1'] = e.target.value)}
                              className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave('about.descP1', draftTexts['about.descP1'] || currentTrans.about.descP1)
                              }
                              className="px-4 py-2 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl hover:bg-white transition-colors self-end"
                            >
                              Save Field
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedSectionKey === 'services' && (
                      <div className="space-y-4">
                        <div className="p-3 bg-[#070D1E] border border-slate-800 rounded-xl">
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            1. Large Plots Subdivision & Sales
                          </label>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              defaultValue={currentTrans.services.item1.title}
                              onChange={(e) => (draftTexts['services.item1.title'] = e.target.value)}
                              className="flex-1 bg-[#090F22] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'services.item1.title',
                                  draftTexts['services.item1.title'] || currentTrans.services.item1.title
                                )
                              }
                              className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl"
                            >
                              Save Title
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <textarea
                              rows={2}
                              defaultValue={currentTrans.services.item1.short}
                              onChange={(e) => (draftTexts['services.item1.short'] = e.target.value)}
                              className="flex-1 bg-[#090F22] border border-slate-700 rounded-xl p-2 text-xs text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'services.item1.short',
                                  draftTexts['services.item1.short'] || currentTrans.services.item1.short
                                )
                              }
                              className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl self-end"
                            >
                              Save Desc
                            </button>
                          </div>
                        </div>

                        <div className="p-3 bg-[#070D1E] border border-slate-800 rounded-xl">
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            2. Residential Renovation & Profitable Resale
                          </label>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              defaultValue={currentTrans.services.item2.title}
                              onChange={(e) => (draftTexts['services.item2.title'] = e.target.value)}
                              className="flex-1 bg-[#090F22] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'services.item2.title',
                                  draftTexts['services.item2.title'] || currentTrans.services.item2.title
                                )
                              }
                              className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl"
                            >
                              Save Title
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <textarea
                              rows={2}
                              defaultValue={currentTrans.services.item2.short}
                              onChange={(e) => (draftTexts['services.item2.short'] = e.target.value)}
                              className="flex-1 bg-[#090F22] border border-slate-700 rounded-xl p-2 text-xs text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'services.item2.short',
                                  draftTexts['services.item2.short'] || currentTrans.services.item2.short
                                )
                              }
                              className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl self-end"
                            >
                              Save Desc
                            </button>
                          </div>
                        </div>

                        <div className="p-3 bg-[#070D1E] border border-slate-800 rounded-xl">
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            3. Commercial Property Leasing & Cash Flow
                          </label>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              defaultValue={currentTrans.services.item3.title}
                              onChange={(e) => (draftTexts['services.item3.title'] = e.target.value)}
                              className="flex-1 bg-[#090F22] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'services.item3.title',
                                  draftTexts['services.item3.title'] || currentTrans.services.item3.title
                                )
                              }
                              className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl"
                            >
                              Save Title
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <textarea
                              rows={2}
                              defaultValue={currentTrans.services.item3.short}
                              onChange={(e) => (draftTexts['services.item3.short'] = e.target.value)}
                              className="flex-1 bg-[#090F22] border border-slate-700 rounded-xl p-2 text-xs text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'services.item3.short',
                                  draftTexts['services.item3.short'] || currentTrans.services.item3.short
                                )
                              }
                              className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl self-end"
                            >
                              Save Desc
                            </button>
                          </div>
                        </div>

                        <div className="p-3 bg-[#070D1E] border border-slate-800 rounded-xl">
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            4. Strategic Opportunity Analysis & Advisory
                          </label>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              defaultValue={currentTrans.services.item4.title}
                              onChange={(e) => (draftTexts['services.item4.title'] = e.target.value)}
                              className="flex-1 bg-[#090F22] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'services.item4.title',
                                  draftTexts['services.item4.title'] || currentTrans.services.item4.title
                                )
                              }
                              className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl"
                            >
                              Save Title
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <textarea
                              rows={2}
                              defaultValue={currentTrans.services.item4.short}
                              onChange={(e) => (draftTexts['services.item4.short'] = e.target.value)}
                              className="flex-1 bg-[#090F22] border border-slate-700 rounded-xl p-2 text-xs text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'services.item4.short',
                                  draftTexts['services.item4.short'] || currentTrans.services.item4.short
                                )
                              }
                              className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl self-end"
                            >
                              Save Desc
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedSectionKey === 'turkeySection' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            Section Main Heading
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              defaultValue={currentTrans.turkeySection.heading}
                              onChange={(e) => (draftTexts['turkeySection.heading'] = e.target.value)}
                              className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'turkeySection.heading',
                                  draftTexts['turkeySection.heading'] || currentTrans.turkeySection.heading
                                )
                              }
                              className="px-4 py-2 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl hover:bg-white transition-colors"
                            >
                              Save Field
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            Citizenship Benefit Title & Summary
                          </label>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              defaultValue={currentTrans.turkeySection.citizenshipTitle}
                              onChange={(e) => (draftTexts['turkeySection.citizenshipTitle'] = e.target.value)}
                              className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'turkeySection.citizenshipTitle',
                                  draftTexts['turkeySection.citizenshipTitle'] || currentTrans.turkeySection.citizenshipTitle
                                )
                              }
                              className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl"
                            >
                              Save Title
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <textarea
                              rows={2}
                              defaultValue={currentTrans.turkeySection.citizenshipDesc}
                              onChange={(e) => (draftTexts['turkeySection.citizenshipDesc'] = e.target.value)}
                              className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl p-2 text-xs text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave(
                                  'turkeySection.citizenshipDesc',
                                  draftTexts['turkeySection.citizenshipDesc'] || currentTrans.turkeySection.citizenshipDesc
                                )
                              }
                              className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl self-end"
                            >
                              Save Desc
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedSectionKey === 'contact' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            Contact Section Heading
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              defaultValue={currentTrans.contact.heading}
                              onChange={(e) => (draftTexts['contact.heading'] = e.target.value)}
                              className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave('contact.heading', draftTexts['contact.heading'] || currentTrans.contact.heading)
                              }
                              className="px-4 py-2 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl"
                            >
                              Save Field
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                              Phone / WhatsApp Display
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                defaultValue={currentTrans.contact.phoneVal}
                                onChange={(e) => (draftTexts['contact.phoneVal'] = e.target.value)}
                                className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white"
                              />
                              <button
                                onClick={() =>
                                  requestFieldSave('contact.phoneVal', draftTexts['contact.phoneVal'] || currentTrans.contact.phoneVal)
                                }
                                className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl"
                              >
                                Save
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                              Email Contact Display
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                defaultValue={currentTrans.contact.emailVal}
                                onChange={(e) => (draftTexts['contact.emailVal'] = e.target.value)}
                                className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white"
                              />
                              <button
                                onClick={() =>
                                  requestFieldSave('contact.emailVal', draftTexts['contact.emailVal'] || currentTrans.contact.emailVal)
                                }
                                className="px-3 py-1.5 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedSectionKey === 'footer' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                            Footer Company Bio
                          </label>
                          <div className="flex gap-2">
                            <textarea
                              rows={3}
                              defaultValue={currentTrans.footer.desc}
                              onChange={(e) => (draftTexts['footer.desc'] = e.target.value)}
                              className="flex-1 bg-[#070D1E] border border-slate-700 rounded-xl p-3 text-sm text-white"
                            />
                            <button
                              onClick={() =>
                                requestFieldSave('footer.desc', draftTexts['footer.desc'] || currentTrans.footer.desc)
                              }
                              className="px-4 py-2 bg-[#D4AF37] text-[#070D1E] font-bold text-xs rounded-xl self-end"
                            >
                              Save Field
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: SECTIONS MANAGER (ADD OR REMOVE / SHOW OR HIDE) */}
              {activeTab === 'sections' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-cinzel text-xl font-bold text-white">
                      Page Sections Manager (Add / Remove)
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">
                      Choose which modules appear on the live website. Easily enable or disable sections depending on project requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: 'hero', title: 'Hero Banner & Search Engine', desc: 'Main headline, search tabs and background image' },
                      { key: 'trustStats', title: 'Trust Metrics & Stats Bar', desc: 'Acquisition numbers, satisfaction rate, and verified deeds' },
                      { key: 'aboutCompany', title: 'Company Overview & Mission', desc: 'Akaber development specialization in Turkey' },
                      { key: 'services', title: '4 Core Services Grid', desc: 'Land subdivision, renovation & resale, commercial leases, analysis' },
                      { key: 'featuredProperties', title: 'Featured Properties Catalog', desc: 'Curated listing cards, filters, and modal view' },
                      { key: 'turkeyInvestment', title: 'Turkey Investment Highlights', desc: 'Citizenship by investment and macro Turkish benefits' },
                      { key: 'contact', title: 'Dual Inquire & Acquisition Form', desc: 'Contact advisory & "Offer your land/property to us" tabs' },
                      { key: 'footer', title: 'Luxury Footer', desc: 'Branding, quick navigation, credentials, and legal disclaimers' },
                    ].map((sec) => {
                      const isVisible = (sectionVisibility as any)[sec.key];
                      return (
                        <div
                          key={sec.key}
                          className="p-4 rounded-xl bg-[#070D1E] border border-slate-800 flex items-center justify-between gap-4"
                        >
                          <div>
                            <h5 className="text-sm font-bold text-white mb-0.5">{sec.title}</h5>
                            <p className="text-xs text-slate-400 font-light">{sec.desc}</p>
                          </div>

                          <button
                            onClick={() => {
                              const updated = {
                                ...sectionVisibility,
                                [sec.key]: !isVisible,
                              };
                              onSectionVisibilityChange(updated);
                              showNotification(
                                `${sec.title} is now ${!isVisible ? 'VISIBLE' : 'HIDDEN'} on the live page.`
                              );
                            }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                              isVisible
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                            }`}
                          >
                            {isVisible ? (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Hidden</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: PROPERTIES MANAGEMENT */}
              {activeTab === 'properties' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-cinzel text-xl font-bold text-white">
                        Property Listings Catalog
                      </h4>
                      <p className="text-slate-400 text-xs mt-1">
                        Add, edit, or remove Turkish properties, parcels, and commercial developments.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsNewProperty(true);
                        setEditingProperty({
                          id: `prop-${Date.now()}`,
                          title: 'New Turkish Development Asset',
                          tagline: 'High yield luxury property in Turkey',
                          location: 'Istanbul, Turkey',
                          city: 'Istanbul',
                          country: 'Turkey',
                          type: 'villa',
                          status: 'sale',
                          priceUsd: 1250000,
                          areaSqm: 450,
                          bedrooms: 4,
                          bathrooms: 4,
                          imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
                          gallery: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
                          badges: ['For Sale', 'Featured', 'Verified'],
                          roiPotential: '8.5% Capital Appreciation',
                          description: 'Developed and verified by Akaber Real Estate Turkey.',
                          highlights: ['Prime Location', 'Title Deed (Tapu) Ready', 'Citizenship Eligible'],
                        });
                      }}
                      className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#070D1E] font-bold text-xs flex items-center gap-2 hover:bg-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Property</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {properties.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-xl bg-[#070D1E] border border-slate-800 flex gap-4 items-center justify-between"
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-20 h-20 rounded-lg object-cover shrink-0 border border-slate-700"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block truncate">
                            {p.location} • {p.type.toUpperCase()}
                          </span>
                          <h5 className="text-sm font-bold text-white truncate">{p.title}</h5>
                          <p className="text-xs text-slate-400 font-medium">
                            ${p.priceUsd.toLocaleString()} USD
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setIsNewProperty(false);
                              setEditingProperty(p);
                            }}
                            title="Edit Property"
                            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(p.id)}
                            title="Delete Property"
                            className="p-2 rounded-lg bg-red-950/50 text-red-400 hover:text-red-200 hover:bg-red-900 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: BACKUP & RESTORE */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-cinzel text-xl font-bold text-white">
                      System Backup & Instant Restore
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">
                      Download a complete JSON archive of your entire website layout, trilingual text customizations, selected theme, and property catalogue.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Export Box */}
                    <div className="p-6 rounded-2xl bg-[#070D1E] border border-slate-800 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
                          <Download className="w-6 h-6" />
                        </div>
                        <h5 className="font-cinzel text-base font-bold text-white">
                          Export Complete Website Backup
                        </h5>
                        <p className="text-xs text-slate-400 leading-relaxed mt-1 font-light">
                          Saves all your English, Turkish, and Arabic texts, themes, and properties into a portable JSON file.
                        </p>
                      </div>

                      <button
                        onClick={handleExportBackup}
                        className="w-full py-3 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Backup File</span>
                      </button>
                    </div>

                    {/* Import Box */}
                    <div className="p-6 rounded-2xl bg-[#070D1E] border border-slate-800 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-3">
                          <Upload className="w-6 h-6" />
                        </div>
                        <h5 className="font-cinzel text-base font-bold text-white">
                          Restore from JSON Backup
                        </h5>
                        <p className="text-xs text-slate-400 leading-relaxed mt-1 font-light">
                          Upload any previously saved Akaber backup file to immediately reinstate all content and visual preferences.
                        </p>
                      </div>

                      <label className="w-full py-3 rounded-xl bg-[#0F1E3D] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#070D1E] transition-colors flex items-center justify-center gap-2 cursor-pointer text-center">
                        <Upload className="w-4 h-4" />
                        <span>Choose Backup File</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportBackup}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {backupRestoreStatus && (
                    <div className="p-4 rounded-xl bg-[#0F1E3D] border border-[#D4AF37]/40 text-sm text-slate-200">
                      {backupRestoreStatus}
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-800">
                    <button
                      onClick={handleResetToDefaults}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 border border-red-500/30 hover:bg-red-950/40 transition-colors flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset Website to Default Factory State</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 6: WORDPRESS INTEGRATION */}
              {activeTab === 'wordpress' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-cinzel text-xl font-bold text-white">
                      WordPress One-Click Installation & Shortcode
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">
                      You can easily install or embed this complete Akaber Real Estate platform into any WordPress website using the official plugin code or standard iframe.
                    </p>
                  </div>

                  {/* 3 Step Integration Guide */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-[#070D1E] border border-slate-800">
                      <span className="text-[#D4AF37] font-bold block mb-1">Step 1: Create Plugin File</span>
                      <p className="text-slate-400 font-light">
                        In WordPress <code className="text-slate-200">wp-content/plugins/</code>, create folder <code className="text-[#D4AF37]">akaber-portal</code> with file <code className="text-slate-200">akaber-portal.php</code>.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#070D1E] border border-slate-800">
                      <span className="text-[#D4AF37] font-bold block mb-1">Step 2: Activate in WP Admin</span>
                      <p className="text-slate-400 font-light">
                        Navigate to Plugins &rarr; Installed Plugins and click <strong>Activate</strong> under "Akaber Real Estate Embed".
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#070D1E] border border-slate-800">
                      <span className="text-[#D4AF37] font-bold block mb-1">Step 3: Paste Shortcode</span>
                      <p className="text-slate-400 font-light">
                        Insert shortcode <code className="text-[#D4AF37] font-bold">[akaber_portal]</code> in Elementor, Gutenberg, or WPBakery.
                      </p>
                    </div>
                  </div>

                  {/* Ready to copy code snippet */}
                  <div className="p-4 rounded-xl bg-[#070D1E] border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-[#D4AF37]">akaber-portal.php (Full WordPress Plugin Code)</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(WORDPRESS_INTEGRATION_CODE.shortcode);
                          setCopiedCode(true);
                          showNotification('WordPress plugin PHP code copied to clipboard!');
                          setTimeout(() => setCopiedCode(false), 3000);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#D4AF37] text-[#070D1E] text-xs font-bold flex items-center gap-1.5 hover:bg-white transition-colors"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied!' : 'Copy Plugin Code'}</span>
                      </button>
                    </div>
                    <pre className="text-[11px] font-mono bg-black/60 p-4 rounded-lg text-slate-300 overflow-x-auto max-h-64 border border-slate-900">
                      {WORDPRESS_INTEGRATION_CODE.shortcode}
                    </pre>
                  </div>

                  {/* Quick Shortcode Box */}
                  <div className="p-4 rounded-xl bg-[#0F1E3D] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h5 className="text-sm font-bold text-white">Elementor & Gutenberg Quick Embed:</h5>
                      <code className="text-sm font-mono text-[#D4AF37] block mt-1">
                        [akaber_portal height="100vh" theme="{currentTheme}" lang="{currentLanguage}"]
                      </code>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`[akaber_portal height="100vh" theme="${currentTheme}" lang="${currentLanguage}"]`);
                        showNotification('Shortcode copied to clipboard!');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#070D1E] font-bold text-xs whitespace-nowrap hover:bg-white transition-colors"
                    >
                      Copy Shortcode
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* MODAL: Save Language Scope Question (Only this language VS All languages) */}
      {saveModalOpen && pendingSaveField && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-[#0B152E] border border-[#D4AF37] rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center">
              <Languages className="w-6 h-6" />
            </div>

            <h4 className="font-cinzel text-lg font-bold text-white">
              Apply Customization Scope
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              You modified <strong>"{pendingSaveField.path}"</strong>. Would you like this customized wording to apply <strong>only to {editorLanguage.toUpperCase()}</strong> or <strong>apply across all languages</strong>?
            </p>

            <div className="p-3 rounded-lg bg-[#070D1E] border border-slate-800 text-xs text-[#D4AF37] font-mono break-all">
              "{pendingSaveField.val}"
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => executeTextSave(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors text-center"
              >
                Save Only for {editorLanguage.toUpperCase()}
              </button>

              <button
                onClick={() => executeTextSave(true)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F9F1D6] via-[#D4AF37] to-[#C5A059] text-[#070D1E] hover:from-white hover:to-[#E6CA65] shadow-lg transition-transform hover:scale-[1.02] text-center"
              >
                Apply to ALL Languages
              </button>
            </div>

            <div className="text-center pt-1">
              <button
                onClick={() => setSaveModalOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Property Editor */}
      {editingProperty && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0B152E] border border-[#D4AF37]/50 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-cinzel text-lg font-bold text-white">
                {isNewProperty ? 'Add New Property Listing' : 'Edit Property Details'}
              </h4>
              <button
                onClick={() => setEditingProperty(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Property Title</label>
                <input
                  type="text"
                  value={editingProperty.title}
                  onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                  className="w-full bg-[#070D1E] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Location / District</label>
                  <input
                    type="text"
                    value={editingProperty.location}
                    onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                    className="w-full bg-[#070D1E] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Price (USD)</label>
                  <input
                    type="number"
                    value={editingProperty.priceUsd}
                    onChange={(e) => setEditingProperty({ ...editingProperty, priceUsd: Number(e.target.value) })}
                    className="w-full bg-[#070D1E] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Property Type</label>
                  <select
                    value={editingProperty.type}
                    onChange={(e) => setEditingProperty({ ...editingProperty, type: e.target.value as any })}
                    className="w-full bg-[#070D1E] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land Plot</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Listing Status</label>
                  <select
                    value={editingProperty.status}
                    onChange={(e) => setEditingProperty({ ...editingProperty, status: e.target.value as any })}
                    className="w-full bg-[#070D1E] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="investment">Investment Asset</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Area (sq.m)</label>
                  <input
                    type="number"
                    value={editingProperty.areaSqm}
                    onChange={(e) => setEditingProperty({ ...editingProperty, areaSqm: Number(e.target.value) })}
                    className="w-full bg-[#070D1E] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProperty.imageUrl}
                  onChange={(e) => setEditingProperty({ ...editingProperty, imageUrl: e.target.value })}
                  className="w-full bg-[#070D1E] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProperty.description}
                  onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                  className="w-full bg-[#070D1E] border border-slate-700 rounded-xl p-3 text-sm text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveProperty(editingProperty)}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#070D1E] font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
                >
                  Save Property
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
