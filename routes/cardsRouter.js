import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidCardId, isValidColomnsId } from "../middlewares/isValidId.js";
import { cardSchema, updateCardSchema } from "../schemas/cardSchema.js";
import {
  getCards,
  createCard,
  deleteCard,
  updateCardCtrl,
} from "../controllers/cardControllers.js";

const cardRouter = express.Router();

cardRouter.get("/", authenticate, getCards);

cardRouter.post(
  "/:colomnId",
  authenticate,
  isValidColomnsId,
  validateBody(cardSchema),
  createCard
);

cardRouter.put(
  "/:cardId",
  authenticate,
  isValidCardId,
  validateBody(updateCardSchema),
  updateCardCtrl
);

cardRouter.delete("/:cardId", authenticate, isValidCardId, deleteCard);

export default cardRouter;
