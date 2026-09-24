/**
 * Initial Site Data & Placeholder Framework for Akaber Real Estate Development
 * Clean, customizable placeholders ready to be modified or extended via Admin Panel
 */

import {
  BuilderPage,
  FooterConfig,
  HeaderConfig,
  MediaItem,
  NavigationMenu,
  NewsItem,
  PartnerItem,
  ProjectItem,
  SiteSettings,
  TestimonialItem,
  ThemeAnimations,
  ThemeColors,
  ThemeTypography,
} from '../types';

export const INITIAL_THEME_COLORS: ThemeColors = {
  primary: '#C5A880', // Champagne Gold
  secondary: '#141414', // Deep Charcoal
  accent: '#E5C378', // Radiant Gold
  background: '#0A0A0A', // Obsidian Black
  surface: '#171717', // Elevate Slate
  textPrimary: '#F5F5F0', // Pure Ivory
  textMuted: '#9E9E9E', // Muted Gray
  border: '#262626', // Hairline Border
};

export const INITIAL_THEME_TYPOGRAPHY: ThemeTypography = {
  headingFont: 'Cinzel, Georgia, serif',
  bodyFont: 'Plus Jakarta Sans, sans-serif',
  arabicFont: 'Cairo, sans-serif',
  baseSize: '16px',
  h1Scale: '3.75rem',
  h2Scale: '2.5rem',
  h3Scale: '1.75rem',
};

export const INITIAL_THEME_ANIMATIONS: ThemeAnimations = {
  enableEntrance: true,
  defaultSpeed: 600,
  smoothScroll: true,
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  brandName: {
    en: 'Akaber Real Estate Development',
    ar: 'أكابر للتطوير العقاري',
  },
  tagline: {
    en: 'Add Description',
    ar: 'أضف الوصف',
  },
  logoLight: '',
  logoDark: '',
  favicon: '',
  phone: '+966 11 000 0000',
  email: 'info@akaber.sa',
  whatsapp: '+966 50 000 0000',
  address: {
    en: 'Riyadh, Kingdom of Saudi Arabia',
    ar: 'الرياض، المملكة العربية السعودية',
  },
  crNumber: '1010000000',
  socialLinks: {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
  },
  customCss: '/* Add Custom CSS Here */',
  customJs: '// Add Custom JavaScript Here',
  activeLanguages: ['en', 'ar'],
  defaultLanguage: 'en',
};

export const INITIAL_HEADER_CONFIG: HeaderConfig = {
  logoText: {
    en: 'AKABER',
    ar: 'أكابر',
  },
  height: { desktop: 80, tablet: 72, mobile: 64 },
  sticky: true,
  transparent: true,
  showLanguageSelector: true,
  showLanguageSwitcher: true,
  showActionButton: true,
  actionButtonText: {
    en: 'Private Advisory',
    ar: 'استشارة خاصة',
  },
  actionButtonUrl: '#contact',
  ctaButton: {
    text: {
      en: 'Private Advisory',
      ar: 'استشارة خاصة',
    },
    url: '#contact',
    enabled: true,
  },
  menuId: 'primary_nav',
};

export const INITIAL_FOOTER_CONFIG: FooterConfig = {
  logoText: {
    en: 'AKABER',
    ar: 'أكابر',
  },
  tagline: {
    en: 'Add Description',
    ar: 'أضف الوصف',
  },
  description: {
    en: 'Akaber Real Estate Development represents the pinnacle of architectural distinction, visionary design, and luxury development.',
    ar: 'تمثل أكابر للتطوير العقاري قمة التميز المعماري والتصميم المستقبلي في التطوير الفاخر.',
  },
  copyright: {
    en: '© 2027 Akaber Real Estate Development. All rights reserved.',
    ar: '© 2027 أكابر للتطوير العقاري. جميع الحقوق محفوظة.',
  },
  copyrightText: {
    en: '© 2027 Akaber Real Estate Development. All rights reserved.',
    ar: '© 2027 أكابر للتطوير العقاري. جميع الحقوق محفوظة.',
  },
  phone: '+966 11 000 0000',
  email: 'advisory@akaber.sa',
  whatsapp: '+966 50 000 0000',
  address: {
    en: 'King Fahd Road, Riyadh, Saudi Arabia',
    ar: 'طريق الملك فهد، الرياض، المملكة العربية السعودية',
  },
  contactInfo: {
    phone: '+966 11 000 0000',
    email: 'advisory@akaber.sa',
    whatsapp: '+966 50 000 0000',
    address: {
      en: 'King Fahd Road, Riyadh, Saudi Arabia',
      ar: 'طريق الملك فهد، الرياض، المملكة العربية السعودية',
    },
  },
  showSocials: true,
  showSocial: true,
  showNewsletter: true,
  menuId: 'footer_nav',
};

