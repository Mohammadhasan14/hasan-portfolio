import { ExternalLink } from "lucide-react";
import Reveal from "./Reveal";
import AnimatedNumber from "./AnimatedNumber";
import { getStats } from "@/lib/queries/stats";
import { getSiteSettings } from "@/lib/queries/site-settings";
import styles from "./GithubStats.module.css";

export default async function GithubStats() {
  const [stats, settings] = await Promise.all([getStats("contributions"), getSiteSettings()]);
  const githubUrl = settings?.github_url ?? "";
  const githubLabel = githubUrl.replace(/^https?:\/\//, "");

  return (
    <section id="github" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <div>
            <div className={`${styles.eyebrow} mono`}>05 / OPEN SOURCE</div>
            <h2 className={styles.title}>Contributions</h2>
          </div>
          <a href={githubUrl} target="_blank" rel="noopener" className={`${styles.link} mono`}>
            {githubLabel}
            <ExternalLink size={13} strokeWidth={2.5} />
          </a>
        </Reveal>
        <div className={styles.grid}>
          {stats.map((st, i) => (
            <Reveal key={st.id} className={styles.stat} effect="scale" delay={i * 0.08}>
              <AnimatedNumber value={st.value} className={styles.value} />
              <div className={`${styles.label} mono`}>{st.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
