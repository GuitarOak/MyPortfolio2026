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
    screenshots: ["/metricssystem.png"],
  },
  {
    slug: "link-proposal-workflow-system",
    title: "Link Proposal Workflow System",
    summary:
      "An internal workflow system for managing link-building proposal requests, from automated draft generation through review, revision and final sales approval.",
    statuses: ["Internal tool", "Paused"],
    problem:
      "Sales needed a reliable way to request client link proposals and have them produced, reviewed and approved, without relying on spreadsheets or informal handoffs between sales, team leads and back office. Proposals could originate as fully automated drafts, fully manual work, or a hybrid of both, and the system needed to keep status, responsibility and revision history unambiguous at every stage so nothing could end up in an impossible or unaccountable state.",
    stakeholders: [
      "Sales — creates requests, reviews proposals and gives the only final approval",
      "Team Leader (Back Office) — assigns production work and performs internal review",
      "Back Office employees — produce and revise proposal versions",
    ],
    responsibility: [
      "Designed the domain model and workflow logic end to end, before implementation began",
      "Split the system into separate Proposal Request, Proposal, Proposal Version and Export Record/Audit Event layers instead of one flat object, specifically to avoid impossible states and broken workflow transitions",
      "Defined request, proposal and generation statuses as three separate, non-overlapping state machines",
      "Designed the ownership model (responsible user vs. assigned producer) so responsibility is always explicit and visible",
      "Designed the versioning and audit-trail requirements so approved versions are immutable and every edit, approval, rejection and export is traceable",
      "Selected and scoped the tech stack (Next.js, TypeScript, Firebase, Cloud Functions, TanStack Query, React Hook Form, Zod)",
    ],
    decisions: [
      {
        decision:
          "Modeled the system as four separate entities (Proposal Request, Proposal, Proposal Version, Export Record) instead of a single flat workflow object",
        reason:
          "A flat object couldn't cleanly represent auto-generated drafts, human edits, rejection loops, multiple approval stages and immutable approved versions at the same time without producing invalid or contradictory states.",
        alternatives: ["Single flat proposal object mutated in place through its lifecycle"],
        tradeoffs: [
          "More entities and relations to model and query, in exchange for far fewer invalid state combinations and a much clearer audit trail.",
        ],
      },
      {
        decision: "Tracked generation status (technical) separately from workflow status (business)",
        reason:
          "Auto-generation progress (not started, generating, ready, failed, insufficient results) is process metadata, not a business decision — conflating the two would have made both harder to reason about and displayed incorrectly in the UI.",
      },
      {
        decision: "Made approved proposal versions immutable, requiring a new version for any later change",
        reason:
          "Sales, as the only final approver, needed certainty that what was approved could never silently change later — any revision after approval creates a new version with a parent link instead of mutating the approved one.",
      },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Firebase Authentication",
      "Firestore",
      "Cloud Functions",
      "TanStack Query",
      "React Hook Form",
      "Zod",
    ],
    tradeoffs: [
      "Splitting the domain into four separate entities added modelling and query complexity compared to a single flat object, but was necessary to support revision loops, multiple approval stages and immutable approved versions without impossible states.",
    ],
    outcomes: [
      "Core workflow, role permissions, status model and versioning/audit-trail design were fully specified and largely implemented",
      "Development was paused before reaching production when my role at the company ended",
    ],
    screenshots: [],
  },
];