export const INITIAL_MENUS: NavigationMenu[] = [
  {
    id: 'primary_nav',
    name: 'Primary Navigation',
    items: [
      {
        id: 'm1',
        label: { en: 'Home', ar: 'الرئيسية' },
        url: '#home',
      },
      {
        id: 'm2',
        label: { en: 'Projects', ar: 'المشاريع' },
        url: '#projects',
      },
      {
        id: 'm3',
        label: { en: 'Philosophy', ar: 'رؤيتنا' },
        url: '#about',
      },
      {
        id: 'm4',
        label: { en: 'Capabilities', ar: 'خدماتنا' },
        url: '#services',
      },
      {
        id: 'm5',
        label: { en: 'Contact', ar: 'اتصل بنا' },
        url: '#contact',
      },
    ],
  },
  {
    id: 'footer_nav',
    name: 'Footer Links',
    items: [
      {
        id: 'f1',
        label: { en: 'Projects Portfolio', ar: 'محفظة المشاريع' },
        url: '#projects',
      },
      {
        id: 'f2',
        label: { en: 'Development Standards', ar: 'معايير التطوير' },
        url: '#about',
      },
      {
        id: 'f3',
        label: { en: 'Private Advisory', ar: 'استشارات خاصة' },
        url: '#contact',
      },
      {
        id: 'f4',
        label: { en: 'Investor Relations', ar: 'علاقات المستثمرين' },
        url: '#contact',
      },
    ],
  },
];

// Placeholder Media Items with our generated high-fidelity imagery
export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med_hero_1',
    name: 'Akaber Hero Architecture',
    url: 'images/akaber_hero_architecture_1790230991956.jpg',
    type: 'image',
    size: '1.4 MB',
    altText: {
      en: 'Akaber Monumental Architecture',
      ar: 'عمارة أكابر التذكارية',
    },
    date: '2026-09-23',
  },
  {
    id: 'med_facade_2',
    name: 'Akaber Project Facade',
    url: 'images/akaber_project_facade_1790231002730.jpg',
    type: 'image',
    size: '1.2 MB',
    altText: {
      en: 'Akaber Luxury Facade',
      ar: 'واجهة أكابر الفاخرة',
    },
    date: '2026-09-23',
  },
  {
    id: 'med_interior_3',
    name: 'Akaber Penthouse Interior',
    url: 'images/akaber_interior_penthouse_1790231015025.jpg',
    type: 'image',
    size: '1.5 MB',
    altText: {
      en: 'Akaber Penthouse Living',
      ar: 'تصميم بنتهاوس أكابر',
    },
    date: '2026-09-23',
  },
  {
    id: 'med_tower_4',
    name: 'Akaber Commercial Tower',
    url: 'images/akaber_commercial_tower_1790231026155.jpg',
    type: 'image',
    size: '1.3 MB',
    altText: {
      en: 'Akaber Commercial Landmark',
      ar: 'برج أكابر التجاري',
    },
    date: '2026-09-23',
  },
];

