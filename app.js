import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import groupRouter from "./routes/groupRouter.js";
import lessonRouter from "./routes/lessonRouter.js";
import therapyRouter from "./routes/therapyRouter.js";
import diaryRouter from "./routes/diaryRouter.js";
import quoteRouter from "./routes/quoteRouter.js";
import receiptRouter from "./routes/receiptRouter.js";

dotenv.config();

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/groups", groupRouter);
app.use("/lessons", lessonRouter);
app.use("/quotes", quoteRouter);
app.use("/therapy", therapyRouter);
app.use("/diary", diaryRouter);
app.use("receipts", receiptRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
