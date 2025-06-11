import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sarnex Digital | Skr\u00e4ddarsydda webbplatser f\u00f6r sm\u00e5f\u00f6retag",
  description:
    "Sarnex Digital bygger skr\u00e4ddarsydda webbplatser f\u00f6r sm\u00e5f\u00f6retag – avancerad adminkontroll, inbyggd SEO och kraftfull analys.",
  keywords: [
    "Sarnex Digital",
    "skr\u00e4ddarsydda webbplatser",
    "sm\u00e5f\u00f6retag",
    "SEO",
    "webbplatsanalys",
    "Next.js-byr\u00e5",
  ],
  authors: [{ name: "Sarnex Digital", url: "https://sarnexdigital.se" }],
  metadataBase: new URL("https://sarnexdigital.se"),
  openGraph: {
    title: "Sarnex Digital | Skr\u00e4ddarsydda webbplatser f\u00f6r sm\u00e5f\u00f6retag",
    description:
      "Skr\u00e4ddarsydda webbplatser med full adminkontroll, inbyggd SEO och analys fr\u00e5n Sarnex Digital.",
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
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarnex Digital | Skr\u00e4ddarsydda webbplatser f\u00f6r sm\u00e5f\u00f6retag",
    description:
      "Skr\u00e4ddarsydd design med full kontroll och inbyggd SEO. Lansera ditt sm\u00e5f\u00f6retags webbplats med Sarnex Digital.",
    images: ["/DIGITAL.png"],
    creator: "@sarnexdigital",
  },
  /* themeColor: "#0e1c16", */
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head />
      <body className="antialiased bg-brand text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
