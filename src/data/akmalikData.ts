import { PharmacyItem, AdvisorItem, ArticleItem, FaqItem } from '../types/akmalik';

export const PHARMACY_LISTINGS: PharmacyItem[] = [
  {
    id: 'pharma-1',
    ref: '06982737',
    title: 'Monaco Perimeter / Ultra-Premium Coastal Pharmacy',
    location: 'Cannes Coast & Monaco Axis',
    region: 'Provence-Alpes-Côte d\'Azur',
    department: 'Alpes-Maritimes (06)',
    locationType: 'Seaside',
    turnover: 3850000,
    grossMarginPercent: 33.5,
    ebitda: 420000,
    staffFte: 6,
    surfaceSqM: 185,
    askingPrice: 3200000,
    isExclusive: true,
    isTurnkey: true,
    isNew: true,
    image: '/images/akmalik/croix-pharmacie.webp',
    tagline: 'High purchasing power customer base with exceptional parapharmacy & aesthetic dermocosmetics sales.',
    highlights: [
      'Prime beachfront commercial avenue with high foot traffic',
      'Automated robotic dispensing system installed in 2024',
      'Long-term commercial lease renewed with low indexed rent',
      'Experienced team in place with senior titular pharmacist assistance'
    ],
    description: 'Rare opportunity on the Riviera. This prestigious pharmacy combines solid prescription volume with an outstanding parapharmacy basket value. Perfect for a dynamic buyer looking for both exceptional financial returns and an idyllic Mediterranean living environment.'
  },
  {
    id: 'pharma-2',
    ref: '01165040',
    title: 'The Perfect Balance / Historic Town Center Pharmacy',
    location: 'Ain Sector City Center',
    region: 'Auvergne-Rhône-Alpes',
    department: 'Ain (01)',
    locationType: 'City Center',
    turnover: 2100000,
    grossMarginPercent: 32.2,
    ebitda: 285000,
    staffFte: 4,
    surfaceSqM: 140,
    askingPrice: 1750000,
    isExclusive: true,
    isTurnkey: true,
    isNew: false,
    image: '/images/akmalik/fonds-titres.webp',
    tagline: 'Strong patient loyalty, medical center adjacent, excellent work-life balance.',
    highlights: [
      'Directly opposite new multidisciplinary healthcare center (8 doctors & specialists)',
      'Consistent organic revenue growth of +4.5% year-on-year',
      'Private parking lot for 12 vehicles dedicated to pharmacy patients',
      'No local discount competition within a 7km radius'
    ],
    description: 'Located in a flourishing commuter town in the Ain department near Greater Lyon. Excellent profitability with predictable repeat customer demographics. The premises are in immaculate turnkey condition with modern merchandising units.'
  },
  {
    id: 'pharma-3',
    ref: '13064509',
    title: 'Marseille Metropolitan Hub / High Footfall Landmark',
    location: 'Central Marseille Commercial Boulevard',
    region: 'Provence-Alpes-Côte d\'Azur',
    department: 'Bouches-du-Rhône (13)',
    locationType: 'City Center',
    turnover: 5200000,
    grossMarginPercent: 34.0,
    ebitda: 610000,
    staffFte: 9,
    surfaceSqM: 260,
    confidential: true,
    isExclusive: true,
    isTurnkey: true,
    isNew: true,
    image: '/images/akmalik/bail-commercial.jpg',
    tagline: 'Strictly confidential dossier. Top-tier revenue with institutional-grade margins.',
    highlights: [
      'Subway & tramway station exit directly facing the pharmacy entrance',
      'Major prescription provider for 3 private clinics in the district',
      'Fully digitized inventory management and 2 high-speed Rowa robots',
      'Over 950 customers served daily with average basket size of €26.40'
    ],
    description: 'One of the highest-performing pharmacies in the South of France. Outstanding EBITDA and cash-flow generation. Requires proof of liquid equity (minimum €600,000) prior to disclosure of full financial audit.'
  },
  {
    id: 'pharma-4',
    ref: '71248361',
    title: 'Burgundy Village Pharmacy / Sole Community Provider',
    location: 'Saône-et-Loire Wine Country',
    region: 'Bourgogne-Franche-Comté',
    department: 'Saône-et-Loire (71)',
    locationType: 'Borough',
    turnover: 1450000,
    grossMarginPercent: 36.8,
    ebitda: 215000,
    staffFte: 2,
    surfaceSqM: 110,
    askingPrice: 1150000,
    isExclusive: true,
    isTurnkey: true,
    isNew: false,
    image: '/images/akmalik/croix-pharmacie.webp',
    tagline: 'Low overheads, monopoly position, supreme quality of life in scenic wine region.',
    highlights: [
      'Only pharmacy in a 14km radius serving 5 interconnected rural communes',
      'High dispensing fee margin on chronic care treatments and medical equipment rental',
      'Includes 3-bedroom renovated apartment above the pharmacy for easy relocation',
      'Eligible for French ZRR / FRR rural tax exemptions (0% corporate tax for 5 years)'
    ],
    description: 'An ideal first acquisition for a young pharmacist couple or professional seeking autonomy. High net disposable income, zero stress, supportive local community, and massive tax relief benefits under rural zoning.'
  },
  {
    id: 'pharma-5',
    ref: '74248361',
    title: 'Alpine Resort Pharmacy / 15 Minutes from Megève',
    location: 'Haute-Savoie Alpine Valley',
    region: 'Auvergne-Rhône-Alpes',
    department: 'Haute-Savoie (74)',
    locationType: 'Mountain',
    turnover: 2750000,
    grossMarginPercent: 35.2,
    ebitda: 390000,
    staffFte: 5,
    surfaceSqM: 165,
    askingPrice: 2450000,
    isExclusive: false,
    isTurnkey: true,
    isNew: true,
    image: '/images/akmalik/antalgique.jpg',
    tagline: 'Double seasonal peak (Winter skiing & Summer hiking) plus affluent year-round locals.',
    highlights: [
      'Strategically positioned at base of high-speed chairlifts and main pedestrian plaza',
      'Exceptional OTC, sports medicine, orthopedic brace, and premium skincare turnover',
      'Strong cross-border Swiss client flow with high disposable spend',
      'Modern architectural chalet fit-out crafted with local larch wood and slate'
    ],
    description: 'Combines the passion of alpine mountain living with institutional-level retail margins. Highly profitable business with strong seasonal peaks and stable off-season resident support.'
  },
  {
    id: 'pharma-6',
    ref: '06054003',
    title: 'Cannes Authentique / High-End Neighborhood Jewel',
    location: 'Cannes Center-West',
    region: 'Provence-Alpes-Côte d\'Azur',
    department: 'Alpes-Maritimes (06)',
    locationType: 'Neighborhood',
    turnover: 2400000,
    grossMarginPercent: 32.8,
    ebitda: 310000,
    staffFte: 4,
    surfaceSqM: 130,
    askingPrice: 1980000,
    isExclusive: true,
    isTurnkey: true,
    isNew: false,
    image: '/images/akmalik/fonds-titres.webp',
    tagline: 'Steady year-round clientele, upscale residential district with strong loyalty.',
    highlights: [
      'Surrounded by bakers, organic grocers, and medical practices with constant daily traffic',
      'Very healthy financial ratios with zero outstanding debts',
      'Turnover has grown consistently over the past 3 fiscal years',
      'Ready for immediate takeover with zero required renovations'
    ],
    description: 'A true turnkey pharmacy in an authentic Cannes neighborhood. Beloved by multi-generational families and retirees. Predictable revenues and very manageable staffing.'
  },
  {
    id: 'pharma-7',
    ref: '69278642',
    title: 'Lyon West Golden Triangle / Monts d\'Or Commuter Hub',
    location: 'Greater Lyon Monts d\'Or Sector',
    region: 'Auvergne-Rhône-Alpes',
    department: 'Rhône (69)',
    locationType: 'Borough',
    turnover: 2950000,
    grossMarginPercent: 33.1,
    ebitda: 360000,
    staffFte: 5,
    surfaceSqM: 175,
    askingPrice: 2400000,
    isExclusive: false,
    isTurnkey: true,
    isNew: true,
    image: '/images/akmalik/croix-pharmacie.webp',
    tagline: 'Affluent executive families, rapid demographic expansion, cutting-edge facilities.',
    highlights: [
      'High-growth town with 450 new residential homes built in the past 24 months',
      'Recently expanded surface with dedicated consultation room for vaccinations & screening',
      'Collaborative healthcare agreements with 6 local general practitioners',
      'Convenient access to Lyon ring road within 12 minutes'
    ],
    description: 'An exceptional asset in one of Lyon\'s most desirable residential corridors. Offers the highest quality of working conditions, an affluent clientele, and strong potential for continued expansion.'
  },
  {
    id: 'pharma-8',
    ref: '06673161',
    title: 'Antibes Juan-les-Pins / Seaside Lifestyle++',
    location: 'Juan-les-Pins Promenade & Center',
    region: 'Provence-Alpes-Côte d\'Azur',
    department: 'Alpes-Maritimes (06)',
    locationType: 'Seaside',
    turnover: 3100000,
    grossMarginPercent: 33.9,
    ebitda: 380000,
    staffFte: 5,
    surfaceSqM: 155,
    askingPrice: 2600000,
    isExclusive: true,
    isTurnkey: true,
    isNew: false,
    image: '/images/akmalik/bail-commercial.jpg',
    tagline: 'Magnificent sunlit corner location, vibrant pedestrian atmosphere, top margins.',
    highlights: [
      'Double display window on main pedestrian shopping avenue',
      'Substantial summer surge in sun care and international traveler prescriptions',
      'Turnkey IT infrastructure (WinPharma latest build) and electronic label shelf tags',
      'Motivated seller retiring after 22 rewarding years of practice'
    ],
    description: 'Live by the Mediterranean while running an exceptionally healthy, profitable pharmacy business. Juan-les-Pins offers year-round vibrancy, great schools, and a flourishing commercial district.'
  }
];

