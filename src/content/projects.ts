import type { Project } from "./types";

// Only the Internal Metrics Platform has confirmed real detail (from the CV and
// project.md's own project brief, written by Emil). The other three project
// slots are structural placeholders: never invent problems, decisions,
// trade-offs or results for them. Each carries isPlaceholder + explicit
// TODO markers until real content is supplied.
export const projects: Project[] = [
  {
    slug: "internal-metrics-platform",
    title: "Internal Website & Metrics Management Platform",
    summary:
      "An internal dashboard platform for managing website data, pricing, metrics, filtering workflows and bulk operations.",
    statuses: ["Built", "Internal tool", "In production"],
    problem:
      "IncRev needed a single internal system to manage website data, pricing and performance metrics, with advanced filtering, bulk operations and export capabilities, gated by role-based access. TODO: add specific context on what existed before this platform (manual processes, spreadsheets, disparate tools) and why it became necessary.",
    stakeholders: ["TODO: confirm internal teams / roles who use this platform (e.g. operations, sales, management)."],
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
      "TODO: add the concrete business result or measurable impact of this platform (e.g. time saved, processes replaced, scale of data managed).",
    ],
    screenshots: [],
  },
  {
    slug: "custom-wordpress-platform",
    title: "Custom WordPress Platform",
    summary: "TODO: one-line summary of the real WordPress project once details are supplied.",
    statuses: ["Content pending"],
    isPlaceholder: true,
    problem: "TODO: describe the real problem this project solved.",
    stakeholders: ["TODO: confirm users/stakeholders."],
    responsibility: ["TODO: list real responsibilities (e.g. Figma-to-Gutenberg translation, reusable blocks)."],
    decisions: [
      {
        decision: "TODO: real technical decision",
        reason: "TODO: real reasoning",
      },
    ],
    technologies: ["WordPress", "Gutenberg"],
    tradeoffs: ["TODO: real trade-offs made on this project."],
    outcomes: ["TODO: real result or business impact."],
    screenshots: [],
  },
  {
    slug: "analytics-integration-project",
    title: "Analytics and Integration Project",
    summary: "TODO: one-line summary once the recruitment-tracking (or equivalent) project details are supplied.",
    statuses: ["Content pending"],
    isPlaceholder: true,
    problem: "TODO: describe the real problem (e.g. tracking, third-party systems, region-based audience logic).",
    stakeholders: ["TODO: confirm users/stakeholders."],
    responsibility: ["TODO: list real responsibilities on this integration work."],
    decisions: [
      {
        decision: "TODO: real technical decision",
        reason: "TODO: real reasoning",
      },
    ],
    technologies: ["TODO: confirm exact tools (e.g. GTM, Meta Pixel)"],
    tradeoffs: ["TODO: real trade-offs."],
    outcomes: ["TODO: real result or business impact."],
    screenshots: [],
  },
  {
    slug: "technical-seo-performance-project",
    title: "Technical SEO & Performance Project",
    summary: "TODO: one-line summary once a specific diagnosis/performance project is confirmed.",
    statuses: ["Content pending"],
    isPlaceholder: true,
    problem: "TODO: describe the real technical diagnosis (rendering, performance, structured data, tracking).",
    stakeholders: ["TODO: confirm users/stakeholders."],
    responsibility: ["TODO: list real responsibilities on this project."],
    decisions: [
      {
        decision: "TODO: real technical decision",
        reason: "TODO: real reasoning",
      },
    ],
    technologies: ["TODO: confirm exact tools"],
    tradeoffs: ["TODO: real trade-offs and business-vs-technical prioritisation."],
    outcomes: ["TODO: real result or business impact."],
    screenshots: [],
  },
];
