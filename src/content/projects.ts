import type { Project } from "./types";

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
];
