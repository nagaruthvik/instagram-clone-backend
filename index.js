import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import loginroute from "./routes/login.js";
import cors from "cors"
const app = express();

dotenv.config();
app.use(cors())

app.use(express.json());
app.use("/auth", loginroute);
try {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log("connected to mongodb"));
  app.listen(3000, () => console.log("lisiting to 3000"));
} catch (error) {
  console.log(error);
}
