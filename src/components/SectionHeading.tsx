
type SectionHeadingProps = {
  number: string;
  title: string;
  description?: string;
};

export function SectionHeading({ number, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20">
      <h2 className="py-1 text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.3] tracking-tight text-foreground">
        <span className="mr-5 md:mr-7 text-2xl md:text-3xl text-accent align-middle">{number}</span>
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base md:text-lg text-muted">{description}</p>
      ) : null}
    </div>
  );
}
