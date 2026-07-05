import SessionClock from "./SessionClock";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer} mono`}>
      <span>© 2026 MOHAMMAD HASAN ABBAS — BUILT WITH MERN</span>
      <SessionClock />
    </footer>
  );
}
