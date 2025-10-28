import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "complete"],
      default: "active",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true } // Ngay tao va ngay cap nhat tu dong
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
