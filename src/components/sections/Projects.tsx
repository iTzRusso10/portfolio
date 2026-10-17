import { featuredProjects } from "../../content/projects";
import { projectsCopy } from "../../content/site";
import { AsciiWindow } from "../ui/AsciiWindow";
import { JumpText } from "../ui/JumpText";
import { SectionLabel } from "../ui/SectionLabel";
import { ProjectChapter } from "./projects/ProjectChapter";

export function Projects() {
  return (
    <section id="progetti" aria-labelledby="progetti-title" className="relative pb-14 pt-14 sm:pb-[12vh] sm:pt-[12vh] lg:pt-[18vh]">
      <div className="shell above-scene">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <div className="lg:col-span-7">
            <SectionLabel section="progetti" />
            <JumpText accentLast id="progetti-title" lines={projectsCopy.title} className="type-display mt-8 text-[clamp(3.2rem,9vw,8.5rem)]" />
            <JumpText
              as="p"
              unit="word"
              lines={[projectsCopy.intro]}
              delay={400}
              stagger={14}
              className="mt-8 max-w-[30rem] leading-relaxed text-ink/75"
            />
          </div>
          <AsciiWindow shape="agents" title="pipeline.obj" className="lg:col-span-5" />
        </header>

        {featuredProjects.map((project, i) => (
          <ProjectChapter key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
