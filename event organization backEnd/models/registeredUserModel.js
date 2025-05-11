import mongoose from "mongoose";

const registeredUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("RegisteredUserList", registeredUserSchema);
