# Portfolio Website Brief

## Goal

Build a modern one-page portfolio website that positions me primarily as:

* A developer
* A future solutions architect
* Someone who understands systems, integrations, business requirements and technical delivery

The portfolio should feel more like a technical specification combined with a premium editorial website than a typical developer portfolio.

The site must not overstate my current experience. It should demonstrate architectural thinking through real projects, technical decisions, diagrams, trade-offs and business context.

---

## Core Positioning

Primary title:

**Developer with a systems perspective**

Supporting text:

> I design and build digital platforms, internal tools and integrations that turn business requirements into maintainable technical solutions.

The positioning should emphasize the overlap between:

* Software development
* Systems thinking
* Integrations
* Technical problem-solving
* Business understanding
* Stakeholder communication

Avoid vague phrases such as:

* “I create digital experiences”
* “Let’s build something amazing”
* “Passionate developer”

---

## Recommended Tech Stack

Use:

* Next.js
* React
* TypeScript
* Tailwind CSS
* GSAP
* Vercel
* GitHub

Optional:

* MDX or structured TypeScript objects for project content
* GitHub Actions for validation
* Lighthouse CI
* Accessibility testing

Vercel should handle preview deployments and production deployment.

Recommended workflow:

1. Create feature branch
2. Open pull request
3. Run linting, TypeScript validation and production build
4. Generate Vercel preview deployment
5. Merge into `main`
6. Automatically deploy to production

Do not create an unnecessarily complex CI/CD setup.

---

## Site Structure

The website should be one-page first, with the option to add individual case-study pages later.

Main navigation:

* Work
* Capabilities
* Experience
* About
* Contact

Use a sticky navigation bar with active-section highlighting.

---

# Sections

## 1. Hero

The hero must immediately communicate:

* Who I am
* What I do
* What kind of roles I am targeting

Content:

**Emil Karlsson**

**Developer with a systems perspective**

> I design and build digital platforms, internal tools and integrations that turn business requirements into maintainable technical solutions.

Primary CTA:

* View selected work

Secondary CTA:

* Download CV

Optional technology row:

`TypeScript · React · Node.js · APIs · Firebase · WordPress`

Do not emphasize GSAP, Vercel or CI/CD in the hero. These are implementation tools, not the main value proposition.

---

## 2. Selected Work

This should be the strongest and largest section.

Include approximately four projects.

Each project must explain:

* The problem
* The users or stakeholders
* My responsibility
* What I built or changed
* Important technical decisions
* Technologies used
* Trade-offs
* Result or business impact
* Screenshots, diagrams or code where possible

Recommended projects:

### Internal Website Metrics Platform

Demonstrates:

* React application architecture
* Firebase and Firestore
* Authentication
* Roles and permissions
* External API integrations
* Data modelling
* Bulk operations
* Excel exports
* Internal business-process automation

### Custom WordPress Platform

Demonstrates:

* Translating Figma designs into a maintainable website
* Gutenberg development
* Reusable blocks and components
* Content-management requirements
* Responsive implementation
* Working with non-technical editors
* Technical trade-offs

### Analytics and Integration Project

Possible example: recruitment tracking implementation.

Demonstrates:

* Third-party systems
* Embedded content
* URL parameters
* GTM
* Meta Pixel
* Event tracking
* Region-based audience logic
* Working with systems I did not originally build

### Technical SEO or Performance Project

Demonstrates:

* Technical diagnosis
* Rendering and performance issues
* Structured data
* Tracking
* Prioritisation
* Business-versus-technical trade-offs

Do not make link building or general SEO the main focus of the portfolio.

---

## 3. How I Solve Problems

Use a four-step process.

### Understand

Clarify:

* The business problem
* The users
* Existing systems
* Constraints
* Success criteria

### Design

Define:

* Requirements
* Responsibilities
* Data flows
* Integrations
* Technical choices
* Trade-offs

### Build

Develop:

* Maintainable components
* Clear interfaces
* Appropriate architecture
* Responsive and accessible functionality

### Operate

Handle:

* Testing
* Deployment
* Monitoring
* Maintenance
* Iterative improvements

---

## 4. Architecture Case Study

Include one dedicated architecture-focused section based on the internal platform.

Suggested diagram:

```text
React frontend
      ↓
Express API layer
      ↓
External APIs
      ↓
Firebase Authentication
      ↓
Firestore database
```

Explain:

* What problem the architecture solved
* Why each technology was chosen
* Which alternatives were considered
* What limitations exist
* What would need to change at greater scale

Example architectural reflection:

> Firebase allowed rapid development, authentication and flexible data storage. However, the nested document structure made some bulk operations and reporting more complicated. At greater scale, I would evaluate a relational model or a dedicated search and reporting layer.

The purpose is to demonstrate that I understand both the strengths and limitations of my own solutions.

---

## 5. Capabilities

Use the heading **Capabilities**, not “Skills.”

### Application Development

* TypeScript
* JavaScript
* React
* Next.js
* Node.js
* Express
* Responsive interfaces
* Accessible interfaces
* WordPress
* Gutenberg

### Systems and Architecture

* Requirements analysis
* API integrations
* Data modelling
* Authentication
* Roles and permissions
* Technical documentation
* Architecture decisions
* Technical trade-offs
* System flows

### Delivery and Operations

* Git
* Branching workflows
* Pull requests
* CI/CD
* Vercel
* Testing
* Accessibility
* Performance
* Technical SEO

Only include capabilities I can discuss confidently in an interview.

