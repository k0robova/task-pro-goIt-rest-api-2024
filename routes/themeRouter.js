import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  getUserTheme,
  updateUserTheme,
} from "../controllers/themeControllers.js";
import { isValidThemeId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { updateThemeSchema } from "../schemas/themeSchema.js";

const themeRouter = express.Router();

themeRouter.get("/:id", authenticate, isValidThemeId, getUserTheme);

themeRouter.patch(
  "/:id",
  authenticate,
  isValidThemeId,
  validateBody(updateThemeSchema),
  updateUserTheme
);

export default themeRouter;
