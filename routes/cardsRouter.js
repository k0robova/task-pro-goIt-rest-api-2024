import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import * as schemas from "../schemas/cardSchema.js";
import * as cardServices from "../controllers/cardControllers.js";

const cardRouter = express.Router();

cardRouter.get("/:boardId", authenticate, isValidId, cardServices.getCards);

cardRouter.post(
  "/",
  authenticate,
  validateBody(schemas.createCardSchema),
  cardServices.createCard
);

cardRouter.put(
  "/:cardId",
  authenticate,
  isValidId,
  validateBody(schemas.updateCardSchema),
  cardServices.updateCardCtrl
);

cardRouter.patch(
  "/:cardId",
  authenticate,
  isValidId,
  validateBody(schemas.updateColumnIdinCardSchema),
  cardServices.updateColumnIdInCardCtrl
);

cardRouter.delete("/:cardId", authenticate, isValidId, cardServices.deleteCard);

export default cardRouter;
