import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { profile, projects } from "@/data/profile";

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section__head section__head--split">
          <p className="eyebrow">
            <span className="accent">02</span> — Selected work
          </p>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="link-muted">
            More on GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>

        <Reveal>
          <h2 className="display">
            Products I’ve <span className="outline">built</span>
          </h2>
        </Reveal>

        <div className="projects">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 140}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
