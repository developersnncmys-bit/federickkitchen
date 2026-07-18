import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import MotionShapes from "@/components/MotionShapes";
import { site } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Frederick's Kitchen — Coffee Estate Stay & Fine Dining, Chikmagaluru",
    template: "%s · Frederick's Kitchen",
  },
  description:
    "A working coffee estate in Chikmagaluru with premium rooms, a Malnad kitchen, mapped biker routes off the Western Ghats, and plantation walks. Book direct.",
  keywords: [
    "coffee estate stay Chikmagaluru",
    "biker stay Chikmagaluru",
    "plantation stay Chikmagaluru",
    "fine dining Chikmagaluru",
    "premium rooms Chikmagaluru",
    "Frederick's Kitchen",
    "Mullayanagiri",
    "Baba Budangiri",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: "Frederick's Kitchen — Coffee Estate Stay & Fine Dining, Chikmagaluru",
    description:
      "Premium rooms, a Malnad kitchen, and mapped ridge routes on a working coffee estate in Chikmagaluru.",
    images: ["/images/restaurant-hall.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frederick's Kitchen — Chikmagaluru",
    description:
      "A coffee estate table high in the Western Ghats. Rooms, dining, and ridge routes.",
    images: ["/images/restaurant-hall.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0e0d0b",
  width: "device-width",
  initialScale: 1,
};

/** Rich result for the property — hotel + restaurant in one graph. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Hotel", "Restaurant"],
      "@id": `${site.url}/#business`,
      name: site.name,
      description:
        "A working coffee estate in Chikmagaluru with premium rooms, a Malnad kitchen, mapped biker routes, and plantation walks.",
      url: site.url,
      telephone: site.phone,
      email: site.email,
      servesCuisine: ["Malnad", "Kodava", "South Indian", "Coffee"],
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mullayanagiri Road",
        addressLocality: "Chikmagaluru",
        addressRegion: "Karnataka",
        postalCode: "577101",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 13.3161, longitude: 75.772 },
      amenityFeature: [
        "Coffee plantation walks",
        "Secure covered motorcycle parking",
        "Fine dining restaurant",
        "Valley views",
      ].map((name) => ({ "@type": "LocationFeatureSpecification", name })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}

        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <MotionShapes fixed />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
