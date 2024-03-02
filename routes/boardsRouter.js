import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import * as boardControllers from "../controllers/boardControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as schemas from "../schemas/boardSchema.js";
import { isValidId } from "../middlewares/isValidId.js";

const boardsRouter = express.Router();

boardsRouter.get("/", authenticate, boardControllers.getBoards);

boardsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.createBoardSchema),
  boardControllers.createBoard
);

boardsRouter.put(
  "/:boardId",
  authenticate,
  isValidId,
  validateBody(schemas.updateBoardSchema),
  boardControllers.updateBoardCtrl
);

boardsRouter.delete(
  "/:boardId",
  authenticate,
  isValidId,
  boardControllers.deleteBoard
);

export default boardsRouter;
