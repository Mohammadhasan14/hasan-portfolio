import { ExternalLink } from "lucide-react";
import Reveal from "./Reveal";
import AnimatedNumber from "./AnimatedNumber";
import { ghStats } from "@/lib/data";
import styles from "./GithubStats.module.css";

export default function GithubStats() {
  return (
    <section id="github" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <div>
            <div className={`${styles.eyebrow} mono`}>05 / OPEN SOURCE</div>
            <h2 className={styles.title}>Contributions</h2>
          </div>
          <a
            href="https://github.com/Mohammadhasan14"
            target="_blank"
            rel="noopener"
            className={`${styles.link} mono`}
          >
            github.com/Mohammadhasan14
            <ExternalLink size={13} strokeWidth={2.5} />
          </a>
        </Reveal>
        <div className={styles.grid}>
          {ghStats.map((st, i) => (
            <Reveal key={st.label} className={styles.stat} effect="scale" delay={i * 0.08}>
              <AnimatedNumber value={st.value} className={styles.value} />
              <div className={`${styles.label} mono`}>{st.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
