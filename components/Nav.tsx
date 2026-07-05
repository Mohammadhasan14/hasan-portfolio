import Clock from "./Clock";
import MobileNav from "./MobileNav";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#hero" className={`${styles.logo} mono`}>
        MH<span style={{ color: "var(--ac, #ff4d5a)" }}>://</span>dev
      </a>
      <div className={styles.links}>
        <a href="#about" className={`${styles.navLink} mono`}>
          ABOUT
        </a>
        <a href="#skills" className={`${styles.navLink} mono`}>
          STACK
        </a>
        <a href="#experience" className={`${styles.navLink} mono`}>
          LOG
        </a>
        <a href="#projects" className={`${styles.navLink} mono`}>
          WORK
        </a>
        <a href="#contact" className={`${styles.contactLink} mono`}>
          CONTACT
        </a>
      </div>
      <div className={`${styles.status} mono`}>
        <span className={styles.pulseDot} />
        <Clock />
      </div>
      <MobileNav />
    </nav>
  );
}