// Placeholder Projects adhering to prompt: "Add Project", neutral placeholder content
export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj_01',
    name: {
      en: 'Add Project 01',
      ar: 'أضف المشروع 01',
    },
    location: {
      en: 'Add Location',
      ar: 'أضف الموقع',
    },
    category: 'Residential',
    status: 'Under Development',
    shortDesc: {
      en: 'Add Description',
      ar: 'أضف الوصف',
    },
    fullDesc: {
      en: 'Add Content - Detailed project information, architectural vision, masterplan specifications, and bespoke amenities will be configured here via the admin panel.',
      ar: 'أضف المحتوى - سيتم تهيئة تفاصيل المشروع الكاملة، الرؤية المعمارية، ومواصفات المخطط الرئيسي هنا من خلال لوحة التحكم.',
    },
    mainImage: 'images/akaber_hero_architecture_1790230991956.jpg',
    gallery: [
      'images/akaber_hero_architecture_1790230991956.jpg',
      'images/akaber_interior_penthouse_1790231015025.jpg',
      'images/akaber_project_facade_1790231002730.jpg',
    ],
    specs: {
      area: 'Add Area (m²)',
      units: 'Add Units',
      completion: 'Add Year',
      investmentVolume: 'Price On Request',
    },
    amenities: [
      'Private Terrace',
      'Infinity Pool',
      'Smart Home Automation',
      '24/7 Concierge Service',
      'Private Underground Parking',
    ],
    floorPlans: [
      {
        title: { en: 'Add Floor Plan A', ar: 'أضف مخطط الطابق أ' },
        dimensions: 'Add Dimensions',
        image: 'images/akaber_interior_penthouse_1790231015025.jpg',
      },
    ],
    published: true,
    order: 1,
  },
  {
    id: 'proj_02',
    name: {
      en: 'Add Project 02',
      ar: 'أضف المشروع 02',
    },
    location: {
      en: 'Add Location',
      ar: 'أضف الموقع',
    },
    category: 'Commercial',
    status: 'Upcoming',
    shortDesc: {
      en: 'Add Description',
      ar: 'أضف الوصف',
    },
    fullDesc: {
      en: 'Add Content - Commercial flagship development with sustainable grade-A spaces and premier corporate amenities.',
      ar: 'أضف المحتوى - مشروع تجاري رائد يضم مساحات مصنفة عالمياً ومرافق أعمال استثنائية.',
    },
    mainImage: 'images/akaber_commercial_tower_1790231026155.jpg',
    gallery: [
      'images/akaber_commercial_tower_1790231026155.jpg',
      'images/akaber_project_facade_1790231002730.jpg',
    ],
    specs: {
      area: 'Add Area (m²)',
      units: 'Add Units',
      completion: 'Add Year',
      investmentVolume: 'Price On Request',
    },
    amenities: [
      'LEED Gold Specification',
      'High-Speed Smart Elevators',
      'Executive Sky Lounge',
      'Conference Facilities',
    ],
    floorPlans: [
      {
        title: { en: 'Add Executive Plan', ar: 'أضف المخطط التنفيذي' },
        dimensions: 'Add Dimensions',
        image: 'images/akaber_commercial_tower_1790231026155.jpg',
      },
    ],
    published: true,
    order: 2,
  },
  {
    id: 'proj_03',
    name: {
      en: 'Add Project 03',
      ar: 'أضف المشروع 03',
    },
    location: {
      en: 'Add Location',
      ar: 'أضف الموقع',
    },
    category: 'Masterplan',
    status: 'Under Development',
    shortDesc: {
      en: 'Add Description',
      ar: 'أضف الوصف',
    },
    fullDesc: {
      en: 'Add Content - Visionary luxury masterplan harmonizing desert topography with refined modern architecture.',
      ar: 'أضف المحتوى - مخطط رئيسي استثنائي يجمع بين تناغم الطبيعة والعمارة العصرية الفاخرة.',
    },
    mainImage: 'images/akaber_project_facade_1790231002730.jpg',
    gallery: [
      'images/akaber_project_facade_1790231002730.jpg',
      'images/akaber_hero_architecture_1790230991956.jpg',
    ],
    specs: {
      area: 'Add Area (m²)',
      units: 'Add Units',
      completion: 'Add Year',
      investmentVolume: 'Price On Request',
    },
    amenities: [
      'Gated Security Perimeter',
      'Lush Desert Botanical Gardens',
      'Wellness Sanctuary',
      'Private Club House',
    ],
    floorPlans: [],
    published: true,
    order: 3,
  },
];

