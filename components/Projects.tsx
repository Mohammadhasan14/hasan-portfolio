import Reveal from "./Reveal";
import { projects } from "@/lib/data";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={`${styles.eyebrow} mono`}>04 / WORK</div>
          <h2 className={styles.title}>Featured projects</h2>
        </Reveal>
        <div className={styles.grid}>
          {projects.map((proj) => (
            <Reveal key={proj.id} className={styles.card}>
              <div className={styles.shot}>
                <span className={`${styles.shotLabel} mono`}>[ {proj.shot} ]</span>
                <div className={`${styles.statusBadge} mono`}>{proj.status}</div>
              </div>
              <div className={styles.body}>
                <div className={styles.headRow}>
                  <span className={styles.name}>{proj.name}</span>
                  <span className={`${styles.id} mono`}>{proj.id}</span>
                </div>
                <p className={styles.desc}>{proj.desc}</p>
                <div className={styles.stackRow}>
                  {proj.stack.map((t) => (
                    <span key={t} className={`${styles.stackItem} mono`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className={styles.linkRow}>
                  <span className={`${styles.live} mono`}>LIVE ↗</span>
                  <span className={`${styles.source} mono`}>SOURCE ↗</span>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal
            as="a"
            href="https://github.com/Mohammadhasan14"
            target="_blank"
            rel="noopener"
            className={styles.moreCard}
          >
            <span className={`${styles.moreTitle} mono`}>MORE ON GITHUB →</span>
            <span className={`${styles.moreSub} mono`}>github.com/Mohammadhasan14</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
