export interface JobPosition {
  id: number | string;
  title: string;
  slug: string;
  department: string;
  type: string; // e.g. "Full-Time", "Part-Time", "Internship", "Contract"
  location: string; // e.g. "Vashi, Navi Mumbai (On-Site)"
  experience: string; // e.g. "2+ Years Experience"
  salary: string; // e.g. "Competitive + Performance Bonus"
  description: string;
  requirements: string[];
  is_active: number | boolean;
  created_at?: string;
  updated_at?: string;
}

export interface JobFormData {
  title: string;
  slug?: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string; // Textarea separated by newlines
  is_active: boolean | number;
}

export interface JobApplication {
  id: number | string;
  job_id?: number | null;
  role_applied: string;
  full_name: string;
  email: string;
  phone: string;
  experience: string;
  portfolio: string;
  status: 'new' | 'reviewing' | 'contacted' | 'rejected';
  created_at: string;
}
