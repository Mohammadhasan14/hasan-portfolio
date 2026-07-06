"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Phone, MapPin, GitFork, Briefcase, FileDown, Check } from "lucide-react";
import Reveal from "./Reveal";
import styles from "./Contact.module.css";

const EMAIL = "mohdhasan7867214@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.clipboard) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.gridBg} />
      <Reveal className={styles.inner}>
        <div className={`${styles.eyebrow} mono`}>06 / CONTACT</div>
        <h2 className={styles.title}>Let&apos;s connect</h2>
        <p className={styles.lead}>
          Have a project, a role, or just want to talk shop? My inbox is always open.
        </p>
        <a href={`mailto:${EMAIL}`} onClick={handleCopyEmail} className={`${styles.emailBtn} mono`}>
          <Mail size={16} strokeWidth={2.25} />
          {EMAIL}
        </a>
        <div className={`${styles.infoRow} mono`}>
          <span className={styles.infoItem}>
            <Phone size={13} strokeWidth={2.25} />
            +91 72180 74913
          </span>
          <span className={styles.sep}>/</span>
          <span className={styles.infoItem}>
            <MapPin size={13} strokeWidth={2.25} />
            NAGPUR, INDIA
          </span>
        </div>
        <div className={styles.socialRow}>
          <a
            href="https://github.com/Mohammadhasan14"
            target="_blank"
            rel="noopener"
            className={`${styles.social} mono`}
          >
            <GitFork size={15} strokeWidth={2.25} />
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/mohammad-hasan-abbas"
            target="_blank"
            rel="noopener"
            className={`${styles.social} mono`}
          >
            <Briefcase size={15} strokeWidth={2.25} />
            LINKEDIN
          </a>
          <a href="/resume.pdf" target="_blank" className={`${styles.social} mono`}>
            <FileDown size={15} strokeWidth={2.25} />
            RESUME.PDF
          </a>
        </div>
      </Reveal>

      <div className={styles.toastWrap}>
        <AnimatePresence>
          {copied && (
            <motion.div
              className={`${styles.toast} mono`}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <Check size={14} strokeWidth={2.5} />
              Email copied to clipboard
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
