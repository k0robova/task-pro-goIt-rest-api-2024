import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import authRouter from "./routes/authRouter.js";
import boardsRouter from "./routes/boardsRouter.js";

import cardRouter from "./routes/cardsRouter.js";
import columnRouter from "./routes/columnRouter.js";

import { swaggerDocument } from "./helpers/swaggerSetup.js";

dotenv.config();

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/boards", boardsRouter);

app.use("/columns", columnRouter);
app.use("/cards", cardRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
