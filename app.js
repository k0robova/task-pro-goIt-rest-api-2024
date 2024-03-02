import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import boardsRouter from "./routes/boardsRoutes.js";
import colomnRouter from "./routes/colomnsRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cardRouter from "./routes/cardRoutes.js";

dotenv.config();

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/boards", boardsRouter);
app.use("/colomns", colomnRouter);
app.use("/card", cardRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
