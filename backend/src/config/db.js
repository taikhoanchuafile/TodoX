import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load biến từ file .env

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("connect sucessfull");
  } catch (error) {
    console.error("connect faild", error);
    process.exit(1); //1: thoat khi that bai, 0: thoat khi thanh cong.
  }
};
