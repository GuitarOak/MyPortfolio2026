import type { MetadataRoute } from "next";

// TODO: swap in the real production domain once known (see layout.tsx siteUrl).
const siteUrl = "https://emilkarlsson.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
