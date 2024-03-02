import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import * as colomnControllers from "../controllers/colomnContollers.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as schemas from "../schemas/colomnSchema.js";
import { isValidId } from "../middlewares/isValidId.js";

const colomnRouter = express.Router();

colomnRouter.get(
  "/:boardId",
  authenticate,
  isValidId,
  colomnControllers.getColomns
);

colomnRouter.post(
  "/:boardId",
  authenticate,
  isValidId,
  validateBody(schemas.createColumnSchema),
  colomnControllers.createColomn
);

colomnRouter.put(
  "/:colomnId",
  authenticate,
  isValidId,
  validateBody(schemas.updateColumnSchema),
  colomnControllers.updateColomnCtrl
);

colomnRouter.delete(
  "/:colomnId",
  authenticate,
  isValidId,
  colomnControllers.deleteColomn
);

export default colomnRouter;
