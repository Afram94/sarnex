import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "./components/Analytics";
import CookieConsent from "./components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* -----------------------------------------------------------------------
   SEO / social metadata
   -------------------------------------------------------------------- */
export const metadata = {
  /* <title> — keep it ≤ 60 chars */
  title: "Sarnex Digital | Webbdesign & SEO för Småföretag",

  /* <meta name="description"> */
  description:
    "Skräddarsydda, snabba och SEO-optimerade hemsidor för småföretag i Sverige – byggda med Next.js av Sarnex Digital.",

  /* Google ignores this tag for ranking, but it won’t hurt */
  keywords: [
    "Sarnex Digital",
    "custom website design for small business",
    "affordable web design sweden",
    "SEO-optimized websites",
    "sökmotoroptimerad hemsida",
    "responsiv webbdesign",
    "professional website development",
    "billig webbdesign",

    /* Stockholm */
    "web design stockholm",
    "small business websites stockholm",
    "webbdesign stockholm småföretag",
    "hemsida småföretag stockholm",

    /* Norrköping */
    "web design norrköping",
    "webbdesign norrköping företag",

    /* Östergötland */
    "web design östergötland",
    "hemsida företag östergötland",
  ],

  authors: [{ name: "Sarnex Digital", url: "https://sarnexdigital.se" }],
  metadataBase: new URL("https://sarnexdigital.se"),

  /* Open Graph for Facebook / LinkedIn */
  openGraph: {
    title: "Sarnex Digital | Webbdesign & SEO för Småföretag",
    description:
      "Tailored, fast-loading and SEO-ready websites built with Next.js for Sweden’s small-business owners.",
    url: "https://sarnexdigital.se",
    siteName: "Sarnex Digital",
    images: [
      {
        url: "https://sarnexdigital.se/DIGITAL.png",
        width: 1200,
        height: 630,
        alt: "Sarnex Digital – social preview",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },

  /* Twitter cards */
  twitter: {
    card: "summary_large_image",
    title: "Sarnex Digital | Webbdesign & SEO för Småföretag",
    description:
      "Snabba, skräddarsydda hemsidor med full kontroll och inbyggd SEO. Starta din företagswebb med Sarnex Digital.",
    images: ["https://sarnexdigital.se/DIGITAL.png"],
    creator: "@sarnexdigital",
  },
};

export default function RootLayout({ children }) {
  return (
    /* Switch to “en” if most copy is English */
    <html lang="sv" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />

        {/* ---------------------------------------------------------------
          *  Basic Organization schema (add address/phone when available)
          * ------------------------------------------------------------ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sarnex Digital",
              url: "https://sarnexdigital.se",
              logo: "https://sarnexdigital.se/S.png",
            }),
          }}
        />
      </head>

      <body className="antialiased bg-brand text-white min-h-screen">
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
