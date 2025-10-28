import express, { json } from "express";
import taskRoute from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

const app = express();
connectDB();
dotenv.config(); // load biến từ file .env

const PORT = process.env.PORT || 5000;

//Midleware
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use("/api/tasks", taskRoute);
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Khoi tao server cong 5001 thanh cong");
});
