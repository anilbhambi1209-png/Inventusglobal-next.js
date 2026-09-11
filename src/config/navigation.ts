export interface NavServiceLink {
  title: string;
  href: string;
  isPopular?: boolean;
}

export interface GrowthPillarConfig {
  id: "earned-media" | "paid-media" | "data-analytics" | "creative";
  label: string;
  iconName: "Sprout" | "Rocket" | "LineChart" | "Gem";
  description: string;
  services: NavServiceLink[];
}

export const navigationConfig = {
  mainNav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services", hasDropdown: true },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ],
  growthPillars: [
    {
      id: "earned-media",
      label: "Earned & Organic",
      iconName: "Sprout",
      description: "Dominating organic search, AI answer engines, and authority media.",
      services: [
        { title: "Search Engine Optimization (SEO)", href: "/services/search-engine-optimization", isPopular: true },
        { title: "Local SEO & Google Maps Vashi", href: "/services/local-seo", isPopular: true },
        { title: "AI Search & GEO Optimization", href: "/services/ai-search-optimization" },
        { title: "Authority Content Marketing", href: "/services/content-marketing" },
        { title: "Digital PR & High-DA Mentions", href: "/services/digital-pr" },
        { title: "Influencer Brand Partnerships", href: "/services/influencer-marketing" },
        { title: "Organic Social Media Growth", href: "/services/social-media-growth" },
        { title: "Email Marketing & CRM Nurture", href: "/services/content-marketing" },
        { title: "Search Everywhere Optimization", href: "/services/search-engine-optimization" },
      ],
    },
    {
      id: "paid-media",
      label: "Paid Media",
      iconName: "Rocket",
      description: "High-intent Google search ads, Meta funnels, and remarketing engines.",
      services: [
        { title: "Google Search & Intent Ads", href: "/services/google-ads-ppc", isPopular: true },
        { title: "Meta Instagram & Facebook Ads", href: "/services/meta-ads", isPopular: true },
        { title: "Performance Max & Shopping Ads", href: "/services/google-ads-ppc" },
        { title: "High-ROAS Retargeting Funnels", href: "/services/meta-ads" },
        { title: "Instant WhatsApp CRM Funnels", href: "/services/google-ads-ppc" },
        { title: "LinkedIn B2B Account Targeting", href: "/services/google-ads-ppc" },
        { title: "YouTube Video Ad Campaigns", href: "/services/meta-ads" },
        { title: "Creative & Copy Split Testing", href: "/services/meta-ads" },
        { title: "Free Paid Ad Account Audit", href: "/contact" },
      ],
    },
    {
      id: "data-analytics",
      label: "Data & Analytics",
      iconName: "LineChart",
      description: "Fast Next.js 15 platforms, conversion architecture, and tracking fidelity.",
      services: [
        { title: "Next.js 15 Web Applications", href: "/services/web-development", isPopular: true },
        { title: "Conversion Rate Optimization (CRO)", href: "/services/conversion-rate-optimization", isPopular: true },
        { title: "High-Converting Landing Funnels", href: "/services/web-development" },
        { title: "Core Web Vitals & Speed Optimization", href: "/services/web-development" },
        { title: "Headless CMS & Custom Portals", href: "/services/web-development" },
        { title: "E-Commerce Store Engineering", href: "/services/web-development" },
        { title: "Interactive Lead Calculators", href: "/services/web-development" },
        { title: "CRM & WhatsApp API Integrations", href: "/services/web-development" },
        { title: "Security & Cloud Infrastructure", href: "/services/web-development" },
      ],
    },
    {
      id: "creative",
      label: "Creative",
      iconName: "Gem",
      description: "Direct-response copywriting, high-retention video reels, and brand identity.",
      services: [
        { title: "Direct-Response Copywriting", href: "/services/content-marketing", isPopular: true },
        { title: "Short-Form Video & UGC Reels", href: "/services/social-media-growth", isPopular: true },
        { title: "Brand Identity & Visual Guidelines", href: "/services/content-marketing" },
        { title: "Editorial Playbooks & Reports", href: "/blog" },
        { title: "Creator Matchmaking & Direction", href: "/services/influencer-marketing" },
        { title: "High-ROAS Ad Banner Creatives", href: "/services/meta-ads" },
        { title: "Customer Video Proof & Stories", href: "/services/content-marketing" },
        { title: "Brand Voice & Positioning Strategy", href: "/about" },
        { title: "Creative Fatigue Shield", href: "/services/meta-ads" },
      ],
    },
  ] as GrowthPillarConfig[],
};
