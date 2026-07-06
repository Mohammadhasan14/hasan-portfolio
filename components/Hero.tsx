"use client";

import type { MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import TypingText from "./TypingText";
import ScrollIndicator from "./ScrollIndicator";
import styles from "./Hero.module.css";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(mvY, { stiffness: 60, damping: 20, mass: 0.6 });

  const bgX = useTransform(springX, [-0.5, 0.5], [6, -6]);
  const bgY = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const fgX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const fgY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <section
      id="hero"
      className={styles.hero}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className={styles.gridBg} style={{ x: bgX, y: bgY }} />

      <div className={`${styles.corner} ${styles.cornerTl}`} />
      <div className={`${styles.corner} ${styles.cornerTr}`} />
      <div className={`${styles.corner} ${styles.cornerBl}`} />
      <div className={`${styles.corner} ${styles.cornerBr}`} />

      <motion.div className={styles.inner} style={{ x: fgX, y: fgY }}>
        <div className={`${styles.badge} mono`}>
          <span className={styles.badgeLine} />
          <span>SYS.ONLINE — FULL-STACK / MERN / SHOPIFY / MOBILE</span>
        </div>
        <h1 className={styles.heading}>
          MOHAMMAD
          <br />
          <span className={styles.headingOutline}>HASAN ABBAS</span>
        </h1>
        <div className={`${styles.typedLine} mono`}>
          <span className={styles.prompt}>&gt;_</span> <TypingText />
          <span className={styles.cursorBlink} />
        </div>
        <p className={styles.lead}>
          I design and build scalable SaaS, eCommerce, and real-time systems on the MERN
          stack — 14+ production apps shipped over 4+ years, including Shopify public
          apps and Play Store releases. Available for custom builds. Based in Nagpur,
          India.
        </p>
        <div className={styles.ctaRow}>
          <a href="#projects" className={`${styles.btnPrimary} mono`}>
            VIEW WORK
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
          <a href="#contact" className={`${styles.btnSecondary} mono`}>
            INIT CONTACT
          </a>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
