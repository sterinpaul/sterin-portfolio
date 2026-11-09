import type { CSSProperties } from "react";
import { profile } from "@/data/profile";

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="char" style={{ "--i": i + offset } as CSSProperties}>
          {ch}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner" data-sy>
        <p className="eyebrow hero__eyebrow intro" style={{ "--d": "0ms" } as CSSProperties}>
          <span className="pulse" aria-hidden="true" /> {profile.currently}
        </p>

        <h1 className="hero__name" aria-label={profile.name}>
          <span className="hero__line" aria-hidden="true">
            <Letters text={profile.firstName} />
          </span>
          <span className="hero__line hero__line--outline" aria-hidden="true">
            <Letters text={profile.lastName} offset={profile.firstName.length} />
          </span>
        </h1>

        <p className="hero__tagline intro" style={{ "--d": "700ms" } as CSSProperties}>
          {profile.tagline}
        </p>

        <div className="hero__cta intro" style={{ "--d": "850ms" } as CSSProperties}>
          <a href="#work" className="btn btn--accent">
            View my work
          </a>
          <a href={profile.resume} className="btn btn--ghost" download>
            Download CV
          </a>
        </div>
      </div>

      <div className="container hero__foot intro" style={{ "--d": "1000ms" } as CSSProperties}>
        <span>
          <span className="rule" aria-hidden="true" /> Move your cursor · Scroll to explore
        </span>
        <span className="hero__loc">{profile.location}</span>
      </div>
    </section>
  );
}
