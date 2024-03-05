import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import * as authControllers from "../controllers/authControllers.js";
import * as userSchema from "../schemas/userSchema.js";
import { validateBody } from "../middlewares/validateBody.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchema.registerSchema),
  authControllers.registerUser
);
authRouter.post(
  "/login",
  validateBody(userSchema.loginSchema),
  authControllers.loginUser
);
authRouter.post("/logout", authenticate, authControllers.logoutUser);
authRouter.get("/current", authenticate, authControllers.getCurrentUser);
authRouter.patch("/user");
authRouter.put(
  "/update",
  authenticate,
  validateBody(userSchema.updateUserSchema),
  upload.single("avatarURL"),
  authControllers.updateUser
);
authRouter.post(
  "/help",
  authenticate,
  validateBody(userSchema.sendMailSchema),
  authControllers.sendMail
);

authRouter.patch(
  "/theme",
  authenticate,
  validateBody(userSchema.updateThemeSchema),
  authControllers.updateUserTheme
);

export default authRouter;
