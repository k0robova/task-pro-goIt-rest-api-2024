import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoardCtrl,
} from "../controllers/boardControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  createBoardSchema,
  updateBoardSchema,
} from "../schemas/boardSchema.js";
import { isValidBoardsId } from "../middlewares/isValidId.js";

const boardsRouter = express.Router();

boardsRouter.get("/", authenticate, getBoards);

boardsRouter.post(
  "/",
  authenticate,
  validateBody(createBoardSchema),
  createBoard
);

boardsRouter.put(
  "/:boardId",
  authenticate,
  isValidBoardsId,
  validateBody(updateBoardSchema),
  updateBoardCtrl
);

boardsRouter.delete("/:boardId", authenticate, isValidBoardsId, deleteBoard);

export default boardsRouter;