// Placeholder News / Articles
export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news_01',
    title: {
      en: 'Add News Heading 01',
      ar: 'أضف عنوان الخبر 01',
    },
    slug: 'add-news-01',
    category: 'Development',
    excerpt: {
      en: 'Add Description',
      ar: 'أضف الوصف',
    },
    content: {
      en: 'Add Content - Full editorial article text will be entered here via the rich text editor.',
      ar: 'أضف المحتوى - سيتم إدخال المقال التحريري الكامل هنا من خلال محرر النصوص.',
    },
    image: 'images/akaber_hero_architecture_1790230991956.jpg',
    author: 'Akaber Editorial',
    date: '2026-09-23',
    published: true,
  },
];

// Placeholder Testimonials
export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test_01',
    name: {
      en: 'Add Client Name',
      ar: 'أضف اسم العميل',
    },
    role: {
      en: 'Add Title / Organization',
      ar: 'أضف المنصب / المؤسسة',
    },
    project: {
      en: 'Add Project Reference',
      ar: 'أضف مرجع المشروع',
    },
    quote: {
      en: 'Add Description - Client advisory and testimonial remarks can be customized here.',
      ar: 'أضف الوصف - يمكن تخصيص آراء واستشارات العميل هنا.',
    },
    rating: 5,
    avatar: '',
    published: true,
  },
];

// Placeholder Partners (Empty by default per prompt: "Do not create fake partners")
export const INITIAL_PARTNERS: PartnerItem[] = [];

