import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./RegisteredList.module.css";
import {
  deleteUser,
  fetchRegisteredUsers,
  updateUser,
} from "../../utils/registerHandler";
import Footer from "../../components/Footer/Footer";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import registerValidationSchema from "../../validationSchemas/registerValidationSchema";
import { AxiosError } from "axios";

type registeredUser = {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  birthDate: string;
};

type User = {
  name: string;
  lastName: string;
  birthDate: string;
  email: string;
};

export default function RegisteredList() {
  const [isPressed, setIsPressed] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [filteredUser, setFilteredUser] = useState<registeredUser[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [registeredUsers, setRegisteredUsers] = useState<registeredUser[]>([]);

  const [updatedFormData, setUpdatedFormData] = useState<User>({
    name: "",
    lastName: "",
    birthDate: "",
    email: "",
  });

  useEffect(() => {
    async function getUsers() {
      try {
        const users = await fetchRegisteredUsers();
        setRegisteredUsers(users);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, []);

  function editHandler(_id: string) {
    const user = registeredUsers.find((user) => user._id === _id);
    if (user) {
      setUpdatedFormData({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        birthDate: user.birthDate,
      });
      setUserId(_id);
      setIsPressed(false);
    }
  }

  async function handleDelete(userId: string) {
    try {
      await deleteUser(userId);
      setRegisteredUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const filtered = registeredUsers.filter((user) =>
      user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredUser(filtered);
  }, [searchTerm, registeredUsers]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await registerValidationSchema.validate(updatedFormData);
      await updateUser(updatedFormData, userId);

      setRegisteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, ...updatedFormData } : user
        )
      );

      setUpdatedFormData({
        name: "",
        lastName: "",
        email: "",
        birthDate: "",
      });

      setError("");
      setIsPressed(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setError(error.response?.data.message);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <div>
      <Header />
      {isPressed ? (
        <div>
          <p>Registered User List</p>
          <hr />
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch />
          </div>
          {filteredUser.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name:</th>
                  <th>Last Name:</th>
                  <th>Email:</th>
                  <th>Year Of birth:</th>
                  <th>Actions:</th>
                </tr>
              </thead>
              {filteredUser.map((user) => {
                return (
                  <tbody key={user._id}>
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.birthDate
                          ? user.birthDate.slice(0, 10)
                          : user.birthDate}
                      </td>
                      <td className={styles.buttonTableData}>
                        <button
                          onClick={() => editHandler(user._id)}
                          className={styles.edit}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className={styles.delete}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      ) : (
        <div className={styles.editUserContainer}>
          <h2>Edit user</h2>
          <hr />
          <form onSubmit={handleSubmit} className={styles.editUserForm}>
            <label htmlFor="input-name">Name:</label>
            <input
              type="text"
              id="input-name"
              name="name"
              value={updatedFormData.name}
              onChange={handleChange}
            />
            <label htmlFor="input-lastName">Last Name:</label>
            <input
              type="text"
              id="input-lastName"
              name="lastName"
              value={updatedFormData.lastName}
              onChange={handleChange}
            />
            <label htmlFor="input-Date">Birth Date</label>
            <input
              type="date"
              id="input-birthDate"
              name="birthDate"
              placeholder="Enter your age"
              value={
                updatedFormData.birthDate
                  ? updatedFormData.birthDate.slice(0, 10)
                  : ""
              }
              onChange={handleChange}
            />
            <label htmlFor="input-email">Email:</label>
            <input
              type="email"
              id="input-email"
              name="email"
              value={updatedFormData.email}
              onChange={handleChange}
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
            <div className={styles.buttonsContainer}>
              <button type="submit">Edit</button>
              <button onClick={() => setIsPressed(false)}>Back</button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
}
