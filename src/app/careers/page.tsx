"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Send,
  Zap,
  Award,
  Users,
  Building2,
  TrendingUp,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { JobPosition } from "@/types/career";
import styles from "./careers.module.css";

const defaultPositions: JobPosition[] = [
  {
    id: "ppc-specialist",
    title: "Senior Performance Marketing Manager",
    slug: "senior-performance-marketing-manager",
    department: "Paid Media",
    type: "Full-Time",
    location: "Vashi, Navi Mumbai (On-Site)",
    experience: "3+ Years Experience",
    salary: "Competitive + Performance Bonus",
    description:
      "Lead high-budget Google Ads and Meta campaign architectures. Optimize ROAS, manage CPA thresholds, and build automated negative keyword funnels.",
    requirements: [
      "Proven track record managing ₹5L+ monthly ad spend",
      "Expertise in Google Ads (Search, PMax, Shopping) & Meta Ads",
      "Strong understanding of GA4, GTM, and server-side tracking",
      "Ability to analyze CVR, CTR, CAC, and LTV metrics",
    ],
    is_active: 1,
  },
  {
    id: "seo-strategist",
    title: "SEO & Growth Content Strategist",
    slug: "seo-growth-content-strategist",
    department: "Earned & Organic",
    type: "Full-Time",
    location: "Vashi, Navi Mumbai (On-Site)",
    experience: "2+ Years Experience",
    salary: "Competitive Retainer + Performance Perks",
    description:
      "Architect semantic topic clusters, technical Core Web Vitals audits, and generative AI search (GEO) optimization engines for high-growth brands.",
    requirements: [
      "Hands-on experience with Ahrefs, SEMrush, Screaming Frog, and Search Console",
      "Deep technical SEO knowledge (schema, canonicals, site architecture)",
      "Proven ability to scale organic traffic for competitive B2B or D2C niches",
      "Experience in content direction and direct-response copywriting",
    ],
    is_active: 1,
  },
  {
    id: "nextjs-developer",
    title: "Full-Stack Next.js 15 Web Engineer",
    slug: "fullstack-nextjs-web-engineer",
    department: "Data & Engineering",
    type: "Full-Time",
    location: "Vashi, Navi Mumbai (On-Site / Hybrid)",
    experience: "2+ Years Experience",
    salary: "Industry Leading",
    description:
      "Build ultra-fast Next.js 15 web applications, headless landing funnels, and CRM integrations tailored for maximum conversion rates.",
    requirements: [
      "Proficiency in React 19, Next.js (App Router), TypeScript, and Tailwind CSS",
      "Strong understanding of server components, API routes, and web speed optimization",
      "Experience integrating REST APIs, webhooks, and analytics scripts",
      "Eye for modern design aesthetics, micro-animations, and responsive layouts",
    ],
    is_active: 1,
  },
  {
    id: "creative-director",
    title: "Short-Form Video & UGC Creative Director",
    slug: "shortform-video-creative-director",
    department: "Creative Studio",
    type: "Full-Time",
    location: "Vashi, Navi Mumbai (On-Site)",
    experience: "1+ Years Experience",
    salary: "Attractive Stipend + Revenue Share",
    description:
      "Script, direct, and edit scroll-stopping short-form video reels, TikTok/Instagram ad creatives, and high-converting UGC campaigns.",
    requirements: [
      "Proficiency in Premiere Pro, CapCut, or DaVinci Resolve",
      "Understanding of direct-response hook mechanics in the first 3 seconds",
      "Portfolio of high-performing social video ad creatives",
      "Strong storytelling skills and visual aesthetics",
    ],
    is_active: 1,
  },
];

