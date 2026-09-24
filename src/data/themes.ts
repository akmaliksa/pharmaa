export interface ThemeConfig {
  id: string;
  name: string;
  nativeName: string;
  description: string;
  bgMain: string;
  bgSecondary: string;
  bgCard: string;
  borderAccent: string;
  accentGold: string;
  gradientText: string;
  textPrimary: string;
  textSecondary: string;
  previewColor: string;
  previewAccent: string;
}

export const THEMES: Record<string, ThemeConfig> = {
  'awwwards-find-proptech': {
    id: 'awwwards-find-proptech',
    name: 'FIND Real Estate (Awwwards Winner)',
    nativeName: 'فايند العقارية الفائزة بـ Awwwards / FIND Real Estate Ödüllü Tema',
    description: 'Inspired by the Awwwards Honorable Mention "FIND Real Estate" PropTech website: Fullscreen cinematic architectural video banner, ultra-clean editorial aesthetic, dynamic video playback controls, and smooth interactive property cards.',
    bgMain: '#05070B',
    bgSecondary: '#0B0F17',
    bgCard: '#101622',
    borderAccent: 'rgba(255, 255, 255, 0.12)',
    accentGold: '#E5B842',
    gradientText: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%)',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    previewColor: '#05070B',
    previewAccent: '#E5B842',
  },
  'royal-navy': {
    id: 'royal-navy',
    name: 'Imperial Royal Navy & Gold',
    nativeName: 'الأزرق الملكي والذهب الإمبراطوري / Kraliyet Laciverti & Altın',
    description: 'The signature Akaber deep oceanic midnight navy infused with radiant Byzantine & Ottoman gold.',
    bgMain: '#070D1E',
    bgSecondary: '#0A1128',
    bgCard: '#0F1E3D',
    borderAccent: 'rgba(212, 175, 55, 0.35)',
    accentGold: '#D4AF37',
    gradientText: 'linear-gradient(135deg, #F9F1D6 0%, #D4AF37 50%, #AA8022 100%)',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    previewColor: '#070D1E',
    previewAccent: '#D4AF37',
  },
  'ottoman-emerald': {
    id: 'ottoman-emerald',
    name: 'Ottoman Emerald & Champagne Gold',
    nativeName: 'الزمرد العثماني والذهب / Osmanlı Zümrüt & Şampanya',
    description: 'Opulent deep forest emerald green reminiscent of Topkapı imperial treasures and verdant Turkish valleys.',
    bgMain: '#051811',
    bgSecondary: '#082319',
    bgCard: '#0D3325',
    borderAccent: 'rgba(212, 185, 100, 0.4)',
    accentGold: '#E5C058',
    gradientText: 'linear-gradient(135deg, #FFF6D6 0%, #E5C058 50%, #A88624 100%)',
    textPrimary: '#F1FDF6',
    textSecondary: '#A7C4B5',
    previewColor: '#051811',
    previewAccent: '#E5C058',
  },
  'bosphorus-sapphire': {
    id: 'bosphorus-sapphire',
    name: 'Bosphorus Sapphire & Platinum Silver',
    nativeName: 'ياقوت البوسفور والبلاتين / Boğaziçi Safir & Platin',
    description: 'Crisp, contemporary Aegean marine blue with luminous platinum ice and silver accents.',
    bgMain: '#071626',
    bgSecondary: '#0B223B',
    bgCard: '#103052',
    borderAccent: 'rgba(100, 180, 245, 0.35)',
    accentGold: '#60A5FA',
    gradientText: 'linear-gradient(135deg, #E0F2FE 0%, #60A5FA 50%, #2563EB 100%)',
    textPrimary: '#F0F9FF',
    textSecondary: '#93C5FD',
    previewColor: '#071626',
    previewAccent: '#60A5FA',
  },
  'black-onyx': {
    id: 'black-onyx',
    name: 'Obsidian Black & Rose Gold',
    nativeName: 'الأونيكس الأسود والذهب الوردي / Obsidyen Siyah & Rose Gold',
    description: 'High-fashion minimalist deep black luxury with warm architectural rose gold highlights.',
    bgMain: '#0A0A0B',
    bgSecondary: '#121215',
    bgCard: '#1C1C22',
    borderAccent: 'rgba(244, 162, 97, 0.35)',
    accentGold: '#E76F51',
    gradientText: 'linear-gradient(135deg, #FFE8D6 0%, #E76F51 50%, #B23A22 100%)',
    textPrimary: '#FFFFFF',
    textSecondary: '#A1A1AA',
    previewColor: '#0A0A0B',
    previewAccent: '#E76F51',
  },
  'cappadocia-sand': {
    id: 'cappadocia-sand',
    name: 'Cappadocia Sunset & Warm Terracotta',
    nativeName: 'غروب كابادوكيا والتراكوتا / Kapadokya Günbatımı & Sıcak Toprak',
    description: 'Earthy, aristocratic Anatolian sunset hues inspired by volcanic stone, warm amber, and golden dunes.',
    bgMain: '#1A0F0D',
    bgSecondary: '#241613',
    bgCard: '#33201C',
    borderAccent: 'rgba(235, 150, 90, 0.4)',
    accentGold: '#F4A261',
    gradientText: 'linear-gradient(135deg, #FFEDD5 0%, #F4A261 50%, #C25E20 100%)',
    textPrimary: '#FFF7ED',
    textSecondary: '#D6B9A8',
    previewColor: '#1A0F0D',
    previewAccent: '#F4A261',
  },
  'monaco-pearl': {
    id: 'monaco-pearl',
    name: 'Monaco Pearl Light Luxury & Bronze',
    nativeName: 'اللؤلؤ الموناكي والبرونز الراقي / Monaco İnci Açık & Bronz',
    description: 'Elite light luxury palette with cream alabaster surfaces, warm brushed bronze, and rich charcoal typography.',
    bgMain: '#F8F6F0',
    bgSecondary: '#EFECE2',
    bgCard: '#FFFFFF',
    borderAccent: 'rgba(180, 140, 70, 0.3)',
    accentGold: '#B8860B',
    gradientText: 'linear-gradient(135deg, #B8860B 0%, #8B6508 50%, #5C4305 100%)',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    previewColor: '#F8F6F0',
    previewAccent: '#B8860B',
  },
};
