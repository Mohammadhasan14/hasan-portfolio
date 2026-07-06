import Reveal from "./Reveal";
import { skillGroups } from "@/lib/data";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={`${styles.eyebrow} mono`}>02 / STACK</div>
          <h2 className={styles.title}>Tech stack</h2>
        </Reveal>
        <div className={styles.grid}>
          {skillGroups.map((grp) => (
            <Reveal key={grp.tag} className={styles.card}>
              <div className={styles.cardCorner} />
              <div className={`${styles.cardTag} mono`}>{grp.tag}</div>
              <div className={styles.cardName}>{grp.name}</div>
              <div className={styles.itemRow}>
                {grp.items.map((item) => (
                  <span key={item} className={`${styles.item} mono`}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
