import { Property } from '../types';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Bosphorus Waterfront Palace Villa',
    tagline: 'Exclusive Neo-Ottoman Waterfront Residence with Private Pier',
    location: 'Bebek, Istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    type: 'villa',
    status: 'sale',
    priceUsd: 4850000,
    bedrooms: 6,
    bathrooms: 7,
    areaSqm: 850,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    badges: ['For Sale', 'Featured', 'Verified', 'Exclusive Mandate'],
    roiPotential: '8.4% Annual Capital Appreciation',
    description: 'A masterpiece developed and upgraded to the highest luxury standards by Akaber Development. Features unobstructed Bosphorus Strait views, private yacht mooring, heated infinity pool, smart-home automation, and Turkish hammam.',
    highlights: [
      'Private Yacht Pier & Waterfront Deck',
      'Complete Architectural Renovation by Akaber',
      'Turkish Citizenship by Investment Eligible',
      'Smart Climate & Biometric Security Systems'
    ],
    isExclusive: true
  },
  {
    id: 'prop-2',
    title: 'Levent Financial Tower — Commercial Retail & Office Plaza',
    tagline: 'Prime Grade-A Commercial Asset with High Rental Yield',
    location: 'Levent CBD, Istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    type: 'commercial',
    status: 'investment',
    priceUsd: 3200000,
    rentPeriod: 'yield $26,000/mo',
    areaSqm: 1120,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
    ],
    badges: ['Investment Asset', 'High Rental Yield 9.75%', 'Long-term Corporate Lease', 'Verified'],
    roiPotential: '9.75% Net Rental Yield in USD',
    description: 'Acquired and managed under Akaber Commercial Strategy. Fully tenanted with multinational banking and corporate retail tenants on 10-year triple-net indexed leases, offering immediate dollar-pegged cash flow.',
    highlights: [
      'Pre-Leased to Blue-Chip Corporate Tenants',
      'Immediate Passive Rental Cash Flow',
      'Direct Metro and Highway Access',
      'Full Property & Facility Management by Akaber'
    ],
    isExclusive: true
  },
  {
    id: 'prop-3',
    title: 'Bodrum Marina Sunset Cliffside Villa',
    tagline: 'Mediterranean Modern Luxury with Panoramic Aegean Views',
    location: 'Yalikavak, Bodrum',
    city: 'Bodrum',
    country: 'Turkey',
    type: 'villa',
    status: 'sale',
    priceUsd: 2650000,
    bedrooms: 5,
    bathrooms: 6,
    areaSqm: 620,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    badges: ['For Sale', 'Renovated & Upgraded', 'Verified', 'Luxury Living'],
    roiPotential: '12% Seasonal Luxury Rental ROI',
    description: 'Acquired at prime positioning and remodeled with sustainable natural Aegean stone, custom Italian kitchen, infinity glass edge pool, and private guest villa suite.',
    highlights: [
      '5 Minutes to Yalikavak Marina & Luxury Clubs',
      'Full Architectural Upgrades & Modernization',
      'High Vacation Rental Yield & Resale Liquidity',
      'Private Helipad Access in Vicinity'
    ]
  },
  {
    id: 'prop-4',
    title: 'Sapanca Lakeview Development Parcels (Subdivided Plots)',
    tagline: 'Master-Planned Residential Plots Ready for Construction',
    location: 'Sapanca Valley, Sakarya',
    city: 'Sapanca',
    country: 'Turkey',
    type: 'land',
    status: 'investment',
    priceUsd: 890000,
    areaSqm: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80'
    ],
    badges: ['Land Subdivision', 'Zoned & Approved', 'High Development Value', 'Verified'],
    roiPotential: '35%+ Projected Development Resale Margin',
    description: 'Purchased directly by Akaber as a large acreage parcel, successfully rezoned, subdivided into boutique villa plots with road, water, and electricity infrastructure ready for immediate development or individual sale.',
    highlights: [
      'Subdivided into 4 Independent Luxury Villa Plots',
      'Full Municipal Construction Permits in Place',
      'Breathtaking Lake & Forest Mountain Panorama',
      'Turnkey Construction Option Provided by Akaber'
    ],
    isExclusive: true
  },
  {
    id: 'prop-5',
    title: 'Nisantasi Heritage Residence & Designer Penthouse',
    tagline: 'Upgraded Historic Fashion District Duplex',
    location: 'Nisantasi, Istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    type: 'apartment',
    status: 'sale',
    priceUsd: 1420000,
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 280,
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
    ],
    badges: ['For Sale', 'Renovated & Upgraded', 'Featured', 'Prime City Center'],
    roiPotential: '7.8% Rental Return / Luxury Airbnb License',
    description: 'Acquired at below-market baseline, completely revitalized with high-ceiling restoration, custom chevron oak floors, designer marble bathrooms, and a private rooftop terrace.',
    highlights: [
      'Walking Distance to Luxury Boutiques & Fine Dining',
      'High-Grade Value-Add Renovation Completed',
      'Dual Key Capability for Flexible Rental Income',
      'Citizenship Investment Qualifying'
    ]
  },
  {
    id: 'prop-6',
    title: 'Antalya Turquoise Bay Penthouse with Private Pool',
    tagline: 'Direct Seafront Luxury Rental Residence',
    location: 'Konyaalti Coast, Antalya',
    city: 'Antalya',
    country: 'Turkey',
    type: 'apartment',
    status: 'rent',
    priceUsd: 6500,
    rentPeriod: '/month',
    bedrooms: 4,
    bathrooms: 4,
    areaSqm: 360,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80'
    ],
    badges: ['For Rent', 'Seafront Panorama', 'Verified', 'Turnkey Furnished'],
    roiPotential: 'Premium Monthly High-Yield Lease',
    description: 'Available for short or long-term luxury executive leasing. Completely furnished with custom bespoke designer furniture, wrap-around Mediterranean terrace, and hotel concierge services.',
    highlights: [
      'Direct Private Beach Elevator Access',
      'Rooftop Plunge Pool & Sun Deck',
      '24/7 Security and Valet Parking',
      'High-Speed Fiber & Executive Workspace'
    ]
  }
];

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  TRY: { symbol: '₺', rate: 34.2 },
  AED: { symbol: 'AED ', rate: 3.67 }
};
