"use client";

import { useState } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: ModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [service, setService] = useState("PPC & Google Ads");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "var(--radius-lg)",
          maxWidth: "480px",
          width: "100%",
          padding: "32px",
          position: "relative",
          boxShadow: "var(--shadow-xl)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            color: "var(--text-muted)",
            padding: "4px",
          }}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#f0fdf4",
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "8px" }}>
              Audit Request Received!
            </h3>
            <p style={{ color: "var(--text-body)", fontSize: "0.92rem", marginBottom: "24px" }}>
              Thank you, {name}. Our senior growth strategist will audit <strong>{website}</strong> and send you a custom breakdown within 24 hours.
            </p>
            <a
              href={`https://api.whatsapp.com/send?phone=919987682853&text=Hi%20Inventus%20Global,%20I%20requested%20an%20audit%20for%20${encodeURIComponent(website)}.%20Looking%20forward%20to%20connecting!`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "12px" }}
            >
              Connect on WhatsApp Instantly <ArrowRight size={16} />
            </a>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  color: "var(--primary)",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "4px",
                }}
              >
                <Sparkles size={14} /> Free Inventus Global Audit
              </span>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-heading)", margin: "0 0 6px" }}>
                Get Your Free 2026 Growth Blueprint
              </h3>
              <p style={{ color: "var(--text-body)", fontSize: "0.88rem", margin: 0 }}>
                We will analyze your competitors, search rankings, and ad strategy. Zero obligation.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "4px" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "4px" }}>
                  Business Email *
                </label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "4px" }}>
                  Website / Brand URL *
                </label>
                <input
                  type="text"
                  placeholder="yourwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "4px" }}>
                  Primary Growth Focus
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="form-select"
                >
                  <option value="PPC & Google Ads">Google & Meta PPC Ads</option>
                  <option value="SEO Rankings">Organic Search (SEO)</option>
                  <option value="Website Redesign">Website Redesign / Web Development</option>
                  <option value="Full Growth Retainer">Full Digital Growth Strategy</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: "0.95rem" }}
              >
                Send Me Free Audit <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
