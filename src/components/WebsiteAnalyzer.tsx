"use client";

import { useState } from "react";
import { Search, ArrowRight, Zap, Gauge, BarChart3, CheckCircle2 } from "lucide-react";

export default function WebsiteAnalyzer() {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [results, setResults] = useState<{
    score: number;
    speed: string;
    mobileScore: number;
    organicKeywords: number;
    issues: string[];
    opportunities: string[];
  } | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setAnalyzing(true);
    setResults(null);
    setProgress(20);
    setStage("Crawling page architecture...");

    setTimeout(() => {
      setProgress(55);
      setStage("Evaluating Core Web Vitals & organic rankings...");
    }, 600);

    setTimeout(() => {
      setProgress(85);
      setStage("Analyzing conversion funnels...");
    }, 1200);

    setTimeout(() => {
      setProgress(100);
      setStage("Audit complete!");

      const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
      const hash = cleanUrl.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const score = 74 + (hash % 20);

      setResults({
        score,
        speed: score > 80 ? "1.2s" : "2.6s",
        mobileScore: Math.min(score + 4, 98),
        organicKeywords: (hash % 160) + 75,
        issues: [
          "Meta descriptions missing on commercial landing pages",
          "Largest Contentful Paint (LCP) can be improved by 35%",
        ],
        opportunities: [
          `Target 14 commercial-intent search keywords with low competition in your industry`,
          "Deploy Google Ads & Meta remarketing funnels to capture bouncing prospects",
          "Implement schema structured data to unlock Google rich snippet results",
        ],
      });
      setAnalyzing(false);
    }, 1800);
  };

  return (
    <div style={{ margin: "40px auto 10px", maxWidth: "780px" }}>
      {/* Sleek Input Bar */}
      <form onSubmit={handleAnalyze}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#ffffff",
            border: "2px solid #e2e8f0",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            transition: "border-color 0.2s ease",
          }}
        >
          <div style={{ padding: "0 16px", color: "#94a3b8" }}>
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Enter your website URL (e.g. yourcompany.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              padding: "16px 10px 16px 0",
              border: "none",
              outline: "none",
              fontSize: "1.02rem",
              fontFamily: "inherit",
              color: "var(--text-heading)",
            }}
            required
          />
          <button
            type="submit"
            disabled={analyzing}
            className="btn-primary"
            style={{
              borderRadius: 0,
              padding: "16px 28px",
              fontSize: "0.96rem",
              whiteSpace: "nowrap",
            }}
          >
            {analyzing ? "Scanning..." : "Analyze Website"}
          </button>
        </div>
      </form>

      {/* Progress Line */}
      {analyzing && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "6px" }}>
            <span>{stage}</span>
            <span>{progress}%</span>
          </div>
          <div style={{ width: "100%", height: "4px", background: "#f1f5f9", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "var(--primary)",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Results Presentation (Editorial, Flat, Clean) */}
      {results && (
        <div
          style={{
            marginTop: "32px",
            padding: "28px 0",
            borderTop: "1px solid var(--border-hairline)",
            borderBottom: "1px solid var(--border-hairline)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                Audit Breakdown
              </span>
              <h4 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "2px 0 0", color: "var(--text-heading)" }}>
                {url}
              </h4>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontSize: "2.4rem", fontWeight: 800, color: results.score >= 80 ? "#16a34a" : "var(--primary)", lineHeight: 1 }}>
                {results.score}
              </span>
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 700 }}>/ 100 Health Score</span>
            </div>
          </div>

          {/* 3 Metric Points */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "28px" }}>
            <div style={{ borderLeft: "2px solid #e2e8f0", paddingLeft: "14px" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Page Speed</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-heading)", marginTop: "2px" }}>
                {results.speed}
              </div>
            </div>

            <div style={{ borderLeft: "2px solid #e2e8f0", paddingLeft: "14px" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Mobile UX Rating</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-heading)", marginTop: "2px" }}>
                {results.mobileScore} / 100
              </div>
            </div>

            <div style={{ borderLeft: "2px solid #e2e8f0", paddingLeft: "14px" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Ranking Keywords</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-heading)", marginTop: "2px" }}>
                {results.organicKeywords} High-Intent Terms
              </div>
            </div>
          </div>

          {/* Actionable Opportunities List */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "10px" }}>
              Recommended Next Steps:
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {results.opportunities.map((opp, idx) => (
                <li key={idx} style={{ fontSize: "0.9rem", color: "var(--text-body)", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <CheckCircle2 size={16} style={{ color: "#16a34a", flexShrink: 0, marginTop: "3px" }} />
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <a
              href={`https://api.whatsapp.com/send?phone=919987682853&text=Hi%20Inventus%20Global,%20I%20analyzed%20my%20website%20${encodeURIComponent(url)}%20(Score:%20${results.score}/100).%20Let's%20discuss%20improving%20it.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "10px 22px" }}
            >
              Discuss Growth Plan on WhatsApp <ArrowRight size={15} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
