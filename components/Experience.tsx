import Reveal from "./Reveal";
import { jobs } from "@/lib/data";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={`${styles.eyebrow} mono`}>03 / LOG</div>
          <h2 className={styles.title}>Mission history</h2>
        </Reveal>
        <div className={styles.timeline}>
          {jobs.map((job) => (
            <Reveal key={job.period} className={styles.item}>
              <div className={styles.dot} />
              <div className={`${styles.period} mono`}>{job.period}</div>
              <div className={styles.titleRow}>
                <span className={styles.role}>{job.role}</span>
                <span className={`${styles.company} mono`}>@ {job.company}</span>
              </div>
              <p className={styles.desc}>{job.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
