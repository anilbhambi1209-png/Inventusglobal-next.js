import React from "react";
import BottomConversionCta from "@/components/BottomConversionCta";

interface BottomCtaProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export default function BottomCtaSection({
  eyebrow = "Senior Strategy Desk",
  title = "Ready to Accelerate Your Digital Revenue?",
  subtitle = "Connect directly with our senior growth architects at Satra Plaza, Vashi, or explore our proven execution frameworks to unlock your brand's full commercial potential.",
}: BottomCtaProps) {
  return (
    <BottomConversionCta
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
    />
  );
}
