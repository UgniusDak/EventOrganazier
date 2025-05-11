import { FaAddressBook, FaPhone } from "react-icons/fa";
import logo from "../../assets/logo.jpg";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function navigateToMainPage() {
    navigate("/");
  }

  return (
    <>
      <header className={styles.headerContainer}>
        <img src={logo} alt="Logotipas" onClick={navigateToMainPage} />
        <div className={styles.headerInfo}>
          <div className={styles.phoneNumber}>
            <FaPhone />
            <p>+370 612 90 566</p>
          </div>
          <div className={styles.email}>
            <FaAddressBook />
            <p>info@events.com</p>
          </div>
        </div>
      </header>
      <section>
        <a href="/">ABOUT US</a>
        <a href="/registration">REGISTRATION</a>
        <a href="/registration/list">REGISTRATION LIST</a>
      </section>
    </>
  );
}
