// Numbered section heading, e.g. "01 / Selected Work", per project.md's
// suggested heading format under Visual Direction.
type SectionHeadingProps = {
  number: string;
  title: string;
  description?: string;
};

export function SectionHeading({ number, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="font-mono text-sm tracking-widest text-accent uppercase">
        {number} / {title}
      </p>
      <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base md:text-lg text-muted">{description}</p>
      ) : null}
    </div>
  );
}
