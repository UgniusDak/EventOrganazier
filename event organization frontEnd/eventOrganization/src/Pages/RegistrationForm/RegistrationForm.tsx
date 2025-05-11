import { useState } from "react";
import Footer from "../../components/Footer/Footer.js";
import Header from "../../components/Header/Header.js";
import styles from "./RegistrationForm.module.css";
import { handleRegister } from "../../utils/registerHandler.js";
import registerValidationSchema from "../../validationSchemas/registerValidationSchema.js";
import { AxiosError } from "axios";

export type User = {
  name: string;
  lastName: string;
  birthDate: string;
  email: string;
};

export default function RegistrationForm() {
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: "",
    lastName: "",
    birthDate: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await registerValidationSchema.validate(formData);
      await handleRegister(formData);
      setError("");
      setFormData({
        name: "",
        lastName: "",
        birthDate: "",
        email: "",
      });
      setIsRegistered(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setError(error.response?.data.message);
      } else if (error instanceof Error) {
        setError(error.message);
        setIsRegistered(false);
      }
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.registrationContainer}>
        <div className={styles.mapWrapper}>
          <h2>You can found us here</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2294.3017414365327!2d23.90709997662007!3d54.89762595753333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e72274a2d8fdc7%3A0xa3459226232ddb36!2sMaironio%20g.%2C%20Kaunas%2C%20Kauno%20m.%20sav.!5e0!3m2!1sen!2slt!4v1746524395084!5m2!1sen!2slt"
            width="600"
            height="550"
            loading="lazy"
          ></iframe>
        </div>
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <div>
            <h2>Registration</h2>
          </div>
          <label htmlFor="input-name">Name</label>
          <input
            type="text"
            id="input-name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="input-lastName">Last Name</label>
          <input
            type="text"
            id="input-lastName"
            name="lastName"
            placeholder="Enter your Last name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <label htmlFor="input-Date">Birth Date</label>
          <input
            type="date"
            id="input-birthDate"
            name="birthDate"
            placeholder="Enter your age"
            value={formData.birthDate}
            onChange={handleChange}
          />

          <label htmlFor="input-email">Email</label>
          <input
            type="email"
            id="input-email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
          {isRegistered && (
            <p className={styles.successful}>Registration successful !! </p>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
