import axios from "axios";

type User = {
  name: string;
  lastName: string;
  birthDate: string;
  email: string;
};

const API_HOST = import.meta.env.VITE_API_HOST;

export async function handleRegister(user: User) {
  const formattedUser = {
    ...user,
    birthDate: new Date(user.birthDate),
  };

  const response = await axios.post(`${API_HOST}/register`, formattedUser);
  const data = response.data;

  return data;
}

export async function fetchRegisteredUsers() {
  const response = await axios.get(`${API_HOST}/registeredUsers`);
  const data = response.data;

  return data;
}

export async function deleteUser(_id: string) {
  const response = await axios.delete(`${API_HOST}/registeredUsers/${_id}`);
  const data = response.data;

  return data;
}

export async function updateUser(newUser: User, userId: string) {
  const response = await axios.put(
    `${API_HOST}/registeredUsers/${userId}`,
    newUser
  );
  const data = response.data;

  return data;
}
