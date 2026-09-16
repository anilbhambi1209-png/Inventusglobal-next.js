"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Clock,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter",
          email,
          page_url: typeof window !== "undefined" ? window.location.href : "/",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="footer-master-wrapper">
      <div className="container">
        {/* Sleek, Compact Newsletter Strip */}
        <div className="footer-newsletter-bar">
          <div className="footer-nl-left">
            <div className="footer-nl-pill">
              <Sparkles size={13} />
              <span>GROWTH INTELLIGENCE</span>
            </div>
            <h3 className="footer-nl-title">
              Get weekly high-ROAS marketing &amp; web tactics
            </h3>
          </div>

          <div className="footer-nl-right">
            {status === "success" ? (
              <div className="footer-nl-success">
                <CheckCircle2 size={18} />
                <span>Subscribed! Check your inbox for growth playbooks.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-nl-form">
                <div className="footer-nl-input-wrap">
                  <Mail size={16} className="footer-nl-icon" />
                  <input
                    type="email"
                    placeholder="Enter corporate email..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className={`footer-nl-input ${status === "error" ? "error" : ""}`}
                    aria-label="Corporate Email Address"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="footer-nl-btn"
                  >
                    <span>{status === "loading" ? "..." : "Subscribe"}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Compact 4-Column Main Grid */}
        <div className="footer-compact-grid">
          {/* Col 1: Brand */}
          <div className="footer-col-brand">
            <Link href="/" className="footer-logo-link" aria-label="Inventus Global">
              <div className="footer-logo-box">
                <Image
                  src="/inventus-logo.png"
                  alt="Inventus Global Logo"
                  width={116}
                  height={22}
                  className="footer-logo-img"
                  style={{
                    height: "22px",
                    width: "auto",
                    maxWidth: "120px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            </Link>
            <p className="footer-brand-bio">
              Data-driven performance marketing, SEO systems, and modern Next.js web applications engineered for scalable ROI.
            </p>
            <div className="footer-social-row">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a
                href={siteConfig.contact.whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn footer-social-wa"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          {/* Col 2: Growth Solutions */}
          <div className="footer-col-links">
            <div className="footer-col-title">Services</div>
            <ul className="footer-link-list">
              <li>
                <Link href="/services/google-ads-ppc">Google Ads (PPC)</Link>
              </li>
              <li>
                <Link href="/services/search-engine-optimization">Search Engine Optimization</Link>
              </li>
              <li>
                <Link href="/services/local-seo">Local SEO Navi Mumbai</Link>
              </li>
              <li>
                <Link href="/services/nextjs-web-development">Next.js Web Applications</Link>
              </li>
              <li>
                <Link href="/services/meta-ads-instagram">Meta &amp; Instagram Ads</Link>
              </li>
              <li>
                <Link href="/services/influencer-marketing">Influencer Marketing</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="footer-col-links">
            <div className="footer-col-title">Company</div>
            <ul className="footer-link-list">
              <li>
                <Link href="/case-studies">Verified Case Studies</Link>
              </li>
              <li>
                <Link href="/about">About Inventus Global</Link>
              </li>
              <li>
                <Link href="/blog">Articles &amp; Playbooks</Link>
              </li>
              <li>
                <Link href="/contact">Free Growth Consultation</Link>
              </li>
              <li>
                <Link href="/services">All Agency Capabilities</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & HQ */}
          <div className="footer-col-links">
            <div className="footer-col-title">Contact &amp; HQ</div>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <Phone size={14} className="footer-contact-icn" />
                <div className="footer-contact-text">
                  <a href={`tel:${siteConfig.contact.primaryPhoneRaw}`}>{siteConfig.contact.primaryPhone}</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <Mail size={14} className="footer-contact-icn" />
                <div className="footer-contact-text">
                  <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <MapPin size={14} className="footer-contact-icn" />
                <div className="footer-contact-text">
                  {siteConfig.address.full}
                </div>
              </li>
              <li className="footer-contact-item">
                <Clock size={14} className="footer-contact-icn" />
                <div className="footer-contact-text">
                  {siteConfig.hours.days}: {siteConfig.hours.time}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="footer-bottom-strip">
          <div className="footer-copy">
            © {new Date().getFullYear()} <strong>{siteConfig.name}</strong>. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <Link href="/contact">Privacy Policy</Link>
            <span>•</span>
            <Link href="/contact">Terms of Service</Link>
            <span>•</span>
            <Link href="/blog">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
