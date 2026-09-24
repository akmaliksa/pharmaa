/**
 * Akaber Real Estate Development - Central CMS & State Context
 * Manages full persistence, multilingual coordination, auth session, and page builder history
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  ActivityLog,
  AdminTab,
  AdminUser,
  AuthSession,
  BuilderPage,
  FooterConfig,
  FormInquiry,
  HeaderConfig,
  Language,
  MediaItem,
  MultiLangString,
  NavigationMenu,
  NewsItem,
  PartnerItem,
  ProjectItem,
  SaveLanguageChoice,
  SiteSettings,
  TestimonialItem,
  ThemeAnimations,
  ThemeColors,
  ThemeTypography,
} from '../types';
import {
  INITIAL_FOOTER_CONFIG,
  INITIAL_HEADER_CONFIG,
  INITIAL_MEDIA,
  INITIAL_MENUS,
  INITIAL_NEWS,
  INITIAL_PAGES,
  INITIAL_PARTNERS,
  INITIAL_PROJECTS,
  INITIAL_SITE_SETTINGS,
  INITIAL_TESTIMONIALS,
  INITIAL_THEME_ANIMATIONS,
  INITIAL_THEME_COLORS,
  INITIAL_THEME_TYPOGRAPHY,
} from '../data/initialData';
import { clearSession, getActiveSession } from '../utils/security';

const STORAGE_KEYS = {
  PAGES: 'akaber_cms_pages_v3',
  PROJECTS: 'akaber_cms_projects_v3',
  NEWS: 'akaber_cms_news_v3',
  TESTIMONIALS: 'akaber_cms_testimonials_v3',
  PARTNERS: 'akaber_cms_partners_v3',
  MEDIA: 'akaber_cms_media_v3',
  MENUS: 'akaber_cms_menus_v3',
  INQUIRIES: 'akaber_cms_inquiries_v3',
  THEME_COLORS: 'akaber_cms_colors_v3',
  THEME_TYPO: 'akaber_cms_typography_v3',
  THEME_ANIM: 'akaber_cms_animations_v3',
  HEADER: 'akaber_cms_header_v3',
  FOOTER: 'akaber_cms_footer_v3',
  SETTINGS: 'akaber_cms_settings_v3',
  LOGS: 'akaber_cms_activity_v3',
  LANG: 'akaber_cms_lang_v3',
};

interface CmsContextType {
  // Multilingual & Active Page
  activeLanguage: Language;
  setActiveLanguage: (lang: Language) => void;
  isRtl: boolean;
  t: (str?: MultiLangString | string, fallback?: string) => string;
  currentPageId: string;
  setCurrentPageId: (id: string) => void;
  currentPage: BuilderPage;

  // Pages & Page Builder
  pages: BuilderPage[];
  updatePage: (page: BuilderPage, recordHistory?: boolean) => void;
  createPage: (title: string, slug: string) => BuilderPage;
  deletePage: (id: string) => void;
  duplicatePage: (id: string) => void;

  // Undo / Redo
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;

  // CMS Collections
  projects: ProjectItem[];
  setProjects: (projects: ProjectItem[]) => void;
  updateProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;

  news: NewsItem[];
  setNews: (news: NewsItem[]) => void;
  updateNews: (item: NewsItem) => void;
  deleteNews: (id: string) => void;

  testimonials: TestimonialItem[];
  setTestimonials: (items: TestimonialItem[]) => void;
  updateTestimonial: (item: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;

  partners: PartnerItem[];
  setPartners: (partners: PartnerItem[]) => void;
  updatePartner: (partner: PartnerItem) => void;
  deletePartner: (id: string) => void;

  media: MediaItem[];
  addMediaItem: (item: MediaItem) => void;
  updateMediaItem: (item: MediaItem) => void;
  deleteMediaItem: (id: string) => void;

  menus: NavigationMenu[];
  updateMenu: (menu: NavigationMenu) => void;

  inquiries: FormInquiry[];
  submitInquiry: (inquiry: Omit<FormInquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: FormInquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // Design Systems & Settings
  themeColors: ThemeColors;
  updateThemeColors: (colors: ThemeColors) => void;
  themeTypography: ThemeTypography;
  updateThemeTypography: (typo: ThemeTypography) => void;
  themeAnimations: ThemeAnimations;
  updateThemeAnimations: (anim: ThemeAnimations) => void;
  headerConfig: HeaderConfig;
  updateHeaderConfig: (cfg: HeaderConfig) => void;
  footerConfig: FooterConfig;
  updateFooterConfig: (cfg: FooterConfig) => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: SiteSettings) => void;

  // Activity Log
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;

  // Authentication
  session: AuthSession | null;
  setSession: (session: AuthSession | null) => void;
  logout: () => void;

  // UI state
  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
  activeAdminTab: AdminTab;
  setActiveAdminTab: (tab: AdminTab) => void;
  selectedProject: ProjectItem | null;
  setSelectedProject: (proj: ProjectItem | null) => void;

  // Backup & Restore
  exportSiteJson: () => string;
  importSiteJson: (json: string) => boolean;
  resetToDefaults: () => void;

  // Multilingual Save Dialog helper
  saveModalTarget: {
    isOpen: boolean;
    title: string;
    onConfirm: (choice: SaveLanguageChoice) => void;
  } | null;
  openSaveModal: (title: string, onConfirm: (choice: SaveLanguageChoice) => void) => void;
  closeSaveModal: () => void;
}

const CmsContext = createContext<CmsContextType | null>(null);

function loadItem<T>(key: string, fallback: T): T {
  try {
    let raw = localStorage.getItem(key);
    if (raw) {
      if (raw.includes('/src/assets/images/')) {
        raw = raw.replace(/\/src\/assets\/images\//g, 'images/');
      }
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error(`Failed to load ${key}`, e);
  }
  return fallback;
}

function saveItem<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save ${key}`, e);
  }
}

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language & RTL
  const [activeLanguage, setActiveLanguageState] = useState<Language>(() =>
    loadItem(STORAGE_KEYS.LANG, 'en')
  );

  const setActiveLanguage = useCallback((lang: Language) => {
    setActiveLanguageState(lang);
    saveItem(STORAGE_KEYS.LANG, lang);
  }, []);

  const isRtl = activeLanguage === 'ar';

  // Translate helper
  const t = useCallback(
    (str?: MultiLangString | string, fallback = ''): string => {
      if (!str) return fallback;
      if (typeof str === 'string') return str;
      if (str[activeLanguage]) return str[activeLanguage];
      if (str['en']) return str['en'];
      const values = Object.values(str);
      return values.length > 0 ? values[0] : fallback;
    },
    [activeLanguage]
  );

  // Pages
  const [pages, setPages] = useState<BuilderPage[]>(() =>
    loadItem(STORAGE_KEYS.PAGES, INITIAL_PAGES)
  );
  const [currentPageId, setCurrentPageId] = useState<string>(
    pages[0]?.id || INITIAL_PAGES[0].id
  );

  // Undo / Redo history for current page
  const [historyStack, setHistoryStack] = useState<BuilderPage[]>([]);
  const [redoStack, setRedoStack] = useState<BuilderPage[]>([]);

  // Collections
  const [projects, setProjectsState] = useState<ProjectItem[]>(() =>
    loadItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS)
  );
  const [news, setNewsState] = useState<NewsItem[]>(() =>
    loadItem(STORAGE_KEYS.NEWS, INITIAL_NEWS)
  );
  const [testimonials, setTestimonialsState] = useState<TestimonialItem[]>(() =>
    loadItem(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS)
  );
  const [partners, setPartnersState] = useState<PartnerItem[]>(() =>
    loadItem(STORAGE_KEYS.PARTNERS, INITIAL_PARTNERS)
  );
  const [media, setMediaState] = useState<MediaItem[]>(() =>
    loadItem(STORAGE_KEYS.MEDIA, INITIAL_MEDIA)
  );
  const [menus, setMenusState] = useState<NavigationMenu[]>(() =>
    loadItem(STORAGE_KEYS.MENUS, INITIAL_MENUS)
  );
  const [inquiries, setInquiriesState] = useState<FormInquiry[]>(() =>
    loadItem(STORAGE_KEYS.INQUIRIES, [])
  );

  // Settings
  const [themeColors, setThemeColorsState] = useState<ThemeColors>(() =>
    loadItem(STORAGE_KEYS.THEME_COLORS, INITIAL_THEME_COLORS)
  );
  const [themeTypography, setThemeTypographyState] = useState<ThemeTypography>(() =>
    loadItem(STORAGE_KEYS.THEME_TYPO, INITIAL_THEME_TYPOGRAPHY)
  );
  const [themeAnimations, setThemeAnimationsState] = useState<ThemeAnimations>(() =>
    loadItem(STORAGE_KEYS.THEME_ANIM, INITIAL_THEME_ANIMATIONS)
  );
  const [headerConfig, setHeaderConfigState] = useState<HeaderConfig>(() =>
    loadItem(STORAGE_KEYS.HEADER, INITIAL_HEADER_CONFIG)
  );
  const [footerConfig, setFooterConfigState] = useState<FooterConfig>(() =>
    loadItem(STORAGE_KEYS.FOOTER, INITIAL_FOOTER_CONFIG)
  );
  const [siteSettings, setSiteSettingsState] = useState<SiteSettings>(() =>
    loadItem(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS)
  );
  const [activityLog, setActivityLogState] = useState<ActivityLog[]>(() =>
    loadItem(STORAGE_KEYS.LOGS, [])
  );

  // UI state
  const [session, setSession] = useState<AuthSession | null>(() => getActiveSession());
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('dashboard');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Multilingual Save Modal
  const [saveModalTarget, setSaveModalTarget] = useState<{
    isOpen: boolean;
    title: string;
    onConfirm: (choice: SaveLanguageChoice) => void;
  } | null>(null);

  const openSaveModal = (title: string, onConfirm: (choice: SaveLanguageChoice) => void) => {
    setSaveModalTarget({ isOpen: true, title, onConfirm });
  };
  const closeSaveModal = () => {
    setSaveModalTarget(null);
  };

  // Activity logger
  const logActivity = useCallback((action: string, target: string) => {
    const user = getActiveSession()?.user.username || 'System';
    const entry: ActivityLog = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      user,
      action,
      target,
      timestamp: new Date().toISOString(),
    };
    setActivityLogState((prev) => {
      const updated = [entry, ...prev].slice(0, 100);
      saveItem(STORAGE_KEYS.LOGS, updated);
      return updated;
    });
  }, []);

  // Sync state helpers
  const setProjects = useCallback((newProjects: ProjectItem[]) => {
    setProjectsState(newProjects);
    saveItem(STORAGE_KEYS.PROJECTS, newProjects);
  }, []);

  const updateProject = useCallback((project: ProjectItem) => {
    setProjectsState((prev) => {
      const exists = prev.some((p) => p.id === project.id);
      const updated = exists
        ? prev.map((p) => (p.id === project.id ? project : p))
        : [...prev, project];
      saveItem(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });
    logActivity('Updated Project', project.name.en || project.id);
  }, [logActivity]);

  const deleteProject = useCallback((id: string) => {
    setProjectsState((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveItem(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });
    logActivity('Deleted Project', id);
  }, [logActivity]);

  const setNews = useCallback((newNews: NewsItem[]) => {
    setNewsState(newNews);
    saveItem(STORAGE_KEYS.NEWS, newNews);
  }, []);

  const updateNews = useCallback((item: NewsItem) => {
    setNewsState((prev) => {
      const exists = prev.some((n) => n.id === item.id);
      const updated = exists
        ? prev.map((n) => (n.id === item.id ? item : n))
        : [...prev, item];
      saveItem(STORAGE_KEYS.NEWS, updated);
      return updated;
    });
    logActivity('Updated News Item', item.title.en || item.id);
  }, [logActivity]);

  const deleteNews = useCallback((id: string) => {
    setNewsState((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      saveItem(STORAGE_KEYS.NEWS, updated);
      return updated;
    });
    logActivity('Deleted News Item', id);
  }, [logActivity]);

  const setTestimonials = useCallback((newTests: TestimonialItem[]) => {
    setTestimonialsState(newTests);
    saveItem(STORAGE_KEYS.TESTIMONIALS, newTests);
  }, []);

  const updateTestimonial = useCallback((item: TestimonialItem) => {
    setTestimonialsState((prev) => {
      const exists = prev.some((t) => t.id === item.id);
      const updated = exists
        ? prev.map((t) => (t.id === item.id ? item : t))
        : [...prev, item];
      saveItem(STORAGE_KEYS.TESTIMONIALS, updated);
      return updated;
    });
    logActivity('Updated Testimonial', item.name.en || item.id);
  }, [logActivity]);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonialsState((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      saveItem(STORAGE_KEYS.TESTIMONIALS, updated);
      return updated;
    });
    logActivity('Deleted Testimonial', id);
  }, [logActivity]);

  const setPartners = useCallback((newPartners: PartnerItem[]) => {
    setPartnersState(newPartners);
    saveItem(STORAGE_KEYS.PARTNERS, newPartners);
  }, []);

  const updatePartner = useCallback((partner: PartnerItem) => {
    setPartnersState((prev) => {
      const exists = prev.some((p) => p.id === partner.id);
      const updated = exists
        ? prev.map((p) => (p.id === partner.id ? partner : p))
        : [...prev, partner];
      saveItem(STORAGE_KEYS.PARTNERS, updated);
      return updated;
    });
    logActivity('Updated Partner', partner.name);
  }, [logActivity]);

  const deletePartner = useCallback((id: string) => {
    setPartnersState((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveItem(STORAGE_KEYS.PARTNERS, updated);
      return updated;
    });
    logActivity('Deleted Partner', id);
  }, [logActivity]);

  const addMediaItem = useCallback((item: MediaItem) => {
    setMediaState((prev) => {
      const updated = [item, ...prev];
      saveItem(STORAGE_KEYS.MEDIA, updated);
      return updated;
    });
    logActivity('Uploaded Media', item.name);
  }, [logActivity]);

  const updateMediaItem = useCallback((item: MediaItem) => {
    setMediaState((prev) => {
      const updated = prev.map((m) => (m.id === item.id ? item : m));
      saveItem(STORAGE_KEYS.MEDIA, updated);
      return updated;
    });
    logActivity('Updated Media', item.name);
  }, [logActivity]);

  const deleteMediaItem = useCallback((id: string) => {
    setMediaState((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      saveItem(STORAGE_KEYS.MEDIA, updated);
      return updated;
    });
    logActivity('Deleted Media', id);
  }, [logActivity]);

  const updateMenu = useCallback((menu: NavigationMenu) => {
    setMenusState((prev) => {
      const exists = prev.some((m) => m.id === menu.id);
      const updated = exists
        ? prev.map((m) => (m.id === menu.id ? menu : m))
        : [...prev, menu];
      saveItem(STORAGE_KEYS.MENUS, updated);
      return updated;
    });
    logActivity('Updated Navigation Menu', menu.name);
  }, [logActivity]);

  const submitInquiry = useCallback((inquiry: Omit<FormInquiry, 'id' | 'date' | 'status'>) => {
    const fullInquiry: FormInquiry = {
      ...inquiry,
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      date: new Date().toISOString(),
      status: 'new',
    };
    setInquiriesState((prev) => {
      const updated = [fullInquiry, ...prev];
      saveItem(STORAGE_KEYS.INQUIRIES, updated);
      return updated;
    });
    logActivity('Received Lead Inquiry', `${inquiry.name} (${inquiry.formType})`);
  }, [logActivity]);

  const updateInquiryStatus = useCallback((id: string, status: FormInquiry['status']) => {
    setInquiriesState((prev) => {
      const updated = prev.map((inq) => (inq.id === id ? { ...inq, status } : inq));
      saveItem(STORAGE_KEYS.INQUIRIES, updated);
      return updated;
    });
  }, []);

  const deleteInquiry = useCallback((id: string) => {
    setInquiriesState((prev) => {
      const updated = prev.filter((inq) => inq.id !== id);
      saveItem(STORAGE_KEYS.INQUIRIES, updated);
      return updated;
    });
  }, []);

  const updateThemeColors = useCallback((colors: ThemeColors) => {
    setThemeColorsState(colors);
    saveItem(STORAGE_KEYS.THEME_COLORS, colors);
    logActivity('Updated Global Colors', 'Palette');
  }, [logActivity]);

  const updateThemeTypography = useCallback((typo: ThemeTypography) => {
    setThemeTypographyState(typo);
    saveItem(STORAGE_KEYS.THEME_TYPO, typo);
    logActivity('Updated Typography System', typo.headingFont);
  }, [logActivity]);

  const updateThemeAnimations = useCallback((anim: ThemeAnimations) => {
    setThemeAnimationsState(anim);
    saveItem(STORAGE_KEYS.THEME_ANIM, anim);
    logActivity('Updated Motion System', `Entrance: ${anim.enableEntrance}`);
  }, [logActivity]);

  const updateHeaderConfig = useCallback((cfg: HeaderConfig) => {
    setHeaderConfigState(cfg);
    saveItem(STORAGE_KEYS.HEADER, cfg);
    logActivity('Updated Header Settings', 'Navbar');
  }, [logActivity]);

  const updateFooterConfig = useCallback((cfg: FooterConfig) => {
    setFooterConfigState(cfg);
    saveItem(STORAGE_KEYS.FOOTER, cfg);
    logActivity('Updated Footer Settings', 'Footer');
  }, [logActivity]);

  const updateSiteSettings = useCallback((settings: SiteSettings) => {
    setSiteSettingsState(settings);
    saveItem(STORAGE_KEYS.SETTINGS, settings);
    logActivity('Updated Site Settings', settings.brandName.en);
  }, [logActivity]);

  // Current Page calculation
  const currentPage =
    pages.find((p) => p.id === currentPageId) || pages[0] || INITIAL_PAGES[0];

  // Page Builder updates with history tracking
  const updatePage = useCallback(
    (updatedPage: BuilderPage, recordHistory = true) => {
      if (recordHistory && currentPage) {
        setHistoryStack((prev) => [...prev.slice(-20), JSON.parse(JSON.stringify(currentPage))]);
        setRedoStack([]);
      }

      setPages((prev) => {
        const next = prev.map((p) =>
          p.id === updatedPage.id ? { ...updatedPage, updatedAt: new Date().toISOString() } : p
        );
        saveItem(STORAGE_KEYS.PAGES, next);
        return next;
      });
    },
    [currentPage]
  );

  const createPage = useCallback(
    (title: string, slug: string): BuilderPage => {
      const newPage: BuilderPage = {
        id: `page_${Date.now()}`,
        title: { en: title, ar: title },
        slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        published: true,
        updatedAt: new Date().toISOString(),
        seo: {
          title: { en: `${title} | Akaber Real Estate`, ar: `${title} | أكابر للتطوير العقاري` },
          description: { en: 'Add Description', ar: 'أضف الوصف' },
          keywords: 'Akaber, Real Estate',
        },
        sections: [],
      };
      setPages((prev) => {
        const next = [...prev, newPage];
        saveItem(STORAGE_KEYS.PAGES, next);
        return next;
      });
      setCurrentPageId(newPage.id);
      logActivity('Created New Page', title);
      return newPage;
    },
    [logActivity]
  );

  const deletePage = useCallback(
    (id: string) => {
      setPages((prev) => {
        if (prev.length <= 1) return prev; // Cannot delete last page
        const next = prev.filter((p) => p.id !== id);
        saveItem(STORAGE_KEYS.PAGES, next);
        return next;
      });
      if (currentPageId === id) {
        const remaining = pages.filter((p) => p.id !== id);
        if (remaining.length > 0) setCurrentPageId(remaining[0].id);
      }
      logActivity('Deleted Page', id);
    },
    [currentPageId, pages, logActivity]
  );

  const duplicatePage = useCallback(
    (id: string) => {
      const source = pages.find((p) => p.id === id);
      if (!source) return;
      const dup: BuilderPage = {
        ...JSON.parse(JSON.stringify(source)),
        id: `page_${Date.now()}`,
        title: {
          en: `${source.title.en} (Copy)`,
          ar: `${source.title.ar} (نسخة)`,
        },
        slug: `${source.slug}-copy`,
        isHome: false,
        updatedAt: new Date().toISOString(),
      };
      setPages((prev) => {
        const next = [...prev, dup];
        saveItem(STORAGE_KEYS.PAGES, next);
        return next;
      });
      logActivity('Duplicated Page', source.title.en);
    },
    [pages, logActivity]
  );

  // Undo / Redo
  const canUndo = historyStack.length > 0;
  const canRedo = redoStack.length > 0;

  const undo = useCallback(() => {
    if (historyStack.length === 0) return;
    const prev = historyStack[historyStack.length - 1];
    setHistoryStack((h) => h.slice(0, h.length - 1));
    setRedoStack((r) => [...r, JSON.parse(JSON.stringify(currentPage))]);
    updatePage(prev, false);
  }, [historyStack, currentPage, updatePage]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((r) => r.slice(0, r.length - 1));
    setHistoryStack((h) => [...h, JSON.parse(JSON.stringify(currentPage))]);
    updatePage(next, false);
  }, [redoStack, currentPage, updatePage]);

  // Auth logout
  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    logActivity('User Logged Out', 'Auth');
  }, [logActivity]);

  // Backup & Restore
  const exportSiteJson = useCallback((): string => {
    const backup = {
      exportVersion: '2.0.0',
      brand: 'Akaber Real Estate Development',
      exportedAt: new Date().toISOString(),
      pages,
      projects,
      news,
      testimonials,
      partners,
      media,
      menus,
      themeColors,
      themeTypography,
      themeAnimations,
      headerConfig,
      footerConfig,
      siteSettings,
    };
    return JSON.stringify(backup, null, 2);
  }, [
    pages,
    projects,
    news,
    testimonials,
    partners,
    media,
    menus,
    themeColors,
    themeTypography,
    themeAnimations,
    headerConfig,
    footerConfig,
    siteSettings,
  ]);

  const importSiteJson = useCallback(
    (jsonStr: string): boolean => {
      try {
        const data = JSON.parse(jsonStr);
        if (!data.pages || !Array.isArray(data.pages)) return false;

        if (data.pages) {
          setPages(data.pages);
          saveItem(STORAGE_KEYS.PAGES, data.pages);
          if (data.pages.length > 0) setCurrentPageId(data.pages[0].id);
        }
        if (data.projects) {
          setProjectsState(data.projects);
          saveItem(STORAGE_KEYS.PROJECTS, data.projects);
        }
        if (data.news) {
          setNewsState(data.news);
          saveItem(STORAGE_KEYS.NEWS, data.news);
        }
        if (data.testimonials) {
          setTestimonialsState(data.testimonials);
          saveItem(STORAGE_KEYS.TESTIMONIALS, data.testimonials);
        }
        if (data.partners) {
          setPartnersState(data.partners);
          saveItem(STORAGE_KEYS.PARTNERS, data.partners);
        }
        if (data.media) {
          setMediaState(data.media);
          saveItem(STORAGE_KEYS.MEDIA, data.media);
        }
        if (data.menus) {
          setMenusState(data.menus);
          saveItem(STORAGE_KEYS.MENUS, data.menus);
        }
        if (data.themeColors) {
          setThemeColorsState(data.themeColors);
          saveItem(STORAGE_KEYS.THEME_COLORS, data.themeColors);
        }
        if (data.themeTypography) {
          setThemeTypographyState(data.themeTypography);
          saveItem(STORAGE_KEYS.THEME_TYPO, data.themeTypography);
        }
        if (data.themeAnimations) {
          setThemeAnimationsState(data.themeAnimations);
          saveItem(STORAGE_KEYS.THEME_ANIM, data.themeAnimations);
        }
        if (data.headerConfig) {
          setHeaderConfigState(data.headerConfig);
          saveItem(STORAGE_KEYS.HEADER, data.headerConfig);
        }
        if (data.footerConfig) {
          setFooterConfigState(data.footerConfig);
          saveItem(STORAGE_KEYS.FOOTER, data.footerConfig);
        }
        if (data.siteSettings) {
          setSiteSettingsState(data.siteSettings);
          saveItem(STORAGE_KEYS.SETTINGS, data.siteSettings);
        }

        logActivity('Restored Website Backup', 'Full Site Import');
        return true;
      } catch (e) {
        console.error('Failed to import backup JSON', e);
        return false;
      }
    },
    [logActivity]
  );

  const resetToDefaults = useCallback(() => {
    setPages(INITIAL_PAGES);
    saveItem(STORAGE_KEYS.PAGES, INITIAL_PAGES);
    setCurrentPageId(INITIAL_PAGES[0].id);

    setProjectsState(INITIAL_PROJECTS);
    saveItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);

    setNewsState(INITIAL_NEWS);
    saveItem(STORAGE_KEYS.NEWS, INITIAL_NEWS);

    setTestimonialsState(INITIAL_TESTIMONIALS);
    saveItem(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);

    setPartnersState(INITIAL_PARTNERS);
    saveItem(STORAGE_KEYS.PARTNERS, INITIAL_PARTNERS);

    setMediaState(INITIAL_MEDIA);
    saveItem(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);

    setMenusState(INITIAL_MENUS);
    saveItem(STORAGE_KEYS.MENUS, INITIAL_MENUS);

    setThemeColorsState(INITIAL_THEME_COLORS);
    saveItem(STORAGE_KEYS.THEME_COLORS, INITIAL_THEME_COLORS);

    setThemeTypographyState(INITIAL_THEME_TYPOGRAPHY);
    saveItem(STORAGE_KEYS.THEME_TYPO, INITIAL_THEME_TYPOGRAPHY);

    setThemeAnimationsState(INITIAL_THEME_ANIMATIONS);
    saveItem(STORAGE_KEYS.THEME_ANIM, INITIAL_THEME_ANIMATIONS);

    setHeaderConfigState(INITIAL_HEADER_CONFIG);
    saveItem(STORAGE_KEYS.HEADER, INITIAL_HEADER_CONFIG);

    setFooterConfigState(INITIAL_FOOTER_CONFIG);
    saveItem(STORAGE_KEYS.FOOTER, INITIAL_FOOTER_CONFIG);

    setSiteSettingsState(INITIAL_SITE_SETTINGS);
    saveItem(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);

    logActivity('Reset Website to Initial State', 'Defaults Restored');
  }, [logActivity]);

  return (
    <CmsContext.Provider
      value={{
        activeLanguage,
        setActiveLanguage,
        isRtl,
        t,
        currentPageId,
        setCurrentPageId,
        currentPage,
        pages,
        updatePage,
        createPage,
        deletePage,
        duplicatePage,
        canUndo,
        canRedo,
        undo,
        redo,
        projects,
        setProjects,
        updateProject,
        deleteProject,
        news,
        setNews,
        updateNews,
        deleteNews,
        testimonials,
        setTestimonials,
        updateTestimonial,
        deleteTestimonial,
        partners,
        setPartners,
        updatePartner,
        deletePartner,
        media,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        menus,
        updateMenu,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        themeColors,
        updateThemeColors,
        themeTypography,
        updateThemeTypography,
        themeAnimations,
        updateThemeAnimations,
        headerConfig,
        updateHeaderConfig,
        footerConfig,
        updateFooterConfig,
        siteSettings,
        updateSiteSettings,
        activityLog,
        logActivity,
        session,
        setSession,
        logout,
        adminOpen,
        setAdminOpen,
        activeAdminTab,
        setActiveAdminTab,
        selectedProject,
        setSelectedProject,
        exportSiteJson,
        importSiteJson,
        resetToDefaults,
        saveModalTarget,
        openSaveModal,
        closeSaveModal,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export function useCms(): CmsContextType {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
