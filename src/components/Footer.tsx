"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 500);
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
                <img
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
                href="https://www.instagram.com/globalinventus/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://www.facebook.com/people/Inventus-Global/61591748107195/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/inventusglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919987682853&text=Hi%20Inventus%20Global,%20I%20would%20like%20to%20connect%20with%20your%20growth%20team."
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
                <Link href="/services?service=seo">Search Engine Optimization</Link>
              </li>
              <li>
                <Link href="/services?service=smm">Social Media Marketing</Link>
              </li>
              <li>
                <Link href="/services?service=webdev">Next.js Web Development</Link>
              </li>
              <li>
                <Link href="/services?service=ppc">Google &amp; Meta Ads (PPC)</Link>
              </li>
              <li>
                <Link href="/services?service=influencer">Influencer Marketing</Link>
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
                <Link href="/contact">Free Growth Audit</Link>
              </li>
              <li>
                <Link href="/admin" style={{ color: "#f16334" }}>Admin Portal</Link>
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
                  <a href="tel:+919987682853">+91 99876 82853</a>
                  <span className="footer-sep">/</span>
                  <a href="tel:+919833960540">+91 98339 60540</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <Mail size={14} className="footer-contact-icn" />
                <div className="footer-contact-text">
                  <a href="mailto:info@inventusglobal.com">info@inventusglobal.com</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <MapPin size={14} className="footer-contact-icn" />
                <div className="footer-contact-text">
                  1209, Satra Plaza, Palm Beach Rd, Vashi, Navi Mumbai 400703
                </div>
              </li>
              <li className="footer-contact-item">
                <Clock size={14} className="footer-contact-icn" />
                <div className="footer-contact-text">
                  Mon – Sat: 10:00 AM – 7:30 PM IST
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="footer-bottom-strip">
          <div className="footer-copy">
            © {new Date().getFullYear()} <strong>Inventus Global</strong>. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <Link href="/contact">Privacy</Link>
            <span>•</span>
            <Link href="/contact">Terms</Link>
            <span>•</span>
            <Link href="/blog">Sitemap</Link>
            <span>•</span>
            <Link href="/admin" style={{ color: "#f16334" }}>Staff</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
