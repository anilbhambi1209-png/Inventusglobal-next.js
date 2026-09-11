export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  category: "Earned & Organic" | "Paid Media" | "Data & Analytics" | "Creative";
  pillarId: "earned-media" | "paid-media" | "data-analytics" | "creative";
  title: string;
  shortTitle: string;
  tagline: string;
  shortDesc: string;
  heroDesc: string;
  metricsHighlight: string;
  turnaroundTime: string;
  deliverables: ServiceDeliverable[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  suitableFor: string[];
  relatedCaseStudySlug?: string;
}
