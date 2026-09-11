export interface Milestone {
  year: string;
  title: string;
  desc: string;
  badge: string;
}

export const milestonesData: Milestone[] = [
  {
    year: "2016",
    title: "Founded in Navi Mumbai",
    desc: "Started operations at Satra Plaza, Vashi with a mission to replace vanity marketing metrics with verified client revenue.",
    badge: "Origin",
  },
  {
    year: "2019",
    title: "100+ Campaigns Milestone",
    desc: "Expanded core capabilities into custom high-speed web platforms, enterprise technical SEO, and conversion rate optimization.",
    badge: "Scale",
  },
  {
    year: "2022",
    title: "Server-Side Tracking Engine",
    desc: "Pioneered server-side first-party conversion tracking frameworks ensuring 100% data fidelity despite iOS privacy restrictions.",
    badge: "Innovation",
  },
  {
    year: "2026",
    title: "500+ Clients & ₹18.5 Cr+ Revenue",
    desc: "Recognized as a premier performance marketing and Next.js web engineering agency across Navi Mumbai, Mumbai, and Thane.",
    badge: "Excellence",
  },
];