export default function CareersPage() {
  const [openPositions, setOpenPositions] = useState<JobPosition[]>(defaultPositions);
  const [selectedRole, setSelectedRole] = useState<string>("Senior Performance Marketing Manager");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [experience, setExperience] = useState("2-4 years");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        if (data.success && data.jobs && data.jobs.length > 0) {
          setOpenPositions(data.jobs);
          setSelectedRole(data.jobs[0].title);
        }
      } catch (err) {
        console.error("Failed to load live jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role_applied: selectedRole,
          full_name: fullName,
          email,
          phone,
          experience,
          portfolio,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || "Failed to submit application.");
      }
    } catch (err: any) {
      setSubmitError("Network error. Please try submitting again.");
    } finally {
      setSubmitting(false);
    }
  };

  const perks = [
    {
      icon: <TrendingUp className={styles.perkIcon} size={24} />,
      title: "Performance Incentives",
      desc: "Direct profit-sharing & bonus incentives on target lead/ROAS milestones.",
    },
    {
      icon: <Zap className={styles.perkIcon} size={24} />,
      title: "Latest AI Tooling",
      desc: "Unrestricted access to top-tier AI stack, analytics tools, and automated pipelines.",
    },
    {
      icon: <Building2 className={styles.perkIcon} size={24} />,
      title: "Prime Vashi Office",
      desc: "Work out of our modern office in Satra Plaza, Vashi with great food & connectivity.",
    },
    {
      icon: <Users className={styles.perkIcon} size={24} />,
      title: "Fast Career Trajectory",
      desc: "Zero bureaucracy. High autonomy with clear pathways to leadership roles.",
    },
  ];

  return (
    <div className={styles.careersPageWrap}>
      {/* Hero Section */}
      <section className={styles.careersHeroSection}>
        <div className="container">
          <div className={styles.careersHeroContent}>
            <span className="section-tag">CAREERS AT INVENTUS GLOBAL</span>
            <h1 className={styles.careersHeroTitle}>
              Build the Future of <span className="gradient-text">Digital Growth</span> With Us
            </h1>
            <p className={styles.careersHeroSubtitle}>
              We are a high-octane growth agency headquartered in Satra Plaza, Vashi, Navi Mumbai. 
              We partner with ambitious enterprises to scale revenue through performance ads, organic search, and Next.js platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Perks & Culture Grid */}
      <section className={styles.careersPerksSection}>
        <div className="container">
          <div className={styles.careersPerksHeader}>
            <h2 className={styles.careersPerksHeading}>Why High Performers Join Inventus Global</h2>
            <p className={styles.careersPerksSub}>A culture engineered for rapid skill mastery, autonomy, and tangible business impact.</p>
          </div>
          <div className={styles.careersPerksGrid}>
            {perks.map((perk, i) => (
              <div key={i} className={styles.careersPerkCard}>
                <div className={styles.perkIconWrap}>{perk.icon}</div>
                <h3 className={styles.perkTitle}>{perk.title}</h3>
                <p className={styles.perkDesc}>{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section className={styles.careersPositionsSection} id="open-roles">
        <div className="container">
          <div className={styles.careersPositionsHeader}>
            <span className="section-tag">WE ARE HIRING</span>
            <h2 className={styles.careersPositionsTitle}>Open Job Opportunities</h2>
            <p className={styles.careersPositionsDesc}>Explore current full-time & hybrid openings at our Satra Plaza, Vashi office.</p>
          </div>

          <div className={styles.careersRolesList}>
            {openPositions.map((pos) => (
              <div key={pos.id} className={styles.careerRoleCard}>
                <div className={styles.roleMainInfo}>
                  <div className={styles.roleHeaderTop}>
                    <span className={styles.roleDepartment}>{pos.department}</span>
                    <span className={styles.roleTypeBadge}>{pos.type}</span>
                  </div>
                  <h3 className={styles.roleTitle}>{pos.title}</h3>
                  <div className={styles.roleMetaPills}>
                    <span className={styles.metaPill}><MapPin size={14} /> {pos.location}</span>
                    <span className={styles.metaPill}><Briefcase size={14} /> {pos.experience}</span>
                    <span className={styles.metaPill}><Award size={14} /> {pos.salary}</span>
                  </div>
                  <p className={styles.roleDesc}>{pos.description}</p>
                  
                  <div className={styles.roleReqs}>
                    <h4 className={styles.reqsHeading}>Key Requirements:</h4>
                    <ul className={styles.reqsList}>
                      {pos.requirements.map((req, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={15} className={styles.reqCheck} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.roleCtaBox}>
                  <a
                    href="#apply-form"
                    onClick={() => setSelectedRole(pos.title)}
                    className={styles.btnApplyRole}
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Application Form Section */}
      <section className={styles.careersApplySection} id="apply-form">
        <div className="container">
          <div className={styles.careersApplyCard}>
            <div className={styles.careersApplyInfo}>
              <span className="section-tag">FAST-TRACK APPLICATION</span>
              <h2 className={styles.applyHeading}>Ready to Accelerate Your Career?</h2>
              <p className={styles.applySub}>
                Fill out the quick form below or send your resume & portfolio directly to{" "}
                <a href="mailto:careers@inventusglobal.com" className={styles.applyEmailLink}>careers@inventusglobal.com</a>.
              </p>
              
              <div className={styles.applyOfficeBox}>
                <h4 className={styles.officeTitle}>Corporate Headquarters</h4>
                <p className={styles.officeText}>{siteConfig.address.full}</p>
                <p className={styles.officeTiming}>Operating Hours: Mon–Sat (10:00 AM – 7:30 PM)</p>
              </div>
            </div>

            <div className={styles.careersFormContainer}>
              {submitted ? (
                <div className={styles.careersSuccessBox}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3>Application Submitted Successfully!</h3>
                  <p>Thank you, <strong>{fullName}</strong>. Our recruiting lead will review your application and contact you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className={styles.btnSubmitAnother}>
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.careersForm}>
                  <h3 className={styles.formTitle}>Apply Now</h3>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Position Applying For *</label>
                    <select
                      className={styles.formInput}
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      required
                    >
                      {openPositions.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                      <option value="General Application">General Application / Other</option>
                    </select>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Full Name *</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        placeholder="e.g. Rahul Verma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email Address *</label>
                      <input
                        type="email"
                        className={styles.formInput}
                        placeholder="rahul@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Phone Number *</label>
                      <input
                        type="tel"
                        className={styles.formInput}
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Years of Experience</label>
                      <select
                        className={styles.formInput}
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      >
                        <option value="Fresher / < 1 year">Fresher / &lt; 1 year</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="2-4 years">2-4 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>LinkedIn / Portfolio Link</label>
                    <input
                      type="url"
                      className={styles.formInput}
                      placeholder="https://linkedin.com/in/username or portfolio link"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                    />
                  </div>

                  {submitError && (
                    <div style={{ padding: "10px 14px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "8px", color: "#ef4444", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                      <AlertCircle size={16} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={styles.btnSubmitApplication}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
