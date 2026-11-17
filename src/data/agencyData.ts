export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export interface PillarItem {
  index: string;
  title: string;
  description: string;
  proofFocus: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  sector: string;
  category: 'Performance' | 'Production' | 'Web & Brand';
  year: string;
  image: string;
  imageAlt: string;
  summary: string;
  scope: string[];
  deliverableHighlight: string;
  creativeDirection: string;
}

export interface EditableMetric {
  id: string;
  label: string;
  prefix: string;
  value: number;
  decimals: number;
  suffix: string;
  context: string;
}

export const BRAND_LOGO_PATH = '/assets/aistudio/file_00000000ef5881faa6cae79b716f28cb_24cc3364.png';

export const AGENCY_CONTACT = {
  companyName: 'BELIXIR PRIVATE LIMITED',
  tagline: 'Building Brands. Creating Impact.',
  email: 'hello@belixir.com',
  whatsappNumber: '918175923824',
  whatsappDisplay: '+91 8175923824',
  whatsappBaseUrl: 'https://wa.me/918175923824',
  officeHours: 'Mon – Sat · 10:00 AM – 7:00 PM IST',
};

export function getWhatsAppUrl(service?: string, company?: string): string {
  const targetCompany = company?.trim() ? ` for ${company.trim()}` : '';
  const message = service
    ? `Hello ${AGENCY_CONTACT.companyName}, I am interested in your ${service} service${targetCompany}. Please share details and next steps.`
    : `Hello ${AGENCY_CONTACT.companyName}, I would like to discuss a digital growth project for my brand.`;
  return `${AGENCY_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'graphic-designing',
    index: '01',
    title: 'Graphic Designing',
    tagline: 'Distinctive brand systems and high-impact visual creatives.',
    deliverables: [
      'Logo Design',
      'Brand Identity',
      'Social Media Creatives',
      'Posters & Banners',
      'Advertising Creatives',
    ],
    image: '/src/assets/images/service_3d_graphic_design_1794932742734.jpg',
    imageAlt: '3D obsidian prism, metallic pen nib, and glowing gradient brand color swatches',
    featured: true,
  },
  {
    id: 'video-editing',
    index: '02',
    title: 'Video Editing',
    tagline: 'High-retention short-form edits, commercial spots, and motion.',
    deliverables: [
      'Instagram Reels Editing',
      'YouTube Shorts Editing',
      'Promotional Video Ads',
      'Product Video Editing',
      'Motion Graphics',
    ],
    image: '/src/assets/images/service_3d_video_editing_1794932742908.jpg',
    imageAlt: '3D cinema camera lens with glowing timeline film strip and play prism',
    featured: true,
  },
  {
    id: 'web-development-seo',
    index: '03',
    title: 'Web Development + SEO',
    tagline: 'Conversion-focused websites engineered for speed and search.',
    deliverables: [
      'Professional Business Websites',
      'Landing Page Development',
      'Responsive Website Design',
      'On-Page SEO',
      'Website Optimization',
    ],
    image: '/src/assets/images/service_3d_web_seo_1794932743175.jpg',
    imageAlt: '3D glassmorphic browser wireframes, crystalline code brackets, and search lens prism',
  },
  {
    id: 'meta-ads',
    index: '04',
    title: 'Meta Ads',
    tagline: 'Scalable Facebook and Instagram campaigns built for lead flow.',
    deliverables: [
      'Facebook Advertising',
      'Instagram Advertising',
      'Lead Generation Campaigns',
      'Audience Targeting',
      'Campaign Optimization',
    ],
    image: '/src/assets/images/service_3d_meta_ads_1794932744340.jpg',
    imageAlt: '3D orbital infinity sculpture surrounded by translucent social engagement cards',
  },
  {
    id: 'google-ads',
    index: '05',
    title: 'Google Ads',
    tagline: 'High-intent search, display, and YouTube acquisition engines.',
    deliverables: [
      'Search Ads',
      'Display Ads',
      'YouTube Ads',
      'Keyword Research',
      'Conversion Tracking & Optimization',
    ],
    image: '/src/assets/images/service_3d_google_ads_1794932745226.jpg',
    imageAlt: '3D ascending growth prism with glowing search lens and conversion arrow',
  },
];

export const WHY_CHOOSE_US: PillarItem[] = [
  {
    index: '01',
    title: 'Data-Driven Strategies',
    description:
      'Every creative angle, landing page layout, and media allocation decision is anchored in first-party analytics, server-side conversion signals, and disciplined split testing.',
    proofFocus: 'Validated hypotheses before scaling budget',
  },
  {
    index: '02',
    title: 'Creative Excellence',
    description:
      'In-house directors, motion designers, and brand strategists build studio-grade visuals and ad hooks that stand apart in crowded social feeds.',
    proofFocus: 'Bespoke production without recycled templates',
  },
  {
    index: '03',
    title: 'ROI-Focused Campaigns',
    description:
      'We align campaign pacing with your real business margins—prioritizing qualified pipeline, net revenue efficiency, and sustainable customer payback periods.',
    proofFocus: 'Capital efficiency across every ad channel',
  },
  {
    index: '04',
    title: 'Transparent Reporting',
    description:
      'Live executive dashboards, unvarnished weekly creative retrospectives, and direct strategist access—so you always know where every rupee and dollar performs.',
    proofFocus: 'Clear attribution with zero opaque markups',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'fintech-growth-platform',
    title: 'Vanguard Ledger Web & Acquisition System',
    sector: 'Enterprise FinTech',
    category: 'Web & Brand',
    year: '2026',
    image: '/src/assets/images/portfolio_fintech_web_1794931228034.jpg',
    imageAlt: 'Laptop and mobile device displaying dark financial analytics interface on basalt stone',
    summary:
      'Complete conversion-focused web platform redesign paired with structured Google Search and LinkedIn demand capture architecture.',
    scope: ['Website Development', 'Performance Marketing', 'UI Systems'],
    deliverableHighlight: 'Interactive product showcase + 14 modular landing page templates',
    creativeDirection:
      'Obsidian dark surfaces with crisp tabular telemetry previews designed to signal institutional trust and clarity.',
  },
  {
    id: 'electric-mobility-launch',
    title: 'Kinetix EV Commercial Launch Film',
    sector: 'Electric Mobility',
    category: 'Production',
    year: '2026',
    image: '/src/assets/images/portfolio_luxury_auto_ads_1794931210336.jpg',
    imageAlt: 'Matte black electric performance coupe under studio softbox lighting in concrete pavilion',
    summary:
      'Hero commercial film production and multi-aspect Meta & YouTube video ad suite built for a flagship electric vehicle pre-order campaign.',
    scope: ['Video Ad Production', 'Meta Ads & Google Ads', 'Color Grading'],
    deliverableHighlight: '4K hero brand film + 18 modular 9:16 and 16:9 performance cutdowns',
    creativeDirection:
      'Architectural concrete framing, overhead diffused softbox reflections, and kinetic sound design.',
  },
  {
    id: 'botanical-skincare-campaign',
    title: 'Aeterna Botanica Social & Paid Creative Engine',
    sector: 'Luxury D2C Skincare',
    category: 'Performance',
    year: '2026',
    image: '/src/assets/images/portfolio_skincare_social_1794931211144.jpg',
    imageAlt: 'Frosted dark botanical skincare dropper bottles on wet volcanic stone with cool studio rim light',
    summary:
      'High-frequency Meta Advantage+ creative testing pipeline combining macro studio photography with creator-led social storytelling.',
    scope: ['Meta Ads & Google Ads', 'Social Media Marketing', 'Studio Photography'],
    deliverableHighlight: 'Always-on creative sprint delivering 24 tested ad variants monthly',
    creativeDirection:
      'Tactile basalt textures, cool studio rim light, and sharp ingredient-led visual hooks.',
  },
  {
    id: 'aegis-global-identity',
    title: 'Aegis Global Brand Identity & Design System',
    sector: 'Strategic Advisory',
    category: 'Web & Brand',
    year: '2026',
    image: '/src/assets/images/portfolio_architectural_brand_1794931211101.jpg',
    imageAlt: 'Matte black embossed stationery, brushed metal packaging, and brand guide tablet on dark slate',
    summary:
      'Comprehensive corporate identity overhaul spanning monogram geometry, tactile print collateral, packaging, and digital brand guidelines.',
    scope: ['Graphic Designing', 'Brand Guidelines', 'Packaging Systems'],
    deliverableHighlight: '80-page digital brand book, print collateral suite & web design tokens',
    creativeDirection:
      'Monolithic slate typography paired with precision brushed-metal finishes and blind debossing.',
  },
];

export const DEFAULT_RESULTS_METRICS: EditableMetric[] = [
  {
    id: 'roas-benchmark',
    label: 'Target Campaign ROAS',
    prefix: '',
    value: 4.2,
    decimals: 1,
    suffix: 'x',
    context: 'Editable placeholder benchmark',
  },
  {
    id: 'ad-budget-capacity',
    label: 'Monthly Ad Spend Capacity',
    prefix: '$',
    value: 250,
    decimals: 0,
    suffix: 'K+',
    context: 'Editable placeholder benchmark',
  },
  {
    id: 'creative-velocity',
    label: 'Ad Creatives Shipped / Quarter',
    prefix: '',
    value: 180,
    decimals: 0,
    suffix: '+',
    context: 'Editable placeholder benchmark',
  },
  {
    id: 'reporting-cadence',
    label: 'Reporting Transparency Score',
    prefix: '',
    value: 100,
    decimals: 0,
    suffix: '%',
    context: 'Editable placeholder benchmark',
  },
];

export const STUDIO_IMAGE_PATH = '/src/assets/images/belixir_studio_space_1794931226874.jpg';
