import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import * as columnControllers from "../controllers/columnContollers.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as schemas from "../schemas/columnSchema.js";
import { isValidId } from "../middlewares/isValidId.js";

const columnRouter = express.Router();

columnRouter.get(
  "/:boardId",
  authenticate,
  isValidId,
  columnControllers.getColumns
);

columnRouter.post(
  "/",
  authenticate,
  validateBody(schemas.createColumnSchema),
  columnControllers.createColumn
);

columnRouter.put(
  "/:columnId",
  authenticate,
  isValidId,
  validateBody(schemas.updateColumnSchema),
  columnControllers.updateColumnCtrl
);

columnRouter.delete(
  "/:columnId",
  authenticate,
  isValidId,
  columnControllers.deleteColumn
);

export default columnRouter;

// .../columns/:boardId
