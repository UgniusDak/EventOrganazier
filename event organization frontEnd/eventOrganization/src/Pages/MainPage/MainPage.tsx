import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./MainPage.module.css";
import images from "../../assets/CarouselPhotos";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function MainPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function handleLeft() {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleRight() {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <main>
      <Header />
      <div className={styles.galleryCarousel}>
        <button onClick={handleLeft} className={styles.carouselLeftArrow}>
          <FaArrowLeft />
        </button>
        <img src={images[currentImageIndex]} alt="Slide photos" />
        <button onClick={handleRight} className={styles.carouselRightArrow}>
          <FaArrowRight />
        </button>
      </div>
      <div className={styles.aboutUsContainer}>
        <div className={styles.aboutUsInfo}>
          <h3>About Us</h3>
          <hr />
          <ul>
            <li>
              Renginius organizuojame jau daugiau nei dešimtmetį – per tuos
              metus sukaupėme ne tik patirties, bet ir gilų supratimą, kas iš
              tiesų daro šventę įsimintiną.
            </li>
            <li>
              Mūsų komanda nebijo iššūkių. Net kai projektas sudėtingas,
              laikomės aiškios vizijos ir siekiame aukščiausio rezultato.
            </li>
            <li>
              Kokybišką renginį sukurti gali tik tie, kurie myli tai, ką daro.
              Todėl mūsų komandoje – tik entuziastingi, atsakingi ir pozityvūs
              žmonės. Jie geba greitai reaguoti, spręsti netikėtus klausimus ir
              visą laiką išlaikyti pozityvią atmosferą.
            </li>
          </ul>
        </div>
        <img
          src="https://images.pexels.com/photos/4577179/pexels-photo-4577179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <Footer />
    </main>
  );
}
