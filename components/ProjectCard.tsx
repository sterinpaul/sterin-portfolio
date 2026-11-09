"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import type { Project } from "@/data/profile";

/** A project card with a cursor-following sheen and a gentle 3D tilt. */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      className="project"
      style={{ "--h": project.hue } as CSSProperties}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="project__cover" aria-hidden="true">
        <span className="project__orb" />
        <span className="project__num">{num}</span>
        <span className="project__kind">{project.kind}</span>
      </div>

      <div className="project__body">
        <header className="project__head">
          <h3>{project.name}</h3>
          <a href={project.link} target="_blank" rel="noreferrer" className="project__link">
            {project.linkLabel} <span aria-hidden="true">↗</span>
          </a>
        </header>
        <p className="project__summary">{project.summary}</p>
        <ul className="project__points">
          {project.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <ul className="tags" aria-label="Technologies">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
