import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Inventus Global | Digital Marketing & Growth Agency",
  description:
    "Data-driven digital marketing, Google PPC campaigns, ROI-focused organic SEO, and web development in Navi Mumbai.",
  openGraph: {
    title: "Inventus Global | Digital Marketing & Growth Agency",
    description:
      "Data-driven digital marketing, Google PPC campaigns, ROI-focused organic SEO, and web development in Navi Mumbai.",
    url: "https://inventusglobal.com",
    siteName: "Inventus Global",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Inventus Global",
    image: "https://inventusglobal.com/inventus-logo.png",
    "@id": "https://inventusglobal.com",
    url: "https://inventusglobal.com",
    telephone: "+91 99876 82853",
    email: "info@inventusglobal.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office no. 1209, 12th Floor, Satra Plaza, Sector 19D, Palm Beach Road",
      addressLocality: "Vashi, Navi Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400703",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      opens: "10:00",
      closes: "19:30"
    },
    sameAs: [
      "https://www.instagram.com/globalinventus/",
      "https://www.facebook.com/people/Inventus-Global/61591748107195/",
      "https://www.linkedin.com/company/inventusglobal"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
