export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
}

export const teamData: TeamMember[] = [
  {
    name: "Anil Bhambi",
    role: "Founder & Chief Growth Strategist",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "10+ years architecting full-funnel paid advertising campaigns and enterprise digital growth frameworks across India and the Middle East.",
    expertise: ["Google Ads (PPC)", "Meta Performance Funnels", "High-ROAS Bidding", "Growth Strategy"],
  },
  {
    name: "Vishal K",
    role: "Head of Technical SEO & Search Architecture",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Specializes in algorithmic recovery, semantic content clusters, Next.js web performance, and high-authority digital PR.",
    expertise: ["Technical SEO", "AI Search & GEO", "Core Web Vitals", "Next.js Web Platforms"],
  },
  {
    name: "Priya Sharma",
    role: "Creative Director & Social Media Lead",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    bio: "Crafts viral short-form video reels, creator partnerships, and direct-response brand storytelling campaigns that convert.",
    expertise: ["UGC Video Reels", "Direct-Response Copy", "Creator Management", "Brand Identity"],
  },
];
