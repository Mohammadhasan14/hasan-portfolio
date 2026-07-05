import TypingText from "./TypingText";
import ScrollIndicator from "./ScrollIndicator";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.gridBg} />

      <div className={`${styles.corner} ${styles.cornerTl}`} />
      <div className={`${styles.corner} ${styles.cornerTr}`} />
      <div className={`${styles.corner} ${styles.cornerBl}`} />
      <div className={`${styles.corner} ${styles.cornerBr}`} />

      <div className={styles.inner}>
        <div className={`${styles.badge} mono`}>
          <span className={styles.badgeLine} />
          <span>SYS.ONLINE — FULL-STACK / MERN / SHOPIFY / MOBILE</span>
        </div>
        <h1 className={styles.heading}>
          MOHAMMAD
          <br />
          <span className={styles.headingOutline}>HASAN ABBAS</span>
        </h1>
        <div className={`${styles.typedLine} mono`}>
          <span className={styles.prompt}>&gt;_</span> <TypingText />
          <span className={styles.cursorBlink} />
        </div>
        <p className={styles.lead}>
          I design and build scalable SaaS, eCommerce, and real-time systems on the MERN
          stack — 14+ production apps shipped over 4+ years, including Shopify public
          apps and Play Store releases. Available for custom builds. Based in Nagpur,
          India.
        </p>
        <div className={styles.ctaRow}>
          <a href="#projects" className={`${styles.btnPrimary} mono`}>
            VIEW WORK →
          </a>
          <a href="#contact" className={`${styles.btnSecondary} mono`}>
            INIT CONTACT
          </a>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
