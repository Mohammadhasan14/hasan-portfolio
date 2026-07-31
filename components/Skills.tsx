import Reveal from "./Reveal";
import { getSkillGroups } from "@/lib/queries/skill-groups";
import styles from "./Skills.module.css";

export default async function Skills() {
  const skillGroups = await getSkillGroups();

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={`${styles.eyebrow} mono`}>02 / STACK</div>
          <h2 className={styles.title}>Loaded modules</h2>
        </Reveal>
        <div className={styles.grid}>
          {skillGroups.map((grp) => (
            <Reveal key={grp.id} className={styles.card}>
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
