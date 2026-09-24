/**
 * Master TypeScript Types for Akaber Real Estate Development
 * Visual Page Builder + Headless CMS Architecture
 */

export type ResponsiveDevice = 'desktop' | 'tablet' | 'mobile';
export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export interface ResponsiveValue<T> {
  desktop: T;
  tablet?: T;
  mobile?: T;
}

export type MultiLangString = {
  en: string;
  ar: string;
  [key: string]: string;
};

export type ElementStyles = Record<string, any>;

export type ElementType =
  // Basic
  | 'heading'
  | 'text'
  | 'rich-text'
  | 'image'
  | 'video'
  | 'button'
  | 'icon'
  | 'divider'
  | 'spacer'
  | 'container'
  // Media
  | 'image-gallery'
  | 'image-slider'
  | 'video-hero'
  | 'lightbox'
  // Content
  | 'project-grid'
  | 'projects-grid'
  | 'project-slider'
  | 'project-showcase'
  | 'testimonials'
  | 'news-grid'
  | 'counter'
  | 'timeline'
  | 'partners-grid'
  | 'faq-accordion'
  // Layout
  | 'two-column'
  | 'three-column'
  | 'split-screen'
  // Forms
  | 'inquiry-form'
  | 'newsletter-form'
  // Advanced
  | 'custom-code'
  | 'stats-ribbon'
  | 'architectural-features'
  | string;

export interface SpacingValue {
  top: number;
  right: number;
  bottom: number;
  left: number;
  unit?: 'px' | 'rem' | '%';
}

export interface AnimationSettings {
  type: string;
  duration: number; // in ms
  delay: number; // in ms
  easing?: string;
  trigger?: string;
  hoverEffect?: string;
  [key: string]: any;
}

export interface ElementSettings {
  // Content values (Multilingual)
  content?: MultiLangString;
  title?: MultiLangString;
  subtitle?: MultiLangString;
  tagline?: MultiLangString;
  buttonText?: MultiLangString;
  buttonUrl?: string;
  buttonVariant?: 'gold-solid' | 'gold-outline' | 'white-outline' | 'minimal-arrow';

  // Media
  imageUrl?: string;
  imageAlt?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9' | 'auto';
  videoUrl?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;

  // Typography
  fontFamily?: string;
  fontSize?: ResponsiveValue<number>;
  fontWeight?: 300 | 400 | 500 | 600 | 700 | 800;
  letterSpacing?: ResponsiveValue<number>;
  lineHeight?: ResponsiveValue<number>;
  textColor?: string;
  textAlign?: ResponsiveValue<'left' | 'center' | 'right' | 'justify'>;

  // Spacing & Dimensions
  width?: ResponsiveValue<string>;
  height?: ResponsiveValue<string>;
  padding?: ResponsiveValue<SpacingValue>;
  margin?: ResponsiveValue<SpacingValue>;

  // Background & Borders
  backgroundColor?: string;
  backgroundImage?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  boxShadow?: string;

  // Dynamics
  itemsLimit?: number;
  filterCategory?: string;
  layoutColumns?: 1 | 2 | 3 | 4;

  // Custom code
  customHtml?: string;
  customCss?: string;
}

export interface BuilderElement {
  id: string;
  type: ElementType;
  name?: string;
  settings?: ElementSettings;
  content?: any;
  styles?: any;
  responsive?: any;
  animation?: AnimationSettings;
  visibility?: {
    desktop?: boolean;
    tablet?: boolean;
    mobile?: boolean;
  };
  [key: string]: any;
}

export interface BuilderColumn {
  id: string;
  span?: number;
  width?: ResponsiveValue<string> | string;
  verticalAlign?: 'top' | 'middle' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
  padding?: ResponsiveValue<SpacingValue> | any;
  backgroundColor?: string;
  elements: BuilderElement[];
  [key: string]: any;
}

export interface BuilderSection {
  id: string;
  name: string;
  layout: 'boxed' | 'full-width' | 'contained';
  minHeight?: ResponsiveValue<string>;
  background: {
    type: 'color' | 'image' | 'video' | 'gradient';
    color?: string;
    imageUrl?: string;
    videoUrl?: string;
    overlayOpacity?: number;
  };
  padding: ResponsiveValue<SpacingValue>;
  margin?: ResponsiveValue<{ top: number; bottom: number }>;
  animation: AnimationSettings;
  columns: BuilderColumn[];
}

