import Reveal from "@/components/Reveal";
import { education, profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">
            <span className="accent">01</span> — About
          </p>
        </div>

        <div className="about">
          <Reveal>
            <p className="about__lead">{profile.about.lead}</p>
          </Reveal>

          <div className="about__side">
            {profile.about.body.map((para, i) => (
              <Reveal key={i} delay={120 * (i + 1)}>
                <p className="about__body">{para}</p>
              </Reveal>
            ))}

            <Reveal delay={360}>
              <div className="edu">
                <p className="label">Education</p>
                <ul>
                  {education.map((e) => (
                    <li key={e.degree}>
                      <span className="edu__deg">{e.degree}</span>
                      <span className="edu__school">{e.school}</span>
                      <span className="edu__year">{e.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="stats">
          {profile.stats.map((s, i) => (
            <div key={s.label} className="stat">
              <Reveal delay={i * 120}>
                <p className="stat__value">{s.value}</p>
                <p className="stat__label">{s.label}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
