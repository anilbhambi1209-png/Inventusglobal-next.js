"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Target,
  CheckCircle2,
  ArrowRight,
  HeartHandshake,
  TrendingUp,
  Eye,
  Lightbulb,
  Handshake,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { teamData } from "@/data/team";
import { milestonesData } from "@/data/milestones";
import BottomConversionCta from "@/components/BottomConversionCta";
import styles from "./About.module.css";

export default function AboutPage() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const checklistItems = [
    "100% Transparent, Real-Time ROAS & Revenue Reporting",
    "Custom Performance Strategies Tailored to Your Specific Margins",
    "Direct Access to Senior Growth Architects, Never Junior Trainees",
    "Server-Side Conversion Infrastructure (Meta CAPI, GA4 First-Party)",
  ];

  const standardItems = [
    {
      icon: <Target size={22} />,
      title: "Precision Commercial Intent",
      desc: "We focus marketing budget strictly on prospects actively searching with purchasing intent, eliminating informational click waste.",
    },
    {
      icon: <TrendingUp size={22} />,
      title: "Conversion Rate Architecture",
      desc: "Traffic without high-converting landing funnels is wasted ad spend. We engineer sub-second Next.js pages that convert.",
    },
    {
      icon: <HeartHandshake size={22} />,
      title: "True Partnership Mindset",
      desc: "We grow only when our clients scale profitably. That is why our long-term client retention exceeds 98%.",
    },
  ];

  const coreValues = [
    {
      icon: <Eye size={26} />,
      title: "Radical Transparency",
      desc: "Every rupee of your ad spend is tracked, attributed, and visible in real-time dashboards. No vanity metrics, no hidden fees — only verifiable revenue impact.",
    },
    {
      icon: <Handshake size={26} />,
      title: "Growth Partnership",
      desc: "We don't just execute campaigns — we embed ourselves in your business model. Our success is measured only by your profitable growth.",
    },
    {
      icon: <Lightbulb size={26} />,
      title: "Relentless Innovation",
      desc: "From server-side tracking to AI-powered bidding, we deploy cutting-edge technology before it becomes mainstream — giving you an unfair advantage.",
    },
  ];

  const statsData = [
    { value: siteConfig.stats.experienceYears, label: "Agency Experience" },
    { value: siteConfig.stats.attribution, label: "Transparent Attribution" },
    { value: siteConfig.stats.targetRoas, label: "Target Campaign ROAS" },
    { value: siteConfig.stats.clientSatisfaction, label: "Client Satisfaction" },
  ];

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════
          HERO — IMMERSIVE DARK CINEMATIC
          ═══════════════════════════════════════════════════════ */}
      <section className={styles.heroSection}>
        {/* Decorative overlays */}
        <div className={styles.heroGrid} />
        <div className={styles.heroAmbient} />
        <div className={styles.heroAmbientSecondary} />
        <div className={styles.heroHorizon} />

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroTag}>
            <span className={styles.heroPulseDot} />
            About Inventus Global
          </div>

          <h1 className={styles.heroTitle}>
            We Replace Marketing Vanity Metrics with{" "}
            <span className={styles.heroTitleAccent}>Real Bank Revenue.</span>
          </h1>

          <p className={styles.heroDesc}>
            Founded at Satra Plaza, Vashi, Inventus Global was built on a single
            conviction: marketing should never be an expense line item — it must
            be an accountable, revenue-generating engine.
          </p>

          {/* Glassmorphic Stats Strip */}
          <div className={styles.heroStats}>
            {statsData.map((stat) => (
              <div key={stat.label} className={styles.heroStatCard}>
                <div className={styles.heroStatValue}>{stat.value}</div>
                <div className={styles.heroStatLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STORY & PHILOSOPHY
          ═══════════════════════════════════════════════════════ */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            {/* Left Column — Story */}
            <div ref={addRevealRef} className={styles.reveal}>
              <span className={styles.storyTag}>Our Story &amp; Philosophy</span>
              <h2 className={styles.storyTitle}>
                Built by Practitioners, Not Sales Pitchers
              </h2>
              <p className={styles.storyText}>
                Too many agencies promise &quot;brand buzz&quot; and deliver
                monthly reports full of impressions and social likes while client
                revenue stays flat. At Inventus Global, we operate differently.
              </p>
              <p className={styles.storyText}>
                Every strategy we deploy — from a high-intent Google Ads PPC ad
                group to an enterprise Next.js web application — is engineered to
                attract qualified inquiries, lower customer acquisition costs,
                and maximize net profit margins.
              </p>

              <div className={styles.checkList}>
                {checklistItems.map((text, i) => (
                  <div
                    key={text}
                    ref={addRevealRef}
                    className={`${styles.checkItem} ${styles.reveal} ${
                      styles[`revealDelay${i + 1}` as keyof typeof styles] || ""
                    }`}
                  >
                    <div className={styles.checkIcon}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span className={styles.checkText}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Standards Card */}
            <div ref={addRevealRef} className={`${styles.standardsCard} ${styles.reveal}`}>
              <h3 className={styles.standardsTitle}>
                The Inventus Global Standard
              </h3>
              <div className={styles.standardsList}>
                {standardItems.map((item) => (
                  <div key={item.title} className={styles.standardItem}>
                    <div className={styles.standardIcon}>{item.icon}</div>
                    <div>
                      <h4 className={styles.standardItemTitle}>{item.title}</h4>
                      <p className={styles.standardItemDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CORE VALUES — DARK STRIP
          ═══════════════════════════════════════════════════════ */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div ref={addRevealRef} className={`${styles.valuesHeader} ${styles.reveal}`}>
            <div className={styles.valuesTag}>
              <span className={styles.heroPulseDot} />
              What Drives Us
            </div>
            <h2 className={styles.valuesTitle}>
              Principles That Power Every Campaign
            </h2>
            <p className={styles.valuesDesc}>
              Three non-negotiable values that guide every strategy, campaign,
              and client relationship at Inventus Global.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {coreValues.map((value, i) => (
              <div
                key={value.title}
                ref={addRevealRef}
                className={`${styles.valueCard} ${styles.reveal} ${
                  styles[`revealDelay${i + 1}` as keyof typeof styles] || ""
                }`}
              >
                <div className={styles.valueIconWrap}>{value.icon}</div>
                <h3 className={styles.valueCardTitle}>{value.title}</h3>
                <p className={styles.valueCardDesc}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LEADERSHIP TEAM
          ═══════════════════════════════════════════════════════ */}
      <section className={styles.teamSection}>
        <div className="container">
          <div ref={addRevealRef} className={`${styles.teamHeader} ${styles.reveal}`}>
            <span className={styles.teamTag}>Leadership Team</span>
            <h2 className={styles.teamTitle}>
              Meet the Minds Driving Your Growth
            </h2>
            <p className={styles.teamDesc}>
              Senior performance marketers, search architects, and creative
              directors committed to scaling your brand.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {teamData.map((member, i) => (
              <div
                key={member.name}
                ref={addRevealRef}
                className={`${styles.teamCard} ${styles.reveal} ${
                  styles[`revealDelay${i + 1}` as keyof typeof styles] || ""
                }`}
              >
                <div className={styles.teamImageWrap}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={300}
                    className={styles.teamImage}
                  />
                  <div className={styles.teamImageOverlay} />
                </div>
                <div className={styles.teamCardBody}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <div className={styles.teamRole}>{member.role}</div>
                  <p className={styles.teamBio}>{member.bio}</p>
                  <div className={styles.teamTags}>
                    {member.expertise.map((skill) => (
                      <span key={skill} className={styles.teamSkillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          JOURNEY / TIMELINE
          ═══════════════════════════════════════════════════════ */}
      <section className={styles.journeySection}>
        <div className="container">
          <div ref={addRevealRef} className={`${styles.journeyHeader} ${styles.reveal}`}>
            <span className={styles.journeyTag}>Our Journey</span>
            <h2 className={styles.journeyTitle}>
              A Decade of Measurable Results
            </h2>
            <p className={styles.journeyDesc}>
              From our first office in Vashi to managing multi-crore ad
              portfolios and high-converting Next.js platforms.
            </p>
          </div>

          <div className={styles.timeline}>
            {milestonesData.map((m, i) => (
              <div
                key={m.year}
                ref={addRevealRef}
                className={`${styles.timelineItem} ${styles.reveal} ${
                  styles[`revealDelay${i + 1}` as keyof typeof styles] || ""
                }`}
              >
                <div className={styles.timelineDot} />
                <div className={styles.timelineCard}>
                  <div className={styles.timelineYearRow}>
                    <span className={styles.timelineYear}>{m.year}</span>
                    <span className={styles.timelineBadge}>{m.badge}</span>
                  </div>
                  <h3 className={styles.timelineCardTitle}>{m.title}</h3>
                  <p className={styles.timelineCardDesc}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.ctaCenter}>
            <Link href="/services" className={styles.ctaButton}>
              <span>Explore All Capabilities</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Section */}
      <BottomConversionCta
        badge="SCALE WITH INVENTUS GLOBAL"
        subBadge="Direct Senior Growth Intake"
      />
    </div>
  );
}
