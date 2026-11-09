import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import SceneLoader from "@/components/three/SceneLoader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import ExperienceSection from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import { profile } from "@/data/profile";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressRegion: "Kerala", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Lifology" },
  sameAs: [profile.links.linkedin, profile.links.github, profile.links.leetcode],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main" className="skip">Skip to content</a>
      <SmoothScroll />
      <SceneLoader />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <ExperienceSection />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
