"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Building2,
  MapPin,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ScrollContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // Exact 5 Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Check sessionStorage and direct link triggers on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Direct link query or hash triggers (?popup=contact, #proposal, #audit)
      const params = new URLSearchParams(window.location.search);
      const hasDirectQuery =
        params.get("popup") === "contact" ||
        params.get("popup") === "true" ||
        params.get("audit") === "true" ||
        params.get("proposal") === "true";
      const hasDirectHash =
        window.location.hash === "#proposal" ||
        window.location.hash === "#audit" ||
        window.location.hash === "#contact-popup" ||
        window.location.hash === "#get-proposal";

      if (hasDirectQuery || hasDirectHash) {
        setIsOpen(true);
      } else {
        const dismissed = sessionStorage.getItem("inventus_popup_dismissed");
        if (dismissed === "true") {
          setHasDismissed(true);
        }
      }

      // Event listener for in-page button triggers
      const handleCustomOpen = () => setIsOpen(true);
      window.addEventListener("open-contact-popup", handleCustomOpen);

      const handleHashChange = () => {
        if (
          window.location.hash === "#proposal" ||
          window.location.hash === "#audit" ||
          window.location.hash === "#contact-popup" ||
          window.location.hash === "#get-proposal"
        ) {
          setIsOpen(true);
        }
      };
      window.addEventListener("hashchange", handleHashChange);

      return () => {
        window.removeEventListener("open-contact-popup", handleCustomOpen);
        window.removeEventListener("hashchange", handleHashChange);
      };
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setHasDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("inventus_popup_dismissed", "true");
    }
  }, []);

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Scroll observer: triggers smoothly between Phase 02 and Phase 03
  useEffect(() => {
    if (hasDismissed) return;

    const target = document.getElementById("case-study-spotlight");
    if (!target) return;

    let timer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasDismissed) {
            timer = setTimeout(() => {
              if (sessionStorage.getItem("inventus_popup_dismissed") !== "true") {
                setIsOpen(true);
              }
            }, 600);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [hasDismissed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("inventus_popup_dismissed", "true");
      }
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="simple-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="simple-modal-title"
    >
      <div className="simple-modal-card">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="simple-modal-close-btn"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="simple-modal-success">
            <div className="simple-modal-success-icon">
              <CheckCircle2 size={38} />
            </div>

            <h3 className="simple-modal-success-title">
              Proposal Request Received!
            </h3>

            <p className="simple-modal-success-desc">
              Thank you, <strong>{fullName}</strong>. We have received your request for <strong>{businessName}</strong> ({location}). Our growth team will reach out at <strong>{phone}</strong> / <strong>{email}</strong> within 4 business hours.
            </p>

            <div className="simple-modal-success-actions">
              <a
                href={siteConfig.contact.whatsappLink(
                  `Hi Inventus Global, my name is ${fullName} from ${businessName} (${location}). I just requested a growth proposal. Let's connect!`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="simple-modal-wa-btn"
              >
                <MessageCircle size={17} />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="simple-modal-dismiss-btn"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="simple-modal-header">
              <div className="simple-modal-badge">
                <span className="simple-modal-pulse-dot" />
                <span>FREE GROWTH PROPOSAL</span>
              </div>

              <h2 id="simple-modal-title" className="simple-modal-title">
                Get Your Free <span className="gradient-text">Growth Proposal</span>
              </h2>

              <p className="simple-modal-subtitle">
                Fill in these 5 quick details and our team will get in touch within 4 hours.
              </p>
            </div>

            {/* Form with exactly the 5 requested fields */}
            <form onSubmit={handleSubmit} className="simple-modal-form">
              {/* Row 1: Full Name & Phone Number */}
              <div className="simple-modal-grid">
                <div className="simple-modal-field">
                  <label htmlFor="modal-name" className="simple-modal-label">
                    <User size={13} className="text-orange" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="simple-modal-input"
                  />
                </div>

                <div className="simple-modal-field">
                  <label htmlFor="modal-phone" className="simple-modal-label">
                    <Phone size={13} className="text-orange" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    placeholder="+91 99876 82853"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="simple-modal-input"
                  />
                </div>
              </div>

              {/* Row 2: Email ID & Business Name */}
              <div className="simple-modal-grid">
                <div className="simple-modal-field">
                  <label htmlFor="modal-email" className="simple-modal-label">
                    <Mail size={13} className="text-orange" />
                    <span>Email ID *</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="simple-modal-input"
                  />
                </div>

                <div className="simple-modal-field">
                  <label htmlFor="modal-business" className="simple-modal-label">
                    <Building2 size={13} className="text-orange" />
                    <span>Business Name *</span>
                  </label>
                  <input
                    id="modal-business"
                    type="text"
                    required
                    placeholder="Company name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="simple-modal-input"
                  />
                </div>
              </div>

              {/* Row 3: Location */}
              <div className="simple-modal-field">
                <label htmlFor="modal-location" className="simple-modal-label">
                  <MapPin size={13} className="text-orange" />
                  <span>Location *</span>
                </label>
                <input
                  id="modal-location"
                  type="text"
                  required
                  placeholder="e.g. Vashi, Navi Mumbai / Mumbai"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="simple-modal-input"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="simple-modal-submit-btn"
              >
                <span>{isSubmitting ? "Submitting..." : "Submit Proposal Request"}</span>
                <ArrowRight size={16} />
              </button>

              {/* Micro Trust Proof */}
              <div className="simple-modal-footer-proof">
                <ShieldCheck size={13} className="text-orange" />
                <span>100% Free &amp; Confidential • 4-Hour Response • Satra Plaza, Vashi</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
