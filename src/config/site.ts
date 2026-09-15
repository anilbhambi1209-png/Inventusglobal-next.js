export const siteConfig = {
  name: "Inventus Global",
  legalName: "Inventus Global Performance Marketing LLP",
  tagline: "Digital Marketing & Growth Agency",
  description:
    "Data-driven digital marketing, Google PPC campaigns, ROI-focused organic SEO, social media marketing, and Next.js web applications in Navi Mumbai.",
  url: "https://inventusglobal.com",
  ogImage: "https://inventusglobal.com/inventus-logo.png",
  contact: {
    primaryPhone: "+91 99876 82853",
    primaryPhoneRaw: "+919987682853",
    secondaryPhone: "+91 98339 60540",
    secondaryPhoneRaw: "+919833960540",
    email: "info@inventusglobal.com",
    whatsappNumber: "919987682853",
    whatsappLink: (message?: string) =>
      `https://api.whatsapp.com/send?phone=919987682853&text=${encodeURIComponent(
        message || "Hi Inventus Global, I would like to discuss scaling our digital marketing."
      )}`,
  },
  address: {
    office: "Office no. 1209, 12th Floor, Satra Plaza",
    landmark: "Sector 19D, Palm Beach Road",
    locality: "Vashi, Navi Mumbai",
    region: "Maharashtra",
    postalCode: "400703",
    country: "India",
    full: "Office no. 1209, 12th Floor, Satra Plaza, Sector 19D, Palm Beach Road, Vashi, Navi Mumbai, Maharashtra 400703",
    mapsUrl: "https://maps.google.com/?q=Satra+Plaza+Vashi+Navi+Mumbai",
  },
  hours: {
    days: "Monday – Saturday",
    time: "10:00 AM – 7:30 PM IST",
    closed: "Sunday",
  },
  socials: {
    instagram: "https://www.instagram.com/globalinventus/",
    facebook: "https://www.facebook.com/people/Inventus-Global/61591748107195/",
    linkedin: "https://www.linkedin.com/company/inventusglobal",
  },
  stats: {
    targetRoas: "4.8x",
    attribution: "100%",
    certified: "Google & Meta",
    clientSatisfaction: "98%",
    experienceYears: "3+",
    // Maintained for backward compatibility
    revenueGenerated: "100%",
    campaignsExecuted: "Google & Meta",
    averageRoas: "4.8x",
    clientRetention: "98%",
  },
  heroHighlights: [
    { value: "4.8x", label: "Target ROAS" },
    { value: "100%", label: "Transparent Attribution" },
    { value: "Google & Meta", label: "Certified" },
    { value: "98%", label: "Client Satisfaction" },
  ],
};

export const servicesList = [
  "Digital Marketing",
  "Web Development",
  "Social Media Marketing",
  "Paid Ad Campaigns",
  "Influencer Marketing",
  "Content Marketing",
  "Email Marketing",
  "SEO",
] as const;

export type ServiceOption = (typeof servicesList)[number];
export type SiteConfig = typeof siteConfig;
