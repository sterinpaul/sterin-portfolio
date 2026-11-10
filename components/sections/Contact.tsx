import Reveal from "@/components/Reveal";
import LocalTime from "@/components/LocalTime";
import { profile } from "@/data/profile";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">
            <span className="accent">05</span> — Contact
          </p>
        </div>

        <Reveal>
          <h2 className="contact__title">
            Let’s build
            <br />
            something <span className="accent">rare</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <a href={`mailto:${profile.email}`} className="contact__email">
            {profile.email}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>

        <Reveal delay={250}>
          <ul className="contact__links">
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            </li>
            <li>
              <a href={profile.links.leetcode} target="_blank" rel="noreferrer">LeetCode ↗</a>
            </li>
            <li>
              <a href={profile.resume} download>Resume (PDF) ↓</a>
            </li>
            {profile.showPhone && (
              <li>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
              </li>
            )}
          </ul>
        </Reveal>

        <footer className="footer">
          <p>© {year} {profile.name}</p>
          <p>
            {profile.location} · <LocalTime timeZone={profile.timeZone} /> IST
          </p>
          <a href="#top" className="link-muted">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
