import { Code2, Server, Database, Smartphone, Cloud, Zap } from "lucide-react";
import Reveal from "./Reveal";
import { skillGroups } from "@/lib/data";
import styles from "./Skills.module.css";

const ICONS: Record<string, typeof Code2> = {
  "MOD.01": Code2,
  "MOD.02": Server,
  "MOD.03": Database,
  "MOD.04": Smartphone,
  "MOD.05": Cloud,
  "MOD.06": Zap,
};

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={`${styles.eyebrow} mono`}>02 / STACK</div>
          <h2 className={styles.title}>Tech stack</h2>
        </Reveal>
        <div className={styles.grid}>
          {skillGroups.map((grp, i) => {
            const Icon = ICONS[grp.tag] ?? Code2;
            return (
              <Reveal
                key={grp.tag}
                className={styles.card}
                effect="scale"
                delay={i * 0.08}
              >
                <div className={styles.cardCorner} />
                <Icon className={styles.cardIcon} size={20} strokeWidth={1.75} />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
