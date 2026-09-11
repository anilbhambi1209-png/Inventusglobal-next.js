export interface MetricResult {
  label: string;
  value: string;
  subtext: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  client: string;
  industry: string;
  location: string;
  category: "Paid Media" | "Organic SEO" | "Social Media" | "Web Platforms";
  headline: string;
  summary: string;
  image: string;
  challenge: string;
  strategy: string;
  executionSteps: string[];
  metrics: MetricResult[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  servicesProvided: string[];
  duration: string;
}
