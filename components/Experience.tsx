import Reveal from "./Reveal";
import { getExperiences } from "@/lib/queries/experiences";
import styles from "./Experience.module.css";

export default async function Experience() {
  const jobs = await getExperiences();

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={`${styles.eyebrow} mono`}>03 / LOG</div>
          <h2 className={styles.title}>Career timeline</h2>
        </Reveal>
        <div className={styles.timeline}>
          {jobs.map((job, i) => (
            <Reveal
              key={job.id}
              className={styles.item}
              effect="slide-right"
              delay={i * 0.12}
            >
              <div className={styles.dot} />
              <div className={`${styles.period} mono`}>{job.period}</div>
              <div className={styles.titleRow}>
                <span className={styles.role}>{job.role}</span>
                <span className={`${styles.company} mono`}>@ {job.company}</span>
              </div>
              <p className={styles.desc}>{job.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
