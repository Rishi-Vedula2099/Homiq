import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Homiq — Luxury Real Estate, Curated by AI",
  description:
    "Discover curated luxury properties powered by AI insights. Premium real estate listings with 3D walkthroughs, smart recommendations, and intelligent market analysis across India.",
  keywords: [
    "luxury real estate",
    "premium property",
    "AI real estate",
    "3D property viewer",
    "India luxury homes",
    "penthouse",
    "villa",
    "smart home",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
