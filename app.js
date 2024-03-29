import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import groupRouter from "./routes/groupRouter.js";
import lessonRouter from "./routes/lessonRouter.js";

dotenv.config();

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/groups", groupRouter);
app.use("/lessons", lessonRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
