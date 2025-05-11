import scrollToTop from "../../utils/ScrollToTop";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h5>© 2025 EventPro. All rights reserved.</h5>
      <button onClick={scrollToTop}>^</button>
    </footer>
  );
}