---

## 6. Experience

Use a compact timeline.

Each role should include:

* Company
* Role
* Dates
* Two to four meaningful responsibilities or outcomes

The experience section should show progression toward technical ownership and systems work.

Focus on:

* Building internal tools
* Improving digital platforms
* Working with integrations
* Translating business needs into technical requirements
* Managing technical and commercial projects
* Working directly with stakeholders
* Coordinating delivery
* Solving operational problems with software

Avoid making the experience section primarily about link building.

---

## 7. About

Use a short, coherent career narrative.

Suggested copy:

> My background is in SEO, digital growth and client-facing work. Over time, I increasingly moved toward the technical problems behind the results—building internal tools, improving web platforms, connecting systems and translating operational needs into software.

> That combination has shaped how I work today: I care about the code, but also about the system around it, the people using it and the business problem it is supposed to solve.

Optional personal detail:

* Guitar
* Creativity
* Interest in building useful things

Keep personal content secondary to the professional positioning.

---

## 8. Contact

Suggested text:

> I am looking for developer, application specialist and junior solution-architecture roles where I can combine hands-on implementation with systems thinking and technical ownership.

Include:

* Email
* LinkedIn
* GitHub
* Downloadable CV
* Location
* Remote or hybrid preference

A contact form is optional.

---

# Visual Direction

The design should feel:

* Minimal
* Bold
* Structured
* Modern
* Technical
* Editorial
* Professional

Use:

* Large typography
* Strong grid
* Minimal colour palette
* Generous spacing
* Clean project screenshots
* System diagrams
* Technical annotations
* Section numbers
* Subtle grid lines
* Small status labels

Possible labels:

* Built
* Deployed
* Internal tool
* Integration
* Case study
* In production

Suggested section-heading format:

`01 / Selected Work`

Avoid:

* Neon cyberpunk styling
* Terminal introductions
* Excessive gradients
* Floating 3D objects
* Custom cursors that reduce usability
* Animation-heavy loading screens
* Scroll hijacking

---

# Animation Guidelines

Use GSAP sparingly.

Good animation ideas:

* Hero text reveal
* Subtle section entrances
* Image masking
* Project transitions
* Active navigation changes
* Small diagram animations
* Scroll-triggered technical annotations

Avoid:

* Animating every element
* Long entrance sequences
* Hiding content before animation completes
* Excessive parallax
* Scroll hijacking
* Constant floating elements

The website must remain fully usable without animation.

Support:

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable or simplify animations */
}
```

Build the complete static version before adding GSAP.

---

# Content Architecture

Store project data separately from the UI.

Example:

```ts
type ArchitectureDecision = {
  decision: string;
  reason: string;
  alternatives?: string[];
  tradeoffs?: string[];
};

type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  responsibility: string[];
  decisions: ArchitectureDecision[];
  technologies: string[];
  outcomes: string[];
  screenshots?: string[];
};
```

This makes it easier to:

* Reuse project cards
* Add individual case-study pages
* Keep content separate from presentation
* Maintain consistent structure

---

# Performance and Accessibility

The site should target:

* Strong Lighthouse scores
* Responsive layout
* Semantic HTML
* Keyboard navigation
* Clear focus states
* Accessible colour contrast
* Optimised images
* Minimal JavaScript where possible
* Reduced-motion support
* Proper heading hierarchy

Use server-rendered content where appropriate.

Animations must not block access to content.

---

# SEO and Metadata

Include:

* Unique page title
* Meta description
* Open Graph metadata
* Twitter/X metadata
* Canonical URL
* Favicon
* Structured data where relevant
* Sitemap
* Robots file

Suggested title:

> Emil Karlsson | Developer with a Systems Perspective

Suggested meta description:

> Portfolio of Emil Karlsson, a developer focused on digital platforms, integrations, internal tools and solution architecture.

---

# Development Order

## Phase 1: Content

Before coding, prepare:

1. Four projects
2. The problem each project solved
3. My exact contribution
4. One or more technical decisions
5. Trade-offs
6. Results
7. Screenshots or diagrams
8. Public links or GitHub repositories where allowed

## Phase 2: Static Build

Build:

1. Global layout
2. Navigation
3. Hero
4. Selected projects
5. Capabilities
6. Experience
7. About
8. Contact
9. Responsive design

## Phase 3: Quality

Add:

1. Metadata
2. Accessibility
3. Performance optimisation
4. TypeScript validation
5. Linting
6. CI/CD checks

## Phase 4: Motion

Add:

1. Hero animation
2. Section entrances
3. Project transitions
4. Diagram animation
5. Reduced-motion fallback

## Phase 5: Expansion

Later add:

* Individual case-study pages
* CMS or MDX
* Dark mode
* Blog or technical notes
* Additional project diagrams

---

# Important Constraints

* The site must prove ability, not merely list tools.
* Projects should focus on problems, decisions and results.
* The architectural positioning must remain credible.
* Do not describe me as a senior or established solutions architect.
* Use language such as:

  * Developer with a systems perspective
  * Developer focused on platforms and integrations
  * Developer moving toward solution architecture
* The homepage should be understandable within five seconds.
* Recruiters should be able to access all important content immediately.
* Animation must never reduce clarity or usability.
* The strongest project should appear first.
* Do not invent metrics, project outcomes, responsibilities, technologies,
  clients, architecture decisions or years of experience.

* When information is missing, insert a clear TODO placeholder instead of 
  creating plausible-sounding content.
