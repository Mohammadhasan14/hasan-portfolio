"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Clock from "./Clock";
import MobileNav from "./MobileNav";
import styles from "./Nav.module.css";

const SECTIONS = [
  { id: "hero", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "STACK" },
  { id: "experience", label: "LOG" },
  { id: "projects", label: "WORK" },
];

export default function Nav() {
  const [active, setActive] = useState<string | null>("hero");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const ratios = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId: string | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId) setActive(bestId);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className={styles.nav}>
      <a href="#hero" className={`${styles.logo} mono`}>
        MH<span style={{ color: "var(--ac, #ff4d5a)" }}>://</span>dev
      </a>
      <div className={styles.links}>
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.navLink} mono`}
              data-active={isActive}
            >
              {section.label}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className={styles.underline}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          );
        })}
        <a href="#contact" className={`${styles.contactLink} mono`}>
          CONTACT
        </a>
      </div>
      <div className={`${styles.status} mono`}>
        <span className={styles.pulseDot} />
        <Clock />
      </div>
      <MobileNav />
    </nav>
  );
}
