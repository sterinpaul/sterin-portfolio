import Reveal from "@/components/Reveal";
import { skills } from "@/data/profile";

export default function Skills() {
  const all = Object.values(skills).flat();
  const rowA = all.slice(0, Math.ceil(all.length / 2));
  const rowB = all.slice(Math.ceil(all.length / 2));

  return (
    <section id="skills" className="section section--flush">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">
            <span className="accent">04</span> — Skills
          </p>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...rowA, ...rowA].map((s, i) => (
            <span key={`a${i}`}>{s}</span>
          ))}
        </div>
        <div className="marquee__track marquee__track--reverse marquee__track--outline">
          {[...rowB, ...rowB].map((s, i) => (
            <span key={`b${i}`}>{s}</span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="skills">
          {Object.entries(skills).map(([group, items], i) => (
            <Reveal key={group} delay={i * 120} className="skills__group">
              <h3 className="label">{group}</h3>
              <ul className="tags tags--lg">
                {items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
