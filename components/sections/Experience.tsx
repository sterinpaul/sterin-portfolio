import Reveal from "@/components/Reveal";
import { experience } from "@/data/profile";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">
            <span className="accent">03</span> — Experience
          </p>
        </div>

        <ol className="timeline">
          {experience.map((job, i) => (
            <li key={job.company}>
              <Reveal delay={i * 120} className="job">
                <div className="job__meta">
                  <p className="job__period">{job.period}</p>
                  <p className="job__loc">{job.location}</p>
                </div>
                <div className="job__main">
                  <h3 className="job__company">
                    {job.company}
                    {job.current && <span className="badge">Current</span>}
                  </h3>
                  <p className="job__role">{job.role}</p>
                  <ul className="job__points">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
