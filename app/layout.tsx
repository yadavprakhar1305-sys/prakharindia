import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { LanguageProvider } from "./LanguageProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prakhar India — Manpower and Construction Solutions Across India",
  description:
    "Prakhar India supplies skilled, semi-skilled, and general workers across India and undertakes residential, commercial, industrial, and eligible government construction work.",
  applicationName: "Prakhar India",
  keywords: [
    "manpower supply india",
    "construction company india",
    "skilled workers",
    "labour contractor",
    "residential construction",
    "commercial construction",
  ],
  verification: { google: "lc5jzONqf48BkJpnMOsXDYbIiTdCRteRANJCjCd8YIQ" },
  openGraph: {
    title: "Prakhar India — Manpower and Construction Solutions",
    description:
      "Blueprint to Reality. Manpower deployment and precision construction across India.",
    url: "https://prakharindia.vercel.app/",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏗️</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable}`} style={{ fontFamily: "var(--sans)" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Prakhar India",
              description:
                "Manpower solutions and construction company providing skilled, semi-skilled, and general workers across India. Also undertakes building construction and government contract work.",
              url: "https://prakharindia.vercel.app/",
              telephone: "+91-9044499111",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mirzapur",
                addressRegion: "Uttar Pradesh",
                postalCode: "231001",
                addressCountry: "IN",
              },
            }),
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}