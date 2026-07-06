import Reveal from "./Reveal";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.gridBg} />
      <Reveal className={styles.inner}>
        <div className={`${styles.eyebrow} mono`}>06 / CONTACT</div>
        <h2 className={styles.title}>Let&apos;s connect</h2>
        <p className={styles.lead}>
          Have a project, a role, or just want to talk shop? My inbox is always open.
        </p>
        <a href="mailto:mohdhasan7867214@gmail.com" className={`${styles.emailBtn} mono`}>
          mohdhasan7867214@gmail.com
        </a>
        <div className={`${styles.infoRow} mono`}>
          <span>+91 72180 74913</span>
          <span className={styles.sep}>/</span>
          <span>NAGPUR, INDIA</span>
        </div>
        <div className={styles.socialRow}>
          <a
            href="https://github.com/Mohammadhasan14"
            target="_blank"
            rel="noopener"
            className={`${styles.social} mono`}
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/mohammad-hasan-abbas"
            target="_blank"
            rel="noopener"
            className={`${styles.social} mono`}
          >
            LINKEDIN
          </a>
          <a href="/resume.pdf" target="_blank" className={`${styles.social} mono`}>
            RESUME.PDF
          </a>
        </div>
      </Reveal>
    </section>
  );
}
