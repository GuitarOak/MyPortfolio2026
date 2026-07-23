// Small status labels used on project cards (Built, Deployed, Internal tool,
// Integration, Case study, In production) per project.md's Visual Direction.
export function StatusLabel({ label }: { label: string }) {
  const isPending = label === "Content pending";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wide ${
        isPending
          ? "border-accent/40 text-accent bg-accent/5"
          : "border-border text-muted bg-surface"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isPending ? "bg-accent" : "bg-foreground/50"}`}
        aria-hidden
      />
      {label}
    </span>
  );
}
