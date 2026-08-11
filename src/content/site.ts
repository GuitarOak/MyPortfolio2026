export const nav = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const site = {
  name: "Emil Karlsson",
  title: "User-Centric Developer",
  supportingText:
    "I design and build digital platforms, internal tools and integrations that turn business requirements into maintainable technical solutions.",
  techRow: ["TypeScript", "React", "Node.js", "APIs", "Firebase", "WordPress"],
  contact: {
    email: "emil.h.karlsson@gmail.com",
    linkedin: "https://www.linkedin.com/in/emil-karlsson-web/",
    github: "https://github.com/GuitarOak",
    location: "Jönköping, Sweden",
    preference: "Hybrid",
    cvHref: "/cv-emil-karlsson.pdf",
  },
  seo: {
    title: "Emil Karlsson | Developer with a Systems Perspective",
    description:
      "Portfolio of Emil Karlsson, a developer focused on digital platforms, integrations, internal tools and solution architecture.",
  },
};
