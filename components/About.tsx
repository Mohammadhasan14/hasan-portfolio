import Image from "next/image";
import Reveal from "./Reveal";
import AnimatedNumber from "./AnimatedNumber";
import styles from "./About.module.css";

const availableFor = [
  "Custom web applications",
  "Admin dashboards & SaaS",
  "Shopify apps",
  "API integration & bug fixes",
  "Deployment support",
];

const stats = [
  { value: "4+", label: "YEARS EXPERIENCE" },
  { value: "14+", label: "PRODUCTION APPS" },
  { value: "8.96", label: "GPA — B.E. CS" },
];

export default function About() {
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
                src="/images/hasan_profile.png"
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
          <p className={styles.paraLarge}>
            Full Stack Developer with 4+ years of experience designing and building
            scalable SaaS, eCommerce, and real-time systems on the MERN stack. I&apos;ve
            delivered 14+ production applications — including Shopify public apps,
            learning platforms, and Play Store mobile solutions — with a focus on clean
            backend architecture, API design, database optimization, security, and
            performance.
          </p>
          <p className={styles.paraSmall}>
            B.E. in Computer Science (GPA 8.96), Anjuman College of Engineering and
            Technology, RTMNU — Nagpur, Maharashtra.
          </p>
          <div className={styles.availableWrap}>
            <div className={`${styles.availableLabel} mono`}>AVAILABLE FOR</div>
            <div className={styles.tagRow}>
              {availableFor.map((item) => (
                <span key={item} className={`${styles.tag} mono`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.statGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
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