// Default Home Page constructed using the Visual Page Builder structure
export const INITIAL_HOME_PAGE: BuilderPage = {
  id: 'page_home',
  title: {
    en: 'Home',
    ar: 'الرئيسية',
  },
  slug: 'home',
  isHome: true,
  published: true,
  updatedAt: new Date().toISOString(),
  seo: {
    title: {
      en: 'Akaber Real Estate Development | Luxury Architectural Excellence',
      ar: 'أكابر للتطوير العقاري | التميز المعماري الفاخر',
    },
    description: {
      en: 'Akaber Real Estate Development crafts prestigious luxury architectural residences and landmark commercial developments.',
      ar: 'أكابر للتطوير العقاري تصنع مساكن فاخرة ومشاريع تجارية بارزة.',
    },
    keywords: 'Akaber, Real Estate Development, Luxury Architecture, Riyadh, Saudi Arabia',
  },
  sections: [
    // 1. Hero Section
    {
      id: 'sec_hero',
      name: 'Hero Luxury Section',
      layout: 'full-width',
      minHeight: { desktop: '100vh', tablet: '90vh', mobile: '80vh' },
      background: {
        type: 'image',
        imageUrl: 'images/akaber_hero_architecture_1790230991956.jpg',
        overlayOpacity: 0.65,
      },
      padding: {
        desktop: { top: 180, bottom: 120, left: 48, right: 48 },
        tablet: { top: 140, bottom: 90, left: 32, right: 32 },
        mobile: { top: 120, bottom: 60, left: 20, right: 20 },
      },
      animation: {
        type: 'fade',
        duration: 900,
        delay: 100,
      },
      columns: [
        {
          id: 'col_hero_1',
          span: 12,
          elements: [
            {
              id: 'el_hero_sub',
              type: 'text',
              content: {
                text: {
                  en: 'Akaber Real Estate Development',
                  ar: 'أكابر للتطوير العقاري',
                },
              },
              styles: {
                color: '#C5A880',
                letterSpacing: '0.25em',
                fontSize: { desktop: '14px', tablet: '13px', mobile: '12px' },
                fontWeight: '600',
                textAlign: { desktop: 'center', mobile: 'center' },
                margin: { desktop: { top: 0, bottom: 16, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 700, delay: 200 },
              responsive: {},
            },
            {
              id: 'el_hero_head',
              type: 'heading',
              content: {
                text: {
                  en: 'Add Heading',
                  ar: 'أضف العنوان',
                },
              },
              styles: {
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: { desktop: '64px', tablet: '48px', mobile: '36px' },
                fontWeight: '600',
                lineHeight: '1.15',
                color: '#FFFFFF',
                textAlign: { desktop: 'center', mobile: 'center' },
                margin: { desktop: { top: 0, bottom: 24, left: 0, right: 0 } },
                maxWidth: '960px',
              },
              animation: { type: 'fade-up', duration: 800, delay: 300 },
              responsive: {},
            },
            {
              id: 'el_hero_desc',
              type: 'text',
              content: {
                text: {
                  en: 'Add Description',
                  ar: 'أضف الوصف',
                },
              },
              styles: {
                fontSize: { desktop: '18px', tablet: '16px', mobile: '15px' },
                lineHeight: '1.7',
                color: '#D4D4D4',
                textAlign: { desktop: 'center', mobile: 'center' },
                maxWidth: '680px',
                margin: { desktop: { top: 0, bottom: 40, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 800, delay: 400 },
              responsive: {},
            },
            {
              id: 'el_hero_btn_group',
              type: 'button',
              content: {
                text: {
                  en: 'Add Content',
                  ar: 'أضف المحتوى',
                },
                secondaryText: {
                  en: 'Private Advisory',
                  ar: 'استشارة خاصة',
                },
                url: '#projects',
                secondaryUrl: '#contact',
              },
              styles: {
                color: '#0A0A0A',
                backgroundColor: '#C5A880',
                textAlign: { desktop: 'center', mobile: 'center' },
              },
              animation: { type: 'fade-up', duration: 800, delay: 500, hoverEffect: 'lift' },
              responsive: {},
            },
          ],
        },
      ],
    },

    // 2. Architectural Philosophy / Statement Section
    {
      id: 'sec_about',
      name: 'Architectural Philosophy',
      layout: 'contained',
      background: {
        type: 'color',
        color: '#0D0D0D',
      },
      padding: {
        desktop: { top: 120, bottom: 120, left: 48, right: 48 },
        tablet: { top: 90, bottom: 90, left: 32, right: 32 },
        mobile: { top: 60, bottom: 60, left: 20, right: 20 },
      },
      animation: {
        type: 'fade',
        duration: 700,
        delay: 100,
      },
      columns: [
        {
          id: 'col_about_text',
          span: 6,
          elements: [
            {
              id: 'el_about_sub',
              type: 'text',
              content: {
                text: {
                  en: 'The Akaber Standard',
                  ar: 'معيار أكابر',
                },
              },
              styles: {
                color: '#C5A880',
                letterSpacing: '0.2em',
                fontSize: { desktop: '13px', mobile: '12px' },
                fontWeight: '600',
                margin: { desktop: { top: 0, bottom: 12, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 600, delay: 100 },
              responsive: {},
            },
            {
              id: 'el_about_head',
              type: 'heading',
              content: {
                text: {
                  en: 'Add Heading',
                  ar: 'أضف العنوان',
                },
              },
              styles: {
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: { desktop: '40px', tablet: '32px', mobile: '26px' },
                color: '#FFFFFF',
                lineHeight: '1.25',
                margin: { desktop: { top: 0, bottom: 24, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 700, delay: 200 },
              responsive: {},
            },
            {
              id: 'el_about_desc',
              type: 'text',
              content: {
                text: {
                  en: 'Add Description',
                  ar: 'أضف الوصف',
                },
              },
              styles: {
                fontSize: { desktop: '16px', mobile: '15px' },
                lineHeight: '1.8',
                color: '#A3A3A3',
                margin: { desktop: { top: 0, bottom: 32, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 700, delay: 300 },
              responsive: {},
            },
            {
              id: 'el_about_counter',
              type: 'counter',
              content: {
                items: [
                  { label: { en: 'Precision Design', ar: 'دقة التصميم' }, value: '100%' },
                  { label: { en: 'Bespoke Craft', ar: 'حرفية مخصصة' }, value: 'Prime' },
                  { label: { en: 'Editable Blocks', ar: 'قوالب مرنة' }, value: 'Visual' },
                ],
              },
              styles: {},
              animation: { type: 'fade-up', duration: 700, delay: 400 },
              responsive: {},
            },
          ],
        },
        {
          id: 'col_about_img',
          span: 6,
          elements: [
            {
              id: 'el_about_facade_img',
              type: 'image',
              content: {
                url: 'images/akaber_project_facade_1790231002730.jpg',
                alt: { en: 'Add Image', ar: 'أضف الصورة' },
                caption: { en: 'Add Content', ar: 'أضف المحتوى' },
              },
              styles: {
                border: {
                  width: '1px',
                  style: 'solid',
                  color: '#262626',
                  radius: '4px',
                },
              },
              animation: { type: 'zoom', duration: 800, delay: 250, hoverEffect: 'gold-border' },
              responsive: {},
            },
          ],
        },
      ],
    },

    // 3. Featured Projects CMS Grid
    {
      id: 'sec_projects',
      name: 'Featured Projects Showcase',
      layout: 'contained',
      background: {
        type: 'color',
        color: '#0A0A0A',
      },
      padding: {
        desktop: { top: 120, bottom: 120, left: 48, right: 48 },
        tablet: { top: 90, bottom: 90, left: 32, right: 32 },
        mobile: { top: 60, bottom: 60, left: 20, right: 20 },
      },
      animation: {
        type: 'fade',
        duration: 700,
        delay: 100,
      },
      columns: [
        {
          id: 'col_proj_header',
          span: 12,
          elements: [
            {
              id: 'el_proj_sub',
              type: 'text',
              content: {
                text: {
                  en: 'Curated Portfolio',
                  ar: 'المحفظة المختارة',
                },
              },
              styles: {
                color: '#C5A880',
                letterSpacing: '0.2em',
                fontSize: { desktop: '13px', mobile: '12px' },
                fontWeight: '600',
                textAlign: { desktop: 'center', mobile: 'center' },
                margin: { desktop: { top: 0, bottom: 12, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 600, delay: 100 },
              responsive: {},
            },
            {
              id: 'el_proj_head',
              type: 'heading',
              content: {
                text: {
                  en: 'Add Heading',
                  ar: 'أضف العنوان',
                },
              },
              styles: {
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: { desktop: '44px', tablet: '36px', mobile: '28px' },
                color: '#FFFFFF',
                textAlign: { desktop: 'center', mobile: 'center' },
                margin: { desktop: { top: 0, bottom: 16, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 700, delay: 200 },
              responsive: {},
            },
            {
              id: 'el_proj_desc',
              type: 'text',
              content: {
                text: {
                  en: 'Add Description',
                  ar: 'أضف الوصف',
                },
              },
              styles: {
                fontSize: { desktop: '16px', mobile: '14px' },
                color: '#8A8A8A',
                textAlign: { desktop: 'center', mobile: 'center' },
                maxWidth: '600px',
                margin: { desktop: { top: 0, bottom: 48, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 700, delay: 300 },
              responsive: {},
            },
            {
              id: 'el_proj_grid_widget',
              type: 'projects-grid',
              content: {
                filterCategory: 'all',
                limit: 6,
              },
              styles: {},
              animation: { type: 'fade', duration: 800, delay: 350 },
              responsive: {},
            },
          ],
        },
      ],
    },

    // 4. Interior Landmark Spotlight
    {
      id: 'sec_spotlight',
      name: 'Interior Landmark Showcase',
      layout: 'full-width',
      background: {
        type: 'image',
        imageUrl: 'images/akaber_interior_penthouse_1790231015025.jpg',
        overlayOpacity: 0.72,
      },
      padding: {
        desktop: { top: 140, bottom: 140, left: 64, right: 64 },
        tablet: { top: 100, bottom: 100, left: 32, right: 32 },
        mobile: { top: 70, bottom: 70, left: 20, right: 20 },
      },
      animation: {
        type: 'fade',
        duration: 800,
        delay: 100,
      },
      columns: [
        {
          id: 'col_spotlight_inner',
          span: 8,
          elements: [
            {
              id: 'el_spot_sub',
              type: 'text',
              content: {
                text: {
                  en: 'Masterpiece Living',
                  ar: 'أسلوب حياة متفرد',
                },
              },
              styles: {
                color: '#C5A880',
                letterSpacing: '0.25em',
                fontSize: { desktop: '13px', mobile: '12px' },
                fontWeight: '600',
                margin: { desktop: { top: 0, bottom: 16, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 600, delay: 100 },
              responsive: {},
            },
            {
              id: 'el_spot_head',
              type: 'heading',
              content: {
                text: {
                  en: 'Add Heading',
                  ar: 'أضف العنوان',
                },
              },
              styles: {
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: { desktop: '46px', tablet: '36px', mobile: '28px' },
                color: '#FFFFFF',
                lineHeight: '1.2',
                margin: { desktop: { top: 0, bottom: 20, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 700, delay: 200 },
              responsive: {},
            },
            {
              id: 'el_spot_desc',
              type: 'text',
              content: {
                text: {
                  en: 'Add Description',
                  ar: 'أضف الوصف',
                },
              },
              styles: {
                fontSize: { desktop: '17px', mobile: '15px' },
                lineHeight: '1.75',
                color: '#CCCCCC',
                maxWidth: '680px',
                margin: { desktop: { top: 0, bottom: 32, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 700, delay: 300 },
              responsive: {},
            },
            {
              id: 'el_spot_btn',
              type: 'button',
              content: {
                text: {
                  en: 'Add Content',
                  ar: 'أضف المحتوى',
                },
                url: '#contact',
              },
              styles: {
                color: '#0A0A0A',
                backgroundColor: '#C5A880',
              },
              animation: { type: 'fade-up', duration: 700, delay: 400, hoverEffect: 'lift' },
              responsive: {},
            },
          ],
        },
      ],
    },

    // 5. Private Consultation & Inquiries Form
    {
      id: 'sec_contact',
      name: 'Private Inquiries & Advisory Desk',
      layout: 'contained',
      background: {
        type: 'color',
        color: '#0E0E0E',
      },
      padding: {
        desktop: { top: 120, bottom: 120, left: 48, right: 48 },
        tablet: { top: 90, bottom: 90, left: 32, right: 32 },
        mobile: { top: 60, bottom: 60, left: 20, right: 20 },
      },
      animation: {
        type: 'fade',
        duration: 700,
        delay: 100,
      },
      columns: [
        {
          id: 'col_contact_info',
          span: 5,
          elements: [
            {
              id: 'el_contact_sub',
              type: 'text',
              content: {
                text: {
                  en: 'Private Inquiries',
                  ar: 'استفسارات خاصة',
                },
              },
              styles: {
                color: '#C5A880',
                letterSpacing: '0.2em',
                fontSize: { desktop: '13px', mobile: '12px' },
                fontWeight: '600',
                margin: { desktop: { top: 0, bottom: 16, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 600, delay: 100 },
              responsive: {},
            },
            {
              id: 'el_contact_head',
              type: 'heading',
              content: {
                text: {
                  en: 'Add Heading',
                  ar: 'أضف العنوان',
                },
              },
              styles: {
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: { desktop: '38px', tablet: '30px', mobile: '26px' },
                color: '#FFFFFF',
                margin: { desktop: { top: 0, bottom: 20, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 700, delay: 200 },
              responsive: {},
            },
            {
              id: 'el_contact_desc',
              type: 'text',
              content: {
                text: {
                  en: 'Add Description',
                  ar: 'أضف الوصف',
                },
              },
              styles: {
                fontSize: { desktop: '16px', mobile: '14px' },
                color: '#9E9E9E',
                lineHeight: '1.7',
                margin: { desktop: { top: 0, bottom: 32, left: 0, right: 0 } },
              },
              animation: { type: 'fade-up', duration: 700, delay: 300 },
              responsive: {},
            },
          ],
        },
        {
          id: 'col_contact_form',
          span: 7,
          elements: [
            {
              id: 'el_inquiry_form',
              type: 'inquiry-form',
              content: {
                title: { en: 'Add Content', ar: 'أضف المحتوى' },
              },
              styles: {
                backgroundColor: '#141414',
                border: {
                  width: '1px',
                  style: 'solid',
                  color: '#262626',
                  radius: '6px',
                },
                padding: {
                  desktop: { top: 36, bottom: 36, left: 36, right: 36 },
                  mobile: { top: 24, bottom: 24, left: 20, right: 20 },
                },
              },
              animation: { type: 'fade-up', duration: 800, delay: 350 },
              responsive: {},
            },
          ],
        },
      ],
    },
  ],
};

export const INITIAL_PAGES: BuilderPage[] = [INITIAL_HOME_PAGE];
