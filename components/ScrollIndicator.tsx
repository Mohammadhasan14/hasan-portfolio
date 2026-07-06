"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Hero.module.css";

export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setHidden(window.scrollY > 80);
        ticking.current = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${styles.scrollHint} mono`} data-hidden={hidden}>
      <span className={styles.scrollLabel}>SCROLL</span>
      <ChevronDown className={styles.scrollArrow} size={13} strokeWidth={2.5} />
    </div>
  );
}
