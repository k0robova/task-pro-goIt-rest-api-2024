import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  createBoard,
  deleteBoard,
  getBoardById,
  getBoards,
  updateBoardCtrl,
} from "../controllers/boardControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  createBoardSchema,
  updateBoardSchema,
} from "../schemas/boardSchema.js";
import { isValidId } from "../middlewares/isValidId.js";

const boardsRouter = express.Router();

boardsRouter.get("/", authenticate, getBoards);

boardsRouter.get("/:boardId", authenticate, isValidId, getBoardById);

boardsRouter.post(
  "/",
  authenticate,
  validateBody(createBoardSchema),
  createBoard
);

boardsRouter.put(
  "/:boardId",
  authenticate,
  isValidId,
  validateBody(updateBoardSchema),
  updateBoardCtrl
);

boardsRouter.delete("/:boardId", authenticate, isValidId, deleteBoard);

export default boardsRouter;
