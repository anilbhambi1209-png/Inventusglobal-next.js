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
    revenueGenerated: "₹18.5 Cr+",
    campaignsExecuted: "500+",
    averageRoas: "3.8x",
    clientRetention: "98%",
    experienceYears: "10+",
  },
};

export type SiteConfig = typeof siteConfig;
