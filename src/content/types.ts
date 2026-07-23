// Shared content types for the portfolio.
// Keeping content typed and separate from UI components makes it easy to
// reuse project cards, add case-study pages later, and keep structure consistent.

export type ArchitectureDecision = {
  decision: string;
  reason: string;
  alternatives?: string[];
  tradeoffs?: string[];
};

export type ProjectStatus =
  | "Built"
  | "Deployed"
  | "Internal tool"
  | "Integration"
  | "Case study"
  | "In production"
  | "Content pending";

export type Project = {
  slug: string;
  title: string;
  /** Short one-line summary shown in the project card. */
  summary: string;
  statuses: ProjectStatus[];
  /** True when real content has not been supplied yet. Renders visible TODO labels instead of invented specifics. */
  isPlaceholder?: boolean;
  problem: string;
  stakeholders?: string[];
  responsibility: string[];
  decisions: ArchitectureDecision[];
  technologies: string[];
  tradeoffs?: string[];
  outcomes: string[];
  screenshots?: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  dates: string;
  points: string[];
};

export type CapabilityGroup = {
  title: string;
  items: string[];
};
