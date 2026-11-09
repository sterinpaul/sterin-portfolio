"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Buttery smooth scrolling + a `--sy` CSS variable used for parallax effects. */
export default function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const setVars = () => {
      const sy = String(Math.round(window.scrollY));
      root.querySelectorAll<HTMLElement>("[data-sy]").forEach((el) => el.style.setProperty("--sy", sy));
    };
    setVars();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      window.addEventListener("scroll", setVars, { passive: true });
      return () => window.removeEventListener("scroll", setVars);
    }

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, anchors: { offset: -72 } });
    lenis.on("scroll", setVars);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
