import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from './components/Analytics'
import CookieConsent from './components/CookieConsent'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sarnex Digital | Custom Websites for Small Businesses",
  description:
    "Sarnex Digital builds tailored websites for small businesses — custom designs, advanced admin control, built-in SEO, and powerful analytics. Host your site with us.",
  keywords: [
    "Sarnex Digital",
    "custom websites",
    "small business websites",
    "SEO websites",
    "website analytics",
    "Next.js agency",
  ],
  authors: [{ name: "Sarnex Digital", url: "https://sarnexdigital.se" }],
  metadataBase: new URL("https://sarnexdigital.se"),
  openGraph: {
    title: "Sarnex Digital | Custom Websites for Small Businesses",
    description:
      "Tailored websites with full admin control, built-in SEO, and analytics — by Sarnex Digital.",
    url: "https://sarnexdigital.se",
    siteName: "Sarnex Digital",
    images: [
      {
        url: "/DIGITAL.png", // Make sure this image exists in /public
        width: 1200,
        height: 630,
        alt: "Sarnex Digital - Hero Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarnex Digital | Custom Websites for Small Businesses",
    description:
      "Custom-designed websites with complete control and built-in SEO. Launch your small business site with Sarnex Digital.",
    images: ["/DIGITAL.png"],
    creator: "@sarnexdigital", // Optional: replace with your real handle
  },
  /* themeColor: "#0e1c16", */
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head />
      <body className="antialiased bg-brand text-white min-h-screen">
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
