export type LocationType = 
  | 'Borough'
  | 'Seaside'
  | 'City Center'
  | 'Commercial Center'
  | 'Neighborhood'
  | 'Mountain'
  | 'Rural';

export type RevenueTier = 'under_1_7m' | '1_7m_to_3m' | 'above_3m';

export interface PharmacyItem {
  id: string;
  ref: string;
  title: string;
  location: string;
  region: string;
  department: string;
  locationType: LocationType;
  turnover: number; // in Euros
  grossMarginPercent: number;
  ebitda: number; // in Euros
  staffFte: number;
  surfaceSqM: number;
  askingPrice?: number;
  isExclusive?: boolean;
  isTurnkey?: boolean;
  isNew?: boolean;
  confidential?: boolean;
  image: string;
  tagline: string;
  highlights: string[];
  description: string;
}

export interface AdvisorItem {
  id: string;
  name: string;
  role: string;
  slogan: string;
  departments: string[];
  regions: string;
  image: string;
  email: string;
  phone: string;
  bio: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: 'B2B' | 'Practice' | 'Entrepreneurship' | 'Legal' | 'Finance';
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string[];
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  moreDetails?: string[];
}