export const ADVISORS: AdvisorItem[] = [
  {
    id: 'adv-gloria',
    name: 'Gloria',
    role: 'Senior Pharmacy Broker & Regional Director',
    slogan: 'Make your ambitions shine bright',
    departments: ['01', '21', '38', '69', '71', '73', '74'],
    regions: 'Lyon, Ain, Savoie & Burgundy',
    image: '/images/akmalik/gloria.jpg',
    email: 'gloria@akmalikpharma.com',
    phone: '+33 4 78 00 12 34',
    bio: 'With over 14 years supporting pharmacists through mergers, valuations, and first-time acquisitions, Gloria knows the commercial pulse of the Auvergne-Rhône-Alpes and Burgundy corridors intimately.'
  },
  {
    id: 'adv-loic',
    name: 'Loïc',
    role: 'Financial Structuring & Pharmacy M&A Specialist',
    slogan: 'Pharmacy is our life\'s true calling',
    departments: ['03', '15', '42', '43', '63', '69'],
    regions: 'Auvergne, Loire & Central France',
    image: '/images/akmalik/loic.jpg',
    email: 'loic@akmalikpharma.com',
    phone: '+33 4 77 11 22 33',
    bio: 'Former healthcare banking director turned officinal broker. Loïc builds ironclad financing dossiers that secure prime interest rates from regional and national banks.'
  },
  {
    id: 'adv-stephane',
    name: 'Stéphane',
    role: 'Riviera & Coastal Practice Advisor',
    slogan: 'Free to be yourself and thrive',
    departments: ['06', '83'],
    regions: 'French Riviera, Nice & Var',
    image: '/images/akmalik/stephane.jpg',
    email: 'stephane@akmalikpharma.com',
    phone: '+33 4 93 44 55 66',
    bio: 'Specialist in coastal, resort, and high-volume urban pharmacies across the Côte d\'Azur. Stéphane excels at confidential valuation and discrete seller-buyer matchmaking.'
  },
  {
    id: 'adv-aude',
    name: 'Aude',
    role: 'Human Relations & Practice Transition Coach',
    slogan: 'Human connection above everything else',
    departments: ['2A', '2B', '04', '05', '07', '13', '26', '84'],
    regions: 'Marseille, Provence, Drôme & Corsica',
    image: '/images/akmalik/aude.webp',
    email: 'aude@akmalikpharma.com',
    phone: '+33 4 91 88 99 00',
    bio: 'Aude champions human-centric transitions, ensuring team retention, gentle leadership handovers, and positive vendor psychology throughout the sales journey.'
  }
];

