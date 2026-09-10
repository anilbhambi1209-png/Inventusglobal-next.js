"use client";

import { useState } from "react";
import { Calculator, ArrowRight, TrendingUp, DollarSign, Users, Target } from "lucide-react";

export default function RoiCalculator() {
  const [adSpend, setAdSpend] = useState<number>(75000); // ₹75,000 / mo
  const [customerValue, setCustomerValue] = useState<number>(15000); // ₹15,000
  const [conversionRate, setConversionRate] = useState<number>(3.2); // 3.2%

  // Realistic estimates
  const estimatedCostPerClick = 35; // ₹35 avg CPC in India
  const clicks = Math.round(adSpend / estimatedCostPerClick);
  const leads = Math.round(clicks * (conversionRate / 100));
  const closedDeals = Math.round(leads * 0.22); // 22% lead-to-close rate
  const projectedRevenue = closedDeals * customerValue;
  const roas = adSpend > 0 ? (projectedRevenue / adSpend).toFixed(1) : "0";

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-lg)",
        padding: "36px",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 32px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--primary)",
            fontSize: "0.82rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "6px",
          }}
        >
          <Calculator size={15} /> Campaign ROI Estimator
        </span>
        <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-heading)", margin: "4px 0 8px" }}>
          Calculate Your Projected Return on Ad Spend
        </h3>
        <p style={{ color: "var(--text-body)", fontSize: "0.94rem", margin: 0 }}>
          Adjust the sliders below to see your potential revenue, lead volume, and ROAS with Inventus Global.
        </p>
      </div>

      <div className="roi-grid">
        {/* Sliders Column */}
        <div>
          {/* Slider 1: Monthly Ad Spend */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-heading)" }}>
                Monthly Ad Spend:
              </label>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)" }}>
                ₹{adSpend.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="500000"
              step="5000"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--primary)", height: "6px", cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
              <span>₹20,000</span>
              <span>₹5,00,000</span>
            </div>
          </div>

          {/* Slider 2: Average Customer / Deal Value */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-heading)" }}>
                Avg. Customer / Deal Value:
              </label>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>
                ₹{customerValue.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="100000"
              step="1000"
              value={customerValue}
              onChange={(e) => setCustomerValue(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--primary)", height: "6px", cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
              <span>₹2,000</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          {/* Slider 3: Landing Page Conversion Rate */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-heading)" }}>
                Target Funnel Conversion:
              </label>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>
                {conversionRate}%
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="7.0"
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--primary)", height: "6px", cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
              <span>1.0% (Average)</span>
              <span>7.0% (Optimized)</span>
            </div>
          </div>
        </div>

        {/* Projected Results Card */}
        <div
          style={{
            background: "#fffaf7",
            border: "2px solid #fed7aa",
            borderRadius: "var(--radius-md)",
            padding: "28px",
          }}
        >
          <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "1px" }}>
            Projected Monthly Growth
          </span>

          <div style={{ margin: "16px 0 24px" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Projected Gross Revenue</div>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--text-heading)", lineHeight: 1.1 }}>
              ₹{projectedRevenue.toLocaleString("en-IN")}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            <div style={{ background: "#ffffff", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Estimated Leads</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)" }}>
                {leads}+ / mo
              </div>
            </div>

            <div style={{ background: "#ffffff", padding: "12px", borderRadius: "6px", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Estimated ROAS</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#16a34a" }}>
                {roas}x ROAS
              </div>
            </div>
          </div>

          <a
            href={`https://api.whatsapp.com/send?phone=919987682853&text=Hi%20Inventus%20Global,%20I%20used%20your%20ROI%20Calculator%20with%20an%20ad%20budget%20of%20₹${adSpend.toLocaleString("en-IN")}.%20Can%20we%20schedule%20a%20strategy%20session?`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "12px" }}
          >
            Claim This ROI Strategy <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
