import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import * as schemas from "../schemas/cardSchema.js";
import * as cardServices from "../controllers/cardControllers.js";

const cardRouter = express.Router();

cardRouter.get("/", authenticate, cardServices.getCards);

cardRouter.post(
  "/:colomnId",
  authenticate,
  isValidId,
  validateBody(schemas.cardSchema),
  cardServices.createCard
);

cardRouter.put(
  "/:cardId",
  authenticate,
  isValidId,
  validateBody(schemas.updateCardSchema),
  cardServices.updateCardCtrl
);

cardRouter.delete("/:cardId", authenticate, isValidId, cardServices.deleteCard);

export default cardRouter;
