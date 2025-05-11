import registeredUserModel from "../models/registeredUserModel.js";
import mongoose from "mongoose";

export async function createNewUser(req, res) {
  const { name, lastName, birthDate, email } = req.body;

  const existingEmail = await registeredUserModel.findOne({ email });

  if (existingEmail) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  try {
    const user = new registeredUserModel({
      name,
      lastName,
      email,
      birthDate,
    });

    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getRegisteredUsers(req, res) {
  try {
    const users = await registeredUserModel.find().select("-__v");

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUserById(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Id" });
  }
  try {
    const user = await registeredUserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    res.json({ message: "User successfully deleted " });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUserById(req, res) {
  const { id } = req.params;
  const { name, lastName, birthDate, email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  try {
    const user = await registeredUserModel.findById(id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.name = name;
    user.lastName = lastName;
    user.birthDate = birthDate;
    user.email = email;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
