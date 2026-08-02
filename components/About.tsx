import Image from "next/image";
import Reveal from "./Reveal";
import AnimatedNumber from "./AnimatedNumber";
import { getSiteSettings } from "@/lib/queries/site-settings";
import { getStats } from "@/lib/queries/stats";
import styles from "./About.module.css";

export default async function About() {
  const [settings, stats] = await Promise.all([getSiteSettings(), getStats("about")]);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.grid}>
        <Reveal effect="slide-right">
          <div className={`${styles.eyebrow} mono`}>01 / ABOUT</div>
          <h2 className={styles.title}>Developer profile</h2>
          <div className={styles.photoWrap}>
            <div className={styles.photoRing} />
            <div className={styles.photoInner}>
              <Image
                src={settings?.profile_image_url || "/images/hasan_profile.png"}
                alt="Mohammad Hasan Abbas"
                fill
                sizes="164px"
                className={styles.photoImg}
                priority
              />
            </div>
          </div>
        </Reveal>
        <Reveal className={styles.copy} effect="slide-left" delay={0.1}>
          <p className={styles.paraLarge}>{settings?.about_bio}</p>
          <p className={styles.paraSmall}>{settings?.about_education}</p>
          <div className={styles.availableWrap}>
            <div className={`${styles.availableLabel} mono`}>AVAILABLE FOR</div>
            <div className={styles.tagRow}>
              {(settings?.available_for ?? []).map((item) => (
                <span key={item} className={`${styles.tag} mono`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.statGrid}>
            {stats.map((stat) => (
              <div key={stat.id} className={styles.stat}>
                <AnimatedNumber value={stat.value} className={styles.statValue} />
                <div className={`${styles.statLabel} mono`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
