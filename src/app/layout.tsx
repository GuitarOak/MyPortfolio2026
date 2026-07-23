import type { Metadata } from "next";
import { Rock_Salt, Geist_Mono, Caveat } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Rock Salt (bold marker font) is reserved for headings and the Hero
// subheading only — too dense/heavy for long-form reading, per legibility
// feedback. See globals.css for the h1-h6 override.
const handwrittenFont = Rock_Salt({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Geist Mono powers all regular body copy now (see globals.css --font-sans),
// for the technical/blueprint look. Caveat is kept only for the sparse
// handwritten annotation accents (font-pencil): section-number labels,
// "Read more" links, placeholder text — used sparingly, not for body copy.
const pencilFont = Caveat({
  variable: "--font-pencil",
  subsets: ["latin"],
  weight: "600",
});

// TODO: replace with the real production domain once known, so metadataBase,
// canonical URLs, sitemap.ts and robots.ts resolve to absolute URLs correctly.
const siteUrl = "https://emilkarlsson.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.seo.title,
  description: site.seo.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: siteUrl,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${handwrittenFont.variable} ${geistMono.variable} ${pencilFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
