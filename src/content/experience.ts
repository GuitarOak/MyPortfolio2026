import type { CapabilityGroup, ExperienceEntry } from "./types";

// Sourced directly from Emil's CV. Kept as a compact timeline per project.md.
export const experience: ExperienceEntry[] = [
  {
    company: "IncRev",
    role: "Frontend Developer / Technical SEO",
    dates: "August 2024 – Present",
    points: [
      "Built and maintained internal web applications and dashboard systems using Next.js, React, TypeScript and Firebase",
      "Developed scalable frontend workflows including advanced filtering, export functionality, bulk operations, REST API integrations and database-driven UI components",
      "Designed responsive frontend interfaces focused on usability, performance, scalability and operational efficiency",
      "Managed production deployment workflows using GitHub and Vercel while improving frontend performance, technical SEO and Core Web Vitals",
      "Collaborated across technical and commercial workflows to improve internal systems and digital operations",
    ],
  },
];

// Verbatim from project.md's Capabilities section — the user's own
// self-vetted list of what they can discuss confidently in an interview.
export const capabilities: CapabilityGroup[] = [
  {
    title: "Application Development",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Responsive interfaces",
      "Accessible interfaces",
      "WordPress",
      "Gutenberg",
    ],
  },
  {
    title: "Systems and Architecture",
    items: [
      "Requirements analysis",
      "API integrations",
      "Data modelling",
      "Authentication",
      "Roles and permissions",
      "Technical documentation",
      "Architecture decisions",
      "Technical trade-offs",
      "System flows",
    ],
  },
  {
    title: "Delivery and Operations",
    items: [
      "Git",
      "Branching workflows",
      "Pull requests",
      "CI/CD",
      "Vercel",
      "Testing",
      "Accessibility",
      "Performance",
      "Technical SEO",
    ],
  },
];
