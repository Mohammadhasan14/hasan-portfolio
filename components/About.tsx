import Reveal from "./Reveal";
import styles from "./About.module.css";

const availableFor = [
  "Custom web applications",
  "Admin dashboards & SaaS",
  "Shopify apps",
  "API integration & bug fixes",
  "Deployment support",
];

const stats = [
  { value: "5+", label: "YEARS SHIPPING" },
  { value: "14+", label: "PRODUCTION APPS" },
  { value: "8.96", label: "GPA — B.E. CS" },
];

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.grid}>
        <Reveal>
          <div className={`${styles.eyebrow} mono`}>01 / ABOUT</div>
          <h2 className={styles.title}>Operator profile</h2>
          <div className={styles.photoWrap}>
            <div className={styles.photoRing} />
            <div className={styles.photoInner}>
              <span className={`${styles.photoLabel} mono`}>[ your photo ]</span>
            </div>
          </div>
        </Reveal>
        <Reveal className={styles.copy}>
          <p className={styles.paraLarge}>
            Full Stack Developer with 5+ years of experience designing and building
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
                <div className={styles.statValue}>{stat.value}</div>
                <div className={`${styles.statLabel} mono`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
