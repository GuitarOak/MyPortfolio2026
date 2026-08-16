import { Container } from "./Container";
import { CapabilityColumns } from "./CapabilityColumns";
import { capabilities } from "@/content/experience";

export function Capabilities() {
  return (
    <section id="capabilities" className="py-20 md:py-28">
      <Container>
        {/* Heading + grid are both inside CapabilityColumns so they pin together. */}
        <CapabilityColumns groups={capabilities} />
      </Container>
    </section>
  );
}
