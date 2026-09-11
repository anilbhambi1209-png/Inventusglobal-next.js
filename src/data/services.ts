import { ServiceItem } from "@/types/service";

export const servicesData: ServiceItem[] = [
  {
    id: "google-ads-ppc",
    slug: "google-ads-ppc",
    category: "Paid Media",
    pillarId: "paid-media",
    title: "Google Ads & Intent-Driven Paid Search",
    shortTitle: "Google Ads PPC",
    tagline: "Turn Search Intent Into Predictable Customer Acquisition and Scalable ROAS",
    shortDesc:
      "We architect full-funnel Google Ads campaigns engineered for commercial intent. From automated negative keyword filters to conversion landing pages, we maximize your bottom-line return.",
    heroDesc:
      "Stop burning marketing budget on vanity impressions and unqualified clicks. Our senior paid media team at Satra Plaza, Vashi builds granular Google Search, Shopping, and Performance Max funnels designed to deliver measurable client revenue.",
    metricsHighlight: "Average 3.8x ROAS across 180+ active campaigns",
    turnaroundTime: "Campaigns live in 5–7 business days",
    suitableFor: [
      "Real Estate developers seeking verified high-ticket buyer inquiries",
      "Healthcare chains and multi-specialty diagnostic centers",
      "B2B enterprises needing qualified executive demo requests",
      "D2C brands scaling beyond ₹10L/month revenue",
    ],
    deliverables: [
      {
        title: "Commercial-Intent Keyword Mapping",
        description: "Zeroing in on transactional keywords where searchers have active purchasing intent, avoiding informational waste.",
      },
      {
        title: "Negative Keyword Automation",
        description: "Continuous pruning of irrelevant search terms to ensure every ad rupee is spent on genuine prospects.",
      },
      {
        title: "High-Converting Ad Copy Split Testing",
        description: "A/B testing ad headlines, descriptions, sitelinks, and structured callout assets to boost Quality Score and lower CPC.",
      },
      {
        title: "Server-Side Tracking & GTM Setup",
        description: "First-party tracking integration with GA4 and offline conversion imports for 100% accurate attribution.",
      },
      {
        title: "Real-Time Transparent Dashboard",
        description: "Live 24/7 Looker Studio reporting tracking cost-per-lead, conversion rates, and return on ad spend.",
      },
    ],
    processSteps: [
      { step: "01", title: "Account & Competitor Teardown", description: "Audit historical ad spend, analyze competitor auction insights, and identify wasted spend." },
      { step: "02", title: "Funnel & Tracking Architecture", description: "Configure server-side conversion tags, phone call tracking, and dedicated landing page variants." },
      { step: "03", title: "Campaign Launch & Bidding", description: "Deploy localized single-theme ad groups with smart bidding strategies aligned to your margin target." },
      { step: "04", title: "Continuous Iterative Scale", description: "Weekly negative keyword expansion, ad creative refreshes, and budget scaling on winning segments." },
    ],
    faqs: [
      { question: "What is the minimum recommended ad budget?", answer: "We recommend starting with a minimum ad spend of ₹40,000 to ₹75,000/month to allow Google's machine learning algorithms to exit the learning phase and generate statistically significant conversion volume." },
      { question: "Do you charge a percentage of ad spend or a flat fee?", answer: "We operate on transparent, tiered monthly management retainers based on campaign scope and complexity, with zero hidden markups on ad spend." },
      { question: "How soon do we see inquiries?", answer: "Once tracking and compliance approvals are complete (typically 5 to 7 days), ads go live immediately, and initial inquiries often arrive within the first 48 hours." },
    ],
    relatedCaseStudySlug: "luxury-real-estate-vashi",
  },
  {
    id: "search-engine-optimization",
    slug: "search-engine-optimization",
    category: "Earned & Organic",
    pillarId: "earned-media",
    title: "Search Engine Optimization (SEO & AI Search)",
    shortTitle: "Organic SEO",
    tagline: "Dominate Google Rankings for Keywords That Actually Drive Bank Revenue",
    shortDesc:
      "Modern SEO requires deep technical hygiene, semantic content clusters, and authoritative digital PR. We build organic growth engines that deliver compounding traffic.",
    heroDesc:
      "Forget keyword stuffing and low-quality spam backlinks. We engineer search architecture that wins top 3 organic rankings in Google and gets your brand cited in AI answer engines like ChatGPT Search and Google AI Overviews.",
    metricsHighlight: "+240% Average organic pipeline growth in 6 months",
    turnaroundTime: "Initial algorithmic improvements in 60–90 days",
    suitableFor: [
      "Companies tired of rising PPC ad costs wanting durable organic equity",
      "Multi-location brands in Mumbai, Navi Mumbai, and Thane",
      "Professional service firms establishing category authority",
    ],
    deliverables: [
      {
        title: "Technical SEO & Core Web Vitals Audit",
        description: "Optimizing crawl budget, indexation hygiene, schema structured data, and mobile page speed.",
      },
      {
        title: "Semantic Topic Cluster Content Strategy",
        description: "Architecting comprehensive content pillars that establish topical authority in Google's Knowledge Graph.",
      },
      {
        title: "High-DA Digital PR & Authority Mentions",
        description: "Securing white-hat editorial backlinks from verified industry publications and media portals.",
      },
      {
        title: "AI Search Optimization (GEO)",
        description: "Structuring brand entities so AI answer engines cite your business in synthesized search results.",
      },
    ],
    processSteps: [
      { step: "01", title: "Comprehensive Health Audit", description: "Identify crawl bottlenecks, canonical issues, orphaned URLs, and Core Web Vitals red flags." },
      { step: "02", title: "Topical Authority Roadmap", description: "Map out commercial search intent queries and competitor keyword gaps over a 12-month horizon." },
      { step: "03", title: "On-Page & Schema Deployment", description: "Implement structured JSON-LD schema, internal linking architecture, and conversion-focused copy." },
      { step: "04", title: "Authority Building & Reporting", description: "Acquire high-tier digital PR coverage and provide transparent monthly ranking and revenue attribution reports." },
    ],
    faqs: [
      { question: "How long does SEO take to produce results?", answer: "While technical fixes can trigger ranking improvements within 30 to 60 days, sustainable top-tier organic dominance typically matures between months 3 to 6." },
      { question: "Do you guarantee #1 rankings?", answer: "No ethical agency can guarantee specific Google rankings because search algorithms shift constantly. However, our 98% client retention rate reflects our verified track record of driving measurable organic pipeline growth." },
    ],
    relatedCaseStudySlug: "healthcare-diagnostic-chain",
  },
  {
    id: "local-seo",
    slug: "local-seo",
    category: "Earned & Organic",
    pillarId: "earned-media",
    title: "Local SEO & Google Business Profile Dominance",
    shortTitle: "Local SEO Navi Mumbai",
    tagline: "Own the Google Maps 3-Pack and Drive High-Intent Footfall Across Navi Mumbai",
    shortDesc:
      "Capture local customers searching for services in Vashi, Belapur, Kharghar, and across Mumbai. We optimize citations, local review velocity, and Google Maps rankings.",
    heroDesc:
      "When local prospects search 'best agency near me' or look for specialized clinics and showrooms on Google Maps, being outside the 3-pack means losing 70% of clicks. We optimize your local presence for maximum local phone calls and showroom visits.",
    metricsHighlight: "Average +180% local phone inquiries within 90 days",
    turnaroundTime: "Local profile ranking improvements in 30–45 days",
    suitableFor: [
      "Retail showrooms, medical clinics, and dental chains",
      "Real estate sales offices and luxury project sites",
      "Local service providers across Navi Mumbai and Mumbai",
    ],
    deliverables: [
      { title: "Google Business Profile Optimization", description: "Complete category auditing, geo-tagged image uploads, service catalog setup, and attributes optimization." },
      { title: "Local Citation & Directory Hygiene", description: "Consistent NAP (Name, Address, Phone) citation synchronization across 60+ verified Indian directories." },
      { title: "Review Velocity & Reputation Framework", description: "Ethical review acquisition systems that generate authentic 5-star customer testimonials continuously." },
      { title: "Localized Geo-Landing Pages", description: "Dedicated location pages targeting suburbs like Vashi, Kharghar, Nerul, Belapur, and Thane." },
    ],
    processSteps: [
      { step: "01", title: "Local Audit & Geo-Grid Scan", description: "Run geo-grid rank tracking to visualize exactly where your business ranks across every local pin code." },
      { step: "02", title: "Profile Overhaul & Citations", description: "Eliminate duplicate profiles, standardize NAP information, and optimize categories and service descriptions." },
      { step: "03", title: "Geo-Content & Local Mentions", description: "Publish geo-targeted updates, FAQs, and local backlinks from regional publications." },
    ],
    faqs: [
      { question: "How does Local SEO differ from national SEO?", answer: "Local SEO focuses specifically on proximity, Google Maps 3-Pack prominence, and localized search intent (e.g. 'in Vashi' or 'near me'), driving direct phone calls and in-person store visits." },
    ],
  },
  {
    id: "meta-ads",
    slug: "meta-ads",
    category: "Paid Media",
    pillarId: "paid-media",
    title: "Meta Ads (Instagram & Facebook Social Performance)",
    shortTitle: "Meta Ads (IG & FB)",
    tagline: "Stop the Scroll with Direct-Response Creative and High-ROAS Retargeting",
    shortDesc:
      "We combine thumb-stopping short-form video hooks with advanced audience segmentation to turn cold Instagram and Facebook browsers into high-intent buyers.",
    heroDesc:
      "The era of generic stock image ads on Meta is dead. We script, design, and optimize UGC reels, carousel teardowns, and direct-response offers engineered to maximize purchase ROAS and instant WhatsApp inquiries.",
    metricsHighlight: "4.6x Verified ROAS on scaled D2C and consumer campaigns",
    turnaroundTime: "Ad creatives launched in 7 business days",
    suitableFor: [
      "D2C brands selling lifestyle, beauty, apparel, and wellness products",
      "Real estate firms capturing homebuyer leads directly on WhatsApp",
      "Educational institutions and coaching academies",
    ],
    deliverables: [
      { title: "UGC Video Reel Production & Hooks", description: "Direct-response video scripts tested with multiple 3-second hook variations to conquer ad fatigue." },
      { title: "Dynamic Product Ads (DPA) & Retargeting", description: "Recapturing abandoned carts and landing page visitors with tailored objection-handling creatives." },
      { title: "Instant Lead Form & WhatsApp Funnels", description: "Seamless mobile lead generation without forcing prospects to wait for slow external websites." },
      { title: "Conversions API (CAPI) First-Party Tracking", description: "Bypassing iOS privacy restrictions with server-side event tracking for 100% data fidelity." },
    ],
    processSteps: [
      { step: "01", title: "Creative & Audience Matrix", description: "Define key customer avatars, pain points, and design the initial 10-ad creative test batch." },
      { step: "02", title: "CAPI & Pixel Setup", description: "Deploy Meta Conversions API via server-side tagging to ensure accurate purchase tracking." },
      { step: "03", title: "Broad & Lookalike Testing", description: "Test creative variants against broad and custom audiences to find winning low-CPA combinations." },
      { step: "04", title: "Horizontal & Vertical Scaling", description: "Scale budgets profitably while deploying new creative angles to prevent audience fatigue." },
    ],
    faqs: [
      { question: "Can Meta ads generate B2B or high-ticket leads?", answer: "Yes! High-ticket campaigns succeed on Meta by utilizing instant WhatsApp funnels and authority video testimonials that quickly build trust with decision-makers." },
    ],
    relatedCaseStudySlug: "d2c-wellness-brand",
  },
  {
    id: "web-development",
    slug: "web-development",
    category: "Data & Analytics",
    pillarId: "data-analytics",
    title: "High-Converting Next.js 15 Web Applications",
    shortTitle: "Next.js Web Dev",
    tagline: "Sub-Second Speed, Premium Aesthetics, and Architectures Built to Convert",
    shortDesc:
      "A slow site loses 50% of traffic before the headline loads. We build bespoke Next.js 15 web platforms with 95+ PageSpeed scores and seamless mobile UX.",
    heroDesc:
      "We don't build bloated, slow WordPress templates. We engineer bespoke, lightning-fast web applications using Next.js 15, TypeScript, and clean modular CSS. Every layout, typography choice, and CTA is calibrated for measurable lead conversion.",
    metricsHighlight: "0.8s Average load time & +30% higher page conversion rates",
    turnaroundTime: "Custom web platform launched in 3–4 weeks",
    suitableFor: [
      "Brands wanting to replace clunky, slow legacy websites",
      "High-growth startups needing enterprise speed and modern aesthetics",
      "Businesses running heavy PPC campaigns requiring high-speed landing pages",
    ],
    deliverables: [
      { title: "Turnkey Next.js 15 (App Router) Engineering", description: "Modern React architecture with server-side rendering (SSR) and static generation (SSG)." },
      { title: "Sub-Second Page Load Optimization", description: "Guaranteed 90+ Core Web Vitals and PageSpeed scores for superior Google search rankings." },
      { title: "Conversion Rate Optimization (CRO) UX", description: "Frictionless forms, sticky mobile CTAs, and psychological hierarchy that turns visitors into leads." },
      { title: "SEO-Ready Schema & Open Graph Metadata", description: "Built-in dynamic sitemaps, robots rules, canonical tags, and social sharing previews." },
    ],
    processSteps: [
      { step: "01", title: "Strategy & Information Architecture", description: "Wireframe user journeys, conversion funnels, and high-intent landing page layouts." },
      { step: "02", title: "Design System & Brand Visuals", description: "Craft bespoke UI components, modern typography hierarchy, and interactive prototypes." },
      { step: "03", title: "Clean Next.js Engineering", description: "Build cleanly typed components with zero unused dependencies and sub-second load times." },
      { step: "04", title: "QA, Speed Audit & Go-Live", description: "Rigorous cross-device testing, analytics integration, and seamless cloud deployment." },
    ],
    faqs: [
      { question: "Why choose Next.js over traditional WordPress?", answer: "Next.js websites load up to 5x faster than standard WordPress sites, cannot be hacked through vulnerable PHP plugins, and deliver significantly higher Google PageSpeed scores which directly lowers your Google Ads CPC." },
    ],
    relatedCaseStudySlug: "b2b-supply-chain-saas",
  },
  {
    id: "social-media-growth",
    slug: "social-media-growth",
    category: "Earned & Organic",
    pillarId: "earned-media",
    title: "Organic Social Media Growth & Brand Authority",
    shortTitle: "Social Media Growth",
    tagline: "Build a Loyal Following and Turn Engagement into Inbound Client Pipeline",
    shortDesc:
      "We transform your social media from an empty broadcast feed into an inbound customer acquisition channel with viral short-form video reels and high-save carousels.",
    heroDesc:
      "Social media marketing shouldn't just be about posting generic festival greetings. We produce educational carousels, founder-led video reels, and thought leadership content that positions your brand at the forefront of your industry.",
    metricsHighlight: "Average +180% engagement rate and 35% higher follower-to-lead rate",
    turnaroundTime: "Content calendars delivered bi-weekly",
    suitableFor: [
      "Founders and executives building strong personal brands on LinkedIn",
      "Brands wanting consistent, premium Instagram & YouTube presence",
      "Businesses seeking organic reach without paying continuous ad fees",
    ],
    deliverables: [
      { title: "Short-Form Video Reel Scripting & Editing", description: "Hook-driven editing with dynamic captions, sound design, and viral narrative structures." },
      { title: "Carousel Design for High Saves & Shares", description: "Step-by-step educational carousels engineered for maximum Instagram and LinkedIn algorithmic distribution." },
      { title: "Community Management & Lead Triage", description: "Active comment moderation and direct message routing to capture warm inbound sales inquiries." },
      { title: "Monthly Growth & Attribution Analytics", description: "Comprehensive reporting tracking engagement rate, follower velocity, and direct revenue attribution." },
    ],
    processSteps: [
      { step: "01", title: "Brand Voice & Visual Guidelines", description: "Define your distinctive visual identity, narrative pillars, and tone of voice." },
      { step: "02", title: "Bi-Weekly Production Batches", description: "Script, record, and edit high-retention video reels and educational carousels." },
      { step: "03", title: "Multi-Channel Distribution", description: "Schedule posts across Instagram, LinkedIn, YouTube Shorts, and Facebook at peak audience hours." },
    ],
    faqs: [
      { question: "Do you provide video shooting or only editing?", answer: "We provide both! For clients in Mumbai and Navi Mumbai, we offer on-site video production sessions, or we can guide your team with remote scripting and professional post-production editing." },
    ],
  },
  {
    id: "conversion-rate-optimization",
    slug: "conversion-rate-optimization",
    category: "Data & Analytics",
    pillarId: "data-analytics",
    title: "Conversion Rate Optimization (CRO & Funnel Audits)",
    shortTitle: "CRO Funnels",
    tagline: "Double Your Leads from Existing Website Traffic Without Spending More on Ads",
    shortDesc:
      "We deploy heatmaps, session recordings, and multivariate A/B tests to identify drop-off friction points and maximize the percentage of visitors who convert.",
    heroDesc:
      "Before increasing your ad budget, fix the leaks in your funnel. By optimizing button placements, form fields, value propositions, and page speed, CRO systematically lowers your Customer Acquisition Cost (CAC).",
    metricsHighlight: "Average +34% uplift in landing page conversion rates",
    turnaroundTime: "Initial CRO audit delivered within 5 business days",
    suitableFor: [
      "Companies spending ₹1L+/month on ads wanting to squeeze higher ROI",
      "Websites with high traffic but disappointing inquiry volumes",
      "SaaS and e-commerce checkout flows",
    ],
    deliverables: [
      { title: "Comprehensive Funnel Teardown Audit", description: "Heuristic evaluation uncovering UX friction, vague copy, and confusing form inputs." },
      { title: "Heatmap & User Session Analysis", description: "Observing real visitor scroll depth, click rage, and drop-off points using modern analytics tools." },
      { title: "Multivariate A/B Testing Roadmap", description: "Designing and testing alternative headline hooks, trust signals, and CTA buttons." },
      { title: "Mobile Friction Removal", description: "Optimizing thumb-friendly navigation and one-tap WhatsApp contact triggers for mobile visitors." },
    ],
    processSteps: [
      { step: "01", title: "Quantitative & Qualitative Audit", description: "Analyze GA4 drop-off funnels and user session replays to identify core leakages." },
      { step: "02", title: "Hypothesis Formulation", description: "Develop targeted test hypotheses prioritized by impact, confidence, and ease of execution." },
      { step: "03", title: "Variant Deployment & Testing", description: "Build and launch variant pages to split traffic and measure statistically significant outcomes." },
    ],
    faqs: [
      { question: "How much traffic do I need for CRO?", answer: "While websites with 5,000+ monthly visitors gain statistical significance fastest, even smaller sites benefit enormously from qualitative UX improvements and form simplification." },
    ],
  },
  {
    id: "content-marketing",
    slug: "content-marketing",
    category: "Creative",
    pillarId: "creative",
    title: "Direct-Response Copywriting & Authority Content",
    shortTitle: "Authority Copywriting",
    tagline: "Persuasive Copy That Removes Customer Objections and Closes Sales",
    shortDesc:
      "Words that sell. We craft search-optimized long-form playbooks, high-converting landing page sales copy, and automated email nurture sequences.",
    heroDesc:
      "Great copy does not just inform; it systematically changes how your customer perceives value. We craft commercial copy engineered around buyer psychology, objection pre-emption, and clear calls-to-action.",
    metricsHighlight: "3x Longer average time-on-page and higher organic backlink attraction",
    turnaroundTime: "Content packages delivered weekly",
    suitableFor: [
      "Brands needing crisp landing page copy that clearly articulates their competitive edge",
      "Companies launching high-value digital guides and whitepapers",
      "B2B service providers needing strategic nurture emails",
    ],
    deliverables: [
      { title: "Landing Page Sales Copywriting", description: "Headline hooks, problem agitation, solution frameworks, and proof elements that drive action." },
      { title: "SEO-Optimized Editorial Guides", description: "Deep-dive industry playbooks with structured headings, key takeaways, and internal links." },
      { title: "Email Nurture & Welcome Sequences", description: "Multi-email drip sequences that warm up cold prospects and drive repeat inquiries." },
      { title: "Brand Voice Guidelines", description: "Documenting your company's tone, vocabulary, and core messaging rules for all future communications." },
    ],
    processSteps: [
      { step: "01", title: "Customer Interviews & Research", description: "Unpack exact customer phrases, objections, and buying triggers through qualitative research." },
      { step: "02", title: "Drafting & Value Engineering", description: "Write punchy, direct-response copy that hooks readers from the very first line." },
      { step: "03", title: "Review, Polish & Implementation", description: "Fine-tune for readability, scan-ability, and integration into your live web layouts." },
    ],
    faqs: [
      { question: "Do you write copy that is also optimized for SEO?", answer: "Yes! Every piece of content we write balances high-converting direct-response human psychology with semantic keywords for search engines." },
    ],
  },
  {
    id: "influencer-marketing",
    slug: "influencer-marketing",
    category: "Creative",
    pillarId: "creative",
    title: "Influencer Marketing & Vetted Creator Partnerships",
    shortTitle: "Influencer Marketing",
    tagline: "Authentic Creator Endorsements Delivering Real Social Proof and Sales",
    shortDesc:
      "Stop wasting money on creators with fake engagement. We identify, negotiate with, and direct niche creators whose audiences match your buyers.",
    heroDesc:
      "We build influencer campaigns focused on measurable brand uplift and customer acquisition. From micro-influencer product seedings to macro celebrity endorsements across Mumbai and India, we manage everything from brief to post-campaign ROI.",
    metricsHighlight: "2M+ Combined organic impressions across creator collaborations",
    turnaroundTime: "Campaigns planned and launched in 14 days",
    suitableFor: [
      "D2C brands launching new product collections",
      "Lifestyle, beauty, and consumer brands",
      "Events, restaurants, and experiential venues",
    ],
    deliverables: [
      { title: "Creator Authenticity & Audience Vetting", description: "Deep audience auditing to filter out fake followers and verify demographic match." },
      { title: "Campaign Creative Brief & Contract Negotiation", description: "Clear contractual deliverables, usage rights, and performance requirements." },
      { title: "Attribution Tracking Links & Custom Codes", description: "Direct conversion tracking to measure exact revenue generated by each creator." },
      { title: "Multi-Channel Content Amplification", description: "Whitelisting top creator videos as high-performing Meta Partnership Ads." },
    ],
    processSteps: [
      { step: "01", title: "Influencer Selection & Outreach", description: "Curate a tailored roster of creators whose engagement rate and audience demographics align with your goals." },
      { step: "02", title: "Briefing & Content Production", description: "Supply creators with key talking points while preserving their authentic voice." },
      { step: "03", title: "Amplification & Performance Reporting", description: "Review drafts, launch coordinated publishing bursts, and report on verified sales and ROAS." },
    ],
    faqs: [
      { question: "How do you measure influencer campaign ROI?", answer: "We provide each creator with trackable discount codes and UTM parameters, and whitelist winning content through Meta Partnership Ads to track exact cost-per-purchase." },
    ],
  },
];

export function getAllServices(): ServiceItem[] {
  return servicesData;
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}
