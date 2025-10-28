import express, { json } from "express";
import taskRoute from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
connectDB();
dotenv.config(); // load biến từ file .env
const PORT = process.env.PORT || 5000;

//Midleware
app.use(express.json());
app.use(
  cors({
    // origin: ["https://myapp.com"],
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  })
);
app.use("/api/tasks", taskRoute);

app.listen(PORT, () => {
  console.log("Khoi tao server cong 5001 thanh cong");
});
