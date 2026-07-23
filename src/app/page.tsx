import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { HowISolveProblems } from "@/components/HowISolveProblems";
import { ArchitectureCaseStudy } from "@/components/ArchitectureCaseStudy";
import { Capabilities } from "@/components/Capabilities";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <SelectedWork />
        <HowISolveProblems />
        <ArchitectureCaseStudy />
        <Capabilities />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