export const ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Decoding Pharmacy Valuation: The Definitive KPI & Multiplier Guide',
    category: 'Finance',
    date: 'February 2026',
    readTime: '6 min read',
    excerpt: 'Valuing a pharmacy today is far more sophisticated than simply multiplying revenue. Discover how EBITDA, gross margins, and customer retention dictate true fair market price.',
    image: '/images/akmalik/croix-pharmacie.webp',
    content: [
      'In previous decades, French pharmacies were often valued using a crude rule of thumb: a percentage of annual turnover (chiffre d\'affaires hors taxes). Today, with changing reimbursement models and margin pressure on prescription drugs, bankers and smart buyers look almost exclusively at EBITDA (EBE - Excédent Brut d\'Exploitation) and reconstituted cash flows.',
      'A pharmacy generating €2M with a 34% margin and lean overheads is worth vastly more than a €2.8M pharmacy crippled by heavy staffing costs or expensive rent.',
      'Key ratios to scrutinize include: Gross commercial margin percentage, personnel cost ratio (ideally under 11-12% of CA), occupancy cost under 3.5%, and the proportion of high-margin parapharmacy versus regulated tier-1 medicines.'
    ]
  },
  {
    id: 'art-2',
    title: 'Buying a Pharmacy: Business Assets (Fonds) or Company Shares (Titres)?',
    category: 'Entrepreneurship',
    date: 'January 2026',
    readTime: '5 min read',
    excerpt: 'Embarking on your pharmacy acquisition involves a crucial structural decision: Should you buy the ongoing business goodwill (fonds de commerce) or the company shares (titres)?',
    image: '/images/akmalik/fonds-titres.webp',
    content: [
      'Purchasing business assets (fonds de commerce) isolates the buyer from past corporate liabilities, debts, and tax audit surprises. The asset purchase allows the buyer to amortize the purchase price of the goodwill, creating substantial tax deductions over 10 to 15 years.',
      'On the other hand, purchasing shares (titres de société) allows for a smoother continuity of supplier contracts, lease agreements, and bank facilities without formal assignments. For sellers, share sales often benefit from favorable capital gains tax regimes under retirement exemptions (Article 150-0 D ter of the CGI).',
      'At akmalik, our financial and legal analysts run parallel simulated scenarios to determine the optimum structure for both parties.'
    ]
  },
  {
    id: 'art-3',
    title: 'Commercial Leases in Pharmacy: The Clauses That Can Make or Break You',
    category: 'Legal',
    date: 'December 2025',
    readTime: '7 min read',
    excerpt: 'The 3-6-9 commercial lease is the operational backbone of your pharmacy. Learn which clauses require intense scrutiny before signing the preliminary contract.',
    image: '/images/akmalik/bail-commercial.jpg',
    content: [
      'Unlike standard retail boutiques, a pharmacy is bound to a geographically protected territory regulated by the Regional Health Agency (ARS). Relocating is heavily restricted by public health quotas. This makes the commercial lease contract critical.',
      'Critical points include: The exclusivity clause preventing any competing parapharmacy or cosmetic retail in the same building, clear assignment clauses (clause de cession) allowing the pharmacist to sell without prohibitive landlord transfer fees, and fair indexing mechanisms tied to the ILC index rather than volatile construction indices.',
      'Never commit to a preliminary agreement (compromis) without a full audit of the existing lease by our legal counsel.'
    ]
  },
  {
    id: 'art-4',
    title: 'The Evolution of Pharmacist Scope: Prescribing, Screening & AI',
    category: 'Practice',
    date: 'November 2025',
    readTime: '4 min read',
    excerpt: 'From rapid diagnostic screening tests (TROD) to renewals and collaborative primary care consultations, discover how modern pharmacies boost revenue through health services.',
    image: '/images/akmalik/antalgique.jpg',
    content: [
      'The modern community pharmacy is no longer just a dispensary for boxes; it is the most accessible primary care triage center in the neighborhood.',
      'Pharmacists who have built dedicated confidential consultation spaces are reaping significant financial rewards through billing for vaccinations, seasonal flu screening, urinary tract infection (UTI) rapid protocols, and angina rapid antigen tests.',
      'Furthermore, AI-driven inventory replenishment systems reduce expired product write-offs by up to 65%, freeing valuable working capital.'
    ]
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    number: '01',
    question: 'Why hire a specialized pharmacy brokerage firm like akmalik?',
    answer: 'Whether you are actively looking to buy your first pharmacy or preparing the confidential sale of your lifetime practice, an officinal transaction is a profound professional and financial turning point.',
    moreDetails: [
      'A pharmacy is not an ordinary commercial store: it is governed by strict public health regulations (Code de la santé publique), regional health quotas (ARS), Ordre des Pharmaciens credentialing, and specialized bank underwriting.',
      'akmalik acts as your trusted quarterback: we perform rigorous financial audits, negotiate terms on an equal footing, package the entire bank financing dossier, and coordinate with notaries and accountants.',
      'Our discreet network ensures that sellers protect their staff and supplier relationships, while buyers gain privileged access to off-market gems before they hit the open market.'
    ]
  },
  {
    id: 'faq-2',
    number: '02',
    question: 'How much does a pharmacy transaction cost and who pays what?',
    answer: 'Transaction fees vary based on whether you are acquiring the underlying business assets (fonds de commerce) or company shares (titres), and are structured with total clarity from Day 1.',
    moreDetails: [
      'Brokerage fees (honoraires de transaction) are success-based and generally represent between 3% to 6% of the transaction volume, mutually agreed upfront.',
      'Other third-party expenses include notary fees (droits d\'enregistrement), professional board registration fees (Ordre des Pharmaciens), and bank dossier processing charges.',
      'With akmalik, there are zero upfront retainer fees or hidden costs: our compensation is tied strictly to the successful closing and operational handover of the pharmacy.'
    ]
  },
  {
    id: 'faq-3',
    number: '03',
    question: 'What are the sequential steps of a pharmacy transaction?',
    answer: 'The path follows a structured, legally protected sequence ensuring safety for both buyer and seller up to official handover.',
    moreDetails: [
      'Step 1: Confidential valuation, dossier compilation, and qualification of prospective buyers.',
      'Step 2: On-site visits under non-disclosure agreements (NDAs) and submission of a Letter of Intent (LOI).',
      'Step 3: Drafting and signing of the Bilateral Preliminary Agreement (Compromis de vente) with customary suspensive conditions.',
      'Step 4: Bank loan financing approvals and regional healthcare committee filings (ARS & Conseil de l\'Ordre).',
      'Step 5: Pre-closing stock inventory count, final deed signing, and inaugural operational handover.'
    ]
  },
  {
    id: 'faq-4',
    number: '04',
    question: 'How long does a pharmacy transaction take on average?',
    answer: 'A standard pharmacy transaction requires between 4 to 8 months from initial agreement to the first official morning of independent operation.',
    moreDetails: [
      'This timeframe is largely dictated by mandatory regulatory windows: the Regional Health Agency (ARS) and National Board of Pharmacists observe statutory review delays (typically 2 months).',
      'Simultaneously, banks require 4 to 6 weeks to issue formal credit approval terms (offres de prêt).',
      'akmalik accelerates this calendar by preparing all supporting documentation concurrently rather than sequentially, avoiding common administrative bottlenecks.'
    ]
  },
  {
    id: 'faq-5',
    number: '05',
    question: 'How is a pharmacy\'s market value calculated in 2026?',
    answer: 'Modern valuation is an exact science based on reconstituted EBITDA (EBE retraité), free cash flow, and qualitative asset factors.',
    moreDetails: [
      'We analyze 3 years of audited balance sheets, stripping out non-recurring owner expenses, adjusting for normalized pharmacist titular remuneration, and calculating true debt repayment capacity (capacité de remboursement).',
      'Qualitative criteria are equally decisive: doctor-to-population ratios, upcoming retirements of neighborhood prescribers, parking convenience, lease longevity, and pharmacy automation status.'
    ]
  }
];
