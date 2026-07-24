import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "internal-metrics-platform",
    title: "Internal Website & Metrics Management Platform",
    summary:
      "An internal dashboard platform for managing website data, pricing, metrics, filtering workflows and bulk operations.",
    statuses: ["Built", "Internal tool", "In production"],
    problem:
      "Before this platform, IncRev managed website data, pricing and performance metrics in a single massive Excel sheet. It was slow, heavy and almost impossible to keep up to date manually. IncRev needed a single internal system with advanced filtering, bulk operations and export capabilities, gated by role-based access, where metrics stay current automatically via API integrations instead of manual upkeep.",
    stakeholders: [
      "Outreach team — adds new websites to the platform",
      "Pricing/operations — keeps pricing data up to date",
      "Sales team — finds sites for clients",
    ],
    responsibility: [
      "Built and maintained the internal dashboard platform end to end",
      "Developed filtering systems, export functionality and bulk operations",
      "Implemented REST API integrations and database-driven UI components",
      "Designed responsive frontend interfaces focused on usability, performance and scalability",
      "Managed production deployment workflows using GitHub and Vercel",
    ],
    decisions: [
      {
        decision: "Used Firebase Authentication and Firestore as the backend data and auth layer",
        reason:
          "Enabled rapid development, built-in authentication and flexible, schema-less data storage without standing up a full custom backend.",
        alternatives: ["Relational database", "Dedicated search and reporting layer"],
        tradeoffs: [
          "The nested document structure made some bulk operations and reporting more complicated than a relational model would allow.",
        ],
      },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Firebase", "Firestore", "REST APIs", "Vercel", "GitHub"],
    tradeoffs: [
      "Firebase allowed rapid development, authentication and flexible data storage. However, the nested document structure made some bulk operations and reporting more complicated. At greater scale, a relational model or a dedicated search and reporting layer would need to be evaluated.",
    ],
    outcomes: [
      "Replaced a slow, hard-to-maintain Excel sheet with a system where every metric is always up to date via API integrations",
      "Used daily across the company — by outreach, pricing/operations and sales",
      "Saves time for everyone who previously relied on the manual spreadsheet",
      "Makes website and pricing management significantly more scalable",
    ],
    screenshots: [],
  },
];
