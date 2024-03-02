import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  getColomns,
  deleteColomn,
  updateColomnCtrl,
  createColomn,
} from "../controllers/colomnContollers.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  createColomnSchema,
  updateColomnSchema,
} from "../schemas/colomnSchema.js";
import { isValidColomnsId, isValidBoardsId } from "../middlewares/isValidId.js";

const colomnRouter = express.Router();

colomnRouter.get("/:boardId", authenticate, isValidBoardsId, getColomns);

colomnRouter.post(
  "/:boardId",
  authenticate,
  isValidBoardsId,
  validateBody(createColomnSchema),
  createColomn
);

colomnRouter.put(
  "/:colomnId",
  authenticate,
  isValidColomnsId,
  validateBody(updateColomnSchema),
  updateColomnCtrl
);

colomnRouter.delete("/:colomnId", authenticate, isValidColomnsId, deleteColomn);

export default colomnRouter;
