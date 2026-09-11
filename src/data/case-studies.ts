import { CaseStudyItem } from "@/types/case-study";

export const caseStudiesData: CaseStudyItem[] = [
  {
    id: "luxury-real-estate-vashi",
    slug: "luxury-real-estate-vashi",
    client: "Signature Palm Beach Developers",
    industry: "Luxury Real Estate",
    location: "Palm Beach Road, Vashi, Navi Mumbai",
    category: "Paid Media",
    headline: "+340% Increase in Qualified Luxury Homebuyer Inquiries with a 38% Drop in CPA",
    summary:
      "How Inventus Global restructured Google Ads and Meta campaigns to generate over ₹18.5 Cr in verified apartment inventory sales for a premier developer in Vashi.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    challenge:
      "The client was spending over ₹2.5 Lakhs per month on generic digital agencies, receiving dozens of irrelevant broker calls and unqualified junk leads. Cost-per-acquisition was escalating while actual site visits dropped by 28%.",
    strategy:
      "We rebuilt the acquisition funnel from the ground up: introducing strict negative audience exclusions, bidding only on high-intent residential search terms, and routing traffic to a bespoke Next.js mobile landing page with instant WhatsApp walkthrough booking.",
    executionSteps: [
      "Audited 12 months of historical ad data to eliminate 400+ negative keyword waste sources.",
      "Engineered an ultra-fast mobile landing page loading in 0.9 seconds with virtual 3D floor plan previews.",
      "Implemented server-side Meta Conversions API and Google Ads enhanced conversions for 100% data tracking.",
      "Launched geo-fenced Meta video ad campaigns targeting high-net-worth professionals in Bandra, BKC, and Navi Mumbai.",
      "Integrated instant WhatsApp CRM routing allowing sales agents to contact prospects within 90 seconds of form submission.",
    ],
    metrics: [
      { label: "Verified Buyer Leads", value: "+340%", subtext: "From 32 to 141 qualified monthly inquiries" },
      { label: "Cost Per Acquisition", value: "-38%", subtext: "CPA dropped from ₹2,400 to ₹1,488 per verified lead" },
      { label: "Inventory Sales Value", value: "₹18.5 Cr+", subtext: "Total residential units closed within 5 months" },
      { label: "Average Page Load Speed", value: "0.9s", subtext: "Down from 5.4s on the client's previous WordPress site" },
    ],
    testimonial: {
      quote:
        "Inventus Global completely changed our perception of digital marketing. Instead of handing us spreadsheets filled with useless impressions, they delivered genuine, high-budget buyers directly to our sales office at Satra Plaza. Our cost per closed unit dropped by nearly 40%.",
      author: "Rajesh Singhania",
      role: "Managing Director",
      company: "Signature Palm Beach Residences",
    },
    servicesProvided: ["Google Ads PPC", "Meta Instagram Ads", "Next.js Landing Page", "WhatsApp CRM Funnel"],
    duration: "6 Months Ongoing",
  },
  {
    id: "d2c-wellness-brand",
    slug: "d2c-wellness-brand",
    client: "PureVeda Ayurveda & Wellness",
    industry: "D2C E-Commerce & Health",
    location: "Mumbai / Pan-India",
    category: "Social Media",
    headline: "Scaling Monthly Revenue from ₹8L to ₹42L at a 4.6x Verified ROAS",
    summary:
      "How direct-response UGC video reels, dynamic product retargeting, and frictionless checkout optimization unlocked 5x revenue growth in 90 days.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    challenge:
      "PureVeda had hit a growth plateau at ₹8L/month. Customer acquisition costs on Facebook and Instagram had spiked due to ad fatigue, generic studio product photography, and high shopping cart abandonment rates.",
    strategy:
      "We transitioned the brand from static graphics to authentic creator-led video reels addressing specific customer pain points (gut health, stress, and skin clarity). We paired this with dynamic cart-abandonment retargeting sequences.",
    executionSteps: [
      "Contracted and directed 15 micro-creators to produce hook-driven video testimonials and unboxing reels.",
      "Tested 45 hook variations within the first 14 days to identify the 3 top-performing creative angles.",
      "Engineered automated WhatsApp cart abandonment reminders with limited-time discount incentives.",
      "Deployed Meta Advantage+ shopping campaigns with server-side first-party purchase attribution.",
    ],
    metrics: [
      { label: "Monthly Gross Revenue", value: "₹42 Lakhs", subtext: "Scaled from ₹8.2L/month in 90 days" },
      { label: "Blended ROAS", value: "4.6x", subtext: "Verified through shopify payment gateway" },
      { label: "Customer Acquisition Cost", value: "-42%", subtext: "Decreased from ₹820 to ₹475 per new buyer" },
      { label: "Abandoned Cart Recovery", value: "+28%", subtext: "Recovered via instant WhatsApp sequences" },
    ],
    testimonial: {
      quote:
        "The team at Inventus Global understands creative direct response better than any agency we have partnered with. Their UGC video strategy stopped our rising ad costs in their tracks and allowed us to comfortably 5x our monthly ad spend while keeping ROAS above 4.5x.",
      author: "Meera Nair",
      role: "Co-Founder & CEO",
      company: "PureVeda Wellness",
    },
    servicesProvided: ["Meta Performance Ads", "UGC Video Production", "WhatsApp Automation", "CRO Funnel Audit"],
    duration: "4 Months Ongoing",
  },
  {
    id: "healthcare-diagnostic-chain",
    slug: "healthcare-diagnostic-chain",
    client: "Apex Multi-Specialty Clinics & Diagnostics",
    industry: "Healthcare & Diagnostics",
    location: "Navi Mumbai (Vashi, Belapur, Kharghar)",
    category: "Organic SEO",
    headline: "#1 Google Rankings for 45+ Commercial Medical Terms & +280% Footfall",
    summary:
      "How systematic local technical SEO, Google Maps 3-Pack optimization, and localized medical schema outranked massive national healthcare aggregators.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    challenge:
      "Apex was struggling to attract local patients against massive venture-backed healthcare platforms like Practo and Apollo that dominated generic search results. Apex had virtually zero organic visibility on Google Maps across their 5 diagnostic centers.",
    strategy:
      "We executed an aggressive hyper-local SEO campaign focusing on local intent queries (e.g. 'MRI scan in Vashi', 'cardiologist in Belapur'). We built structured medical schemas and established a continuous patient review acquisition pipeline.",
    executionSteps: [
      "Standardized NAP (Name, Address, Phone) citations across 60+ healthcare and regional Indian directories.",
      "Implemented MedicalClinic and Physician JSON-LD structured data for rich snippets in Google search.",
      "Created 35 dedicated procedure and symptom landing pages targeting local suburb pin codes.",
      "Optimized Google Business Profiles across all 5 centers, increasing 5-star verified review counts from 42 to 480+.",
    ],
    metrics: [
      { label: "Organic Patient Bookings", value: "+280%", subtext: "Verified via online appointment scheduler" },
      { label: "Top 3 Google Keywords", value: "45 Keywords", subtext: "Outranking national aggregators locally" },
      { label: "Annual Ad Spend Saved", value: "₹14 Lakhs", subtext: "Replaced expensive PPC clicks with free organic traffic" },
      { label: "Google Maps Phone Calls", value: "+310%", subtext: "Direct inbound click-to-call growth" },
    ],
    testimonial: {
      quote:
        "Before Inventus Global, we were spending a fortune on paid search just to get local patients to notice our clinics. Today, our 5 centers rank in the top 3 on Google Maps across Navi Mumbai. Our phone rings every 10 minutes with appointment requests.",
      author: "Dr. Arvind Mehta",
      role: "Chief Medical Officer",
      company: "Apex Healthcare Group",
    },
    servicesProvided: ["Local SEO Navi Mumbai", "Technical SEO Audit", "Schema Implementation", "Reputation Management"],
    duration: "8 Months Ongoing",
  },
  {
    id: "b2b-supply-chain-saas",
    slug: "b2b-supply-chain-saas",
    client: "LogiCore Cold Chain Solutions",
    industry: "B2B Logistics & SaaS",
    location: "Corporate Navi Mumbai / Thane",
    category: "Web Platforms",
    headline: "+190% Increase in Enterprise Demo Bookings via Bespoke Next.js Platform",
    summary:
      "Replacing a slow, outdated 5.2s WordPress site with an ultra-fast Next.js 15 web application featuring interactive ROI calculators and friction-free calendar booking.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    challenge:
      "LogiCore was spending ₹3L/month on LinkedIn ads driving traffic to a WordPress website that took 5.2 seconds to load on mobile. Their bounce rate was an alarming 82%, and prospective enterprise clients routinely dropped off before completing demo requests.",
    strategy:
      "We engineered a bespoke, sub-second Next.js 15 web platform featuring an interactive cold storage energy-savings ROI calculator, clean enterprise typography, and a 2-step meeting booking system.",
    executionSteps: [
      "Designed an editorial, high-contrast B2B design system inspired by leading Silicon Valley SaaS brands.",
      "Engineered the platform with Next.js 15 App Router, achieving a 99/100 Google PageSpeed Score.",
      "Built an interactive client ROI calculator that immediately visualizes annual warehouse cost savings.",
      "Integrated seamless calendar sync with HubSpot and automated meeting confirmations via WhatsApp.",
    ],
    metrics: [
      { label: "Demo Conversion Rate", value: "+190%", subtext: "From 1.8% to 5.2% on ad landing pages" },
      { label: "Average Page Speed", value: "0.8s", subtext: "Down from 5.2s on legacy WordPress" },
      { label: "Pipeline Value Created", value: "₹3.2 Cr", subtext: "Qualified enterprise demo pipeline in 60 days" },
      { label: "Mobile Bounce Rate", value: "-54%", subtext: "Dropped from 82% to 28%" },
    ],
    testimonial: {
      quote:
        "The web platform Inventus Global built for us didn't just make our brand look 10x more premium—it fundamentally solved our pipeline problem. Enterprise logistics directors now book meetings right from their phones in under 30 seconds.",
      author: "Vikram Kulkarni",
      role: "VP of Enterprise Growth",
      company: "LogiCore Supply Chain",
    },
    servicesProvided: ["Next.js 15 Web Engineering", "UI/UX Design System", "Interactive ROI Calculator", "LinkedIn Ads"],
    duration: "3 Months",
  },
];

export function getAllCaseStudies(): CaseStudyItem[] {
  return caseStudiesData;
}

export function getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
  return caseStudiesData.find((c) => c.slug === slug);
}
