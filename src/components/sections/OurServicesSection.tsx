import React from "react";
import Link from "next/link";
import {
  Target,
  Search,
  Code2,
  Share2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import { servicesData } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import styles from "./OurServicesSection.module.css";

const serviceIcons: Record<string, React.ReactNode> = {
  "google-ads-ppc": <Target size={22} />,
  "search-engine-optimization": <Search size={22} />,
  "web-development": <Code2 size={22} />,
  "meta-ads": <Share2 size={22} />,
  "conversion-rate-optimization": <TrendingUp size={22} />,
  "local-seo": <Zap size={22} />,
};

export default function OurServicesSection() {
  // Select top 6 flagship services for homepage display
  const flagshipServices = servicesData.slice(0, 6);

  return (
    <section className={styles.section} id="services">
      <div className="container">
        <SectionHeader
          eyebrow="Proven Growth Capabilities"
          eyebrowIcon={<Sparkles size={14} />}
          title="Engineered For Predictable Leads & Scalable ROI"
          accentWord="Predictable Leads"
          subtitle="We combine commercial-intent paid traffic, top-ranking organic SEO systems, and Next.js web applications to turn marketing from a cost center into a growth engine."
        />

        <div className={styles.grid}>
          {flagshipServices.map((service) => {
            const icon = serviceIcons[service.id] || <Target size={22} />;
            return (
              <div key={service.id} className={styles.serviceCard}>
                <div>
                  <div className={styles.topRow}>
                    <div className={styles.iconBox}>{icon}</div>
                    <Badge variant="primary">{service.category}</Badge>
                  </div>

                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.desc}>{service.shortDesc}</p>
                </div>

                <div>
                  <div className={styles.metricBadge}>
                    <span>✓ {service.metricsHighlight}</span>
                  </div>

                  <div className={styles.cardFooter}>
                    <Link href={`/services/${service.slug}`} className={styles.learnMore}>
                      <span>Explore Service Strategy</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.bottomHubCta}>
          <Button href="/services" variant="outline" size="lg">
            <span>Explore All 36 Specialized Capabilities</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
