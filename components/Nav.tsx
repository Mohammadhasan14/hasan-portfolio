"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Clock from "./Clock";
import MobileNav from "./MobileNav";
import styles from "./Nav.module.css";

const SECTIONS = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "STACK" },
  { id: "experience", label: "LOG" },
  { id: "projects", label: "WORK" },
];

export default function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > lastY.current && y > 140);
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={styles.nav} data-hidden={hidden}>
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
