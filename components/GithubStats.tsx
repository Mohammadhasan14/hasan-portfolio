import Reveal from "./Reveal";
import { ghStats } from "@/lib/data";
import styles from "./GithubStats.module.css";

export default function GithubStats() {
  return (
    <section id="github" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <div>
            <div className={`${styles.eyebrow} mono`}>05 / OPEN SOURCE</div>
            <h2 className={styles.title}>Public activity</h2>
          </div>
          <a
            href="https://github.com/Mohammadhasan14"
            target="_blank"
            rel="noopener"
            className={`${styles.link} mono`}
          >
            github.com/Mohammadhasan14 ↗
          </a>
        </Reveal>
        <Reveal className={styles.grid}>
          {ghStats.map((st) => (
            <div key={st.label} className={styles.stat}>
              <div className={styles.value}>{st.value}</div>
              <div className={`${styles.label} mono`}>{st.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
