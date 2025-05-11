import express from "express";
import {
  createNewUser,
  deleteUserById,
  getRegisteredUsers,
  updateUserById,
} from "../controllers/registrationController.js";
import { registerValidation } from "../middleware/registerValidation.js";

const router = express.Router();

router.post("/register", registerValidation, createNewUser); //Užregistruoti žmogu

router.get("/registeredUsers", getRegisteredUsers); // Gauna visus užregistruotus žmones

router.put("/registeredUsers/:id", registerValidation, updateUserById); // Atnaujina useri

router.delete("/registeredUsers/:id", deleteUserById); //Istrina useri

export default router;
