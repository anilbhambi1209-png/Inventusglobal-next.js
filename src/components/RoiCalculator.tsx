"use client";

import { useState } from "react";
import { Calculator, ArrowRight, TrendingUp, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";
import styles from "./RoiCalculator.module.css";

export default function RoiCalculator() {
  const [adSpend, setAdSpend] = useState<number>(75000); // ₹75,000 / mo
  const [customerValue, setCustomerValue] = useState<number>(15000); // ₹15,000
  const [conversionRate, setConversionRate] = useState<number>(3.2); // 3.2%

  // Real-world performance assumptions for Indian commercial PPC
  const estimatedCostPerClick = 35;
  const clicks = Math.round(adSpend / estimatedCostPerClick);
  const leads = Math.round(clicks * (conversionRate / 100));
  const closedDeals = Math.round(leads * 0.22); // 22% lead-to-close rate
  const projectedRevenue = closedDeals * customerValue;
  const roas = adSpend > 0 ? (projectedRevenue / adSpend).toFixed(1) : "0";

  const waMessage = `Hi Inventus Global, I used your ROI Calculator with a budget of ₹${adSpend.toLocaleString(
    "en-IN"
  )}/mo (Projected ROAS: ${roas}x). I would like to discuss a custom growth roadmap.`;

  return (
    <div className={styles.calculatorCard}>
      <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 36px" }}>
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
        <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-heading)", margin: "4px 0 8px" }}>
          Calculate Your Projected Return on Ad Spend
        </h3>
        <p style={{ color: "var(--text-body)", fontSize: "0.95rem", margin: 0 }}>
          Adjust the sliders below to see your potential revenue, lead volume, and verified ROAS with Inventus Global.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Sliders Column */}
        <div>
          {/* Slider 1: Monthly Ad Spend */}
          <div className={styles.sliderGroup}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderLabel}>Monthly Ad Spend:</span>
              <span className={styles.sliderValue}>₹{adSpend.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min={25000}
              max={500000}
              step={5000}
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className={styles.rangeInput}
              aria-label="Monthly Ad Spend"
            />
          </div>

          {/* Slider 2: Average Customer Value */}
          <div className={styles.sliderGroup}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderLabel}>Average Customer Value / Deal Size:</span>
              <span className={styles.sliderValue}>₹{customerValue.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min={2000}
              max={150000}
              step={1000}
              value={customerValue}
              onChange={(e) => setCustomerValue(Number(e.target.value))}
              className={styles.rangeInput}
              aria-label="Average Customer Value"
            />
          </div>

          {/* Slider 3: Target Conversion Rate */}
          <div className={styles.sliderGroup}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderLabel}>Target Landing Page Conversion Rate:</span>
              <span className={styles.sliderValue}>{conversionRate}%</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={8.0}
              step={0.1}
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className={styles.rangeInput}
              aria-label="Landing Page Conversion Rate"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className={styles.resultsPanel}>
          <div className={styles.roasBox}>
            <div className={styles.roasNumber}>{roas}x</div>
            <div className={styles.roasLabel}>Estimated Return on Ad Spend (ROAS)</div>
          </div>

          <div className={styles.breakdownGrid}>
            <div>
              <div className={styles.statVal}>{leads}</div>
              <div className={styles.statLabel}>Est. Monthly Leads</div>
            </div>
            <div>
              <div className={styles.statVal}>{closedDeals}</div>
              <div className={styles.statLabel}>Est. Closed Deals</div>
            </div>
            <div>
              <div className={styles.statVal}>₹{(projectedRevenue / 100000).toFixed(1)}L</div>
              <div className={styles.statLabel}>Gross Revenue</div>
            </div>
          </div>

          <Button
            href={siteConfig.contact.whatsappLink(waMessage)}
            external
            variant="whatsapp"
            size="md"
            fullWidth
          >
            <MessageCircle size={16} />
            <span>Discuss This Plan on WhatsApp</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
