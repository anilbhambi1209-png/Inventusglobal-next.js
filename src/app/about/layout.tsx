import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Inventus Global - Navi Mumbai Marketing Agency",
  description:
    "Learn about Inventus Global: our history at Satra Plaza, Vashi, our leadership team, and our philosophy of revenue-driven digital growth.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