export interface SeoMeta {
  title: MultiLangString;
  description: MultiLangString;
  keywords: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export interface BuilderPage {
  id: string;
  title: MultiLangString;
  slug: string;
  isHome?: boolean;
  published: boolean;
  sections: BuilderSection[];
  seo: SeoMeta;
  updatedAt: string;
}

export interface ProjectItem {
  id: string;
  name: MultiLangString;
  location: MultiLangString;
  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Masterplan';
  status: 'Under Development' | 'Completed' | 'Upcoming';
  shortDesc: MultiLangString;
  fullDesc: MultiLangString;
  mainImage: string;
  gallery: string[];
  videoUrl?: string;
  specs: {
    area: string;
    units?: string;
    completion?: string;
    investmentVolume?: string;
  };
  amenities: string[];
  floorPlans: {
    title: MultiLangString;
    dimensions: string;
    image: string;
  }[];
  published: boolean;
  order: number;
}

export interface NewsItem {
  id: string;
  title: MultiLangString;
  slug: string;
  category?: string;
  excerpt: MultiLangString;
  content: MultiLangString;
  image: string;
  author?: string;
  date?: string;
  publishedAt?: string;
  published: boolean;
}

export interface TestimonialItem {
  id: string;
  name: MultiLangString;
  role: MultiLangString;
  project?: MultiLangString;
  quote: MultiLangString;
  rating: number;
  avatar?: string;
  published: boolean;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  logo?: string;
  website?: string;
  published: boolean;
  order?: number;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'svg';
  size: string;
  altText?: MultiLangString;
  alt?: string;
  mimeType?: string;
  createdAt?: string;
  date?: string;
}

export interface MenuItem {
  id: string;
  label: MultiLangString;
  url: string;
  target?: string;
  children?: MenuItem[];
}

export interface NavigationMenu {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface FormInquiry {
  id: string;
  formType: 'contact' | 'project-inquiry' | 'private-advisory' | 'newsletter' | 'custom';
  name: string;
  email: string;
  phone: string;
  projectName?: string;
  message: string;
  date: string;
  status: 'new' | 'in-progress' | 'contacted' | 'closed' | 'archived';
}

export interface ThemeColors {
  primary: string; // Champagne gold
  secondary: string; // Deep charcoal
  accent: string; // Warm gold accent
  background: string; // Jet black
  surface: string; // Dark stone
  textPrimary?: string; // Ivory white
  text?: string;
  heading?: string;
  buttonBg?: string;
  textMuted?: string; // Refined gray
  border: string; // Hairline border
}

export interface UploadedFont {
  id: string;
  name: string;
  dataUrl: string;
  fileName: string;
  format: string;
  targetScript: 'all' | 'arabic' | 'english';
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  arabicFont?: string;
  baseSize?: string;
  h1Scale?: string;
  h2Scale?: string;
  h3Scale?: string;
  customFonts?: string[];
  uploadedFonts?: UploadedFont[];
}

export interface ThemeAnimations {
  enableEntrance: boolean;
  defaultSpeed?: number; // ms
  smoothScroll?: boolean;
  enableParallax?: boolean;
}

export interface HeaderConfig {
  logoText: MultiLangString;
  logoImage?: string;
  logoUrl?: string;
  height: { desktop: number; tablet: number; mobile: number };
  sticky: boolean;
  transparent: boolean;
  showLanguageSelector?: boolean;
  showLanguageSwitcher?: boolean;
  showActionButton?: boolean;
  actionButtonText: MultiLangString;
  actionButtonUrl?: string;
  ctaButton?: {
    text: MultiLangString;
    url: string;
    enabled: boolean;
  };
  menuId?: string;
}

export interface FooterConfig {
  logoText: MultiLangString;
  tagline?: MultiLangString;
  description: MultiLangString;
  copyright?: MultiLangString;
  copyrightText: MultiLangString;
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: MultiLangString;
  contactInfo: {
    phone: string;
    email: string;
    whatsapp?: string;
    address: MultiLangString;
  };
  showSocials?: boolean;
  showSocial?: boolean;
  showNewsletter?: boolean;
  menuId?: string;
}

export interface SiteSettings {
  brandName: MultiLangString;
  tagline: MultiLangString;
  logoLight?: string;
  logoDark?: string;
  favicon?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactWhatsapp?: string;
  address?: MultiLangString;
  crNumber?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  customCss?: string;
  customJs?: string;
  activeLanguages?: string[];
  defaultLanguage?: string;
  arabicEnabled?: boolean;
  rtlSupport?: boolean;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

export type AdminTab =
  | 'dashboard'
  | 'pages'
  | 'page-builder'
  | 'sections'
  | 'header'
  | 'header-footer'
  | 'footer'
  | 'projects'
  | 'news'
  | 'testimonials'
  | 'partners'
  | 'media'
  | 'typography'
  | 'colors'
  | 'animations'
  | 'menus'
  | 'forms'
  | 'languages'
  | 'seo'
  | 'settings'
  | 'users'
  | 'security'
  | 'backups'
  | 'activity';

export interface SaveLanguageChoice {
  mode: 'current' | 'all' | 'selected';
  selectedLanguages: string[];
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'administrator' | 'editor' | 'viewer';
  passwordHash: string;
  salt: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthSession {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    lastLogin?: string;
  };
  token: string;
  expiresAt: number;
}

// Legacy compatibility types for previous demo files
export type Currency = 'USD' | 'EUR' | 'SAR' | 'TRY';
export type Language = 'en' | 'ar' | 'tr';
export type ThemeId = string;

export interface Property {
  id: string;
  title: string;
  tagline: string;
  location: string;
  city: string;
  country: string;
  type: string;
  status: string;
  priceUsd: number;
  bedrooms?: number;
  bathrooms?: number;
  areaSqm: number;
  imageUrl: string;
  gallery: string[];
  badges: string[];
  roiPotential: string;
  description: string;
  highlights: string[];
  [key: string]: any;
}

export interface SearchFilter {
  [key: string]: any;
}

export interface SectionVisibility {
  [key: string]: boolean;
}
