"use client";

import { useState } from "react";
import styles from "./Nav.module.css";

const navLinks = [
  { href: "#about", label: "01.ABOUT" },
  { href: "#skills", label: "02.STACK" },
  { href: "#experience", label: "03.LOG" },
  { href: "#projects", label: "04.WORK" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.mobileNav}>
      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        className={styles.menuButton}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.menuIcon} data-open={open} />
      </button>
      {open && (
        <div className={styles.mobilePanel}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.navLink} mono`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`${styles.contactLink} mono`}
            onClick={() => setOpen(false)}
          >
            05.CONTACT
          </a>
        </div>
      )}
    </div>
  );
}
