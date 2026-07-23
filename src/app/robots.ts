import type { MetadataRoute } from "next";

// TODO: swap in the real production domain once known (see layout.tsx siteUrl).
const siteUrl = "https://emilkarlsson.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
