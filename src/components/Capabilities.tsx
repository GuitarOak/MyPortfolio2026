import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { capabilities } from "@/content/experience";

export function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-border py-20 md:py-28">
      <Container>
        <SectionHeading number="04" title="Capabilities" />
        <div className="grid gap-10 md:grid-cols-3">
          {capabilities.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-border px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
