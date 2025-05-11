import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js";

dotenv.config();

const { PORT, MONGO_URI, CORS_ORIGIN } = process.env;

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

app.use(express.json());

app.use(router);

mongoose
  .connect(MONGO_URI, {
    dbName: "EventOrganization",
  })
  .then(() => console.log("Connected to MongoDb"))
  .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
