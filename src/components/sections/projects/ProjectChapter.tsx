import type { FeaturedProject } from "../../../content/projects";
import { ArrowUpRight } from "../../ui/Icons";
import { JumpText } from "../../ui/JumpText";
import { ExternalLink } from "../../ui/ExternalLink";
import { Magnetic } from "../../ui/Magnetic";
import { ProjectMedia } from "./ProjectMedia";

interface ProjectChapterProps {
  project: FeaturedProject;
  index: number;
}

export function ProjectChapter({ project, index }: ProjectChapterProps) {
  const mirrored = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const titleId = `progetto-${project.id}-title`;

  return (
    <article id={`progetto-${project.id}`} aria-labelledby={titleId} className="py-12 sm:py-[10vh] lg:py-[14vh]">
      <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
        <header className={`lg:col-span-11 ${mirrored ? "lg:col-start-2 lg:text-right" : ""}`}>
          <p
            className={`label flex flex-wrap items-center gap-x-4 gap-y-1 text-mute ${mirrored ? "lg:justify-end" : ""}`}
            data-reveal
          >
            <span className="text-ink">P{number}</span>
            <span>{project.year}</span>
            <span>{project.category}</span>
          </p>
          <JumpText as="h3" id={titleId} lines={[project.title]} className="type-title mt-4" />
        </header>

        <div className={`lg:col-span-7 ${mirrored ? "lg:col-start-6 lg:row-start-2" : ""}`} data-reveal>
          <ProjectMedia project={project} />
        </div>

        <div
          className={`flex flex-col gap-8 lg:col-span-4 lg:row-start-2 ${mirrored ? "lg:col-start-1" : "lg:col-start-9"}`}
          data-reveal
        >
          <p className="text-[1.15rem] font-medium leading-snug [font-stretch:104%] lg:text-[1.3rem]">{project.summary}</p>
          <dl className="grid gap-6 text-[0.95rem] leading-relaxed">
            <div>
              <dt className="label mb-2 text-mute">Problema</dt>
              <dd className="text-ink/80">{project.problem}</dd>
            </div>
            <div>
              <dt className="label mb-2 text-mute">Contributo</dt>
              <dd className="text-ink/80">{project.contribution}</dd>
            </div>
            <div>
              <dt className="label mb-2 text-mute">Stack</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech} className="label rounded-full border border-ink/20 px-2.5 py-1 text-[0.625rem]">
                      {tech}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-3">
            {project.links.demo && (
              <Magnetic>
                <ExternalLink href={project.links.demo} className="btn btn-solid" aria-label={`Demo di ${project.title}`}>
                  Demo
                  <ArrowUpRight className="btn-arrow" />
                </ExternalLink>
              </Magnetic>
            )}
            {project.links.repo && (
              <Magnetic>
                <ExternalLink
                  href={project.links.repo}
                  className="btn btn-ghost"
                  aria-label={`Codice di ${project.title} su GitHub`}
                >
                  Codice
                  <ArrowUpRight className="btn-arrow" />
                </ExternalLink>
              </Magnetic>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
