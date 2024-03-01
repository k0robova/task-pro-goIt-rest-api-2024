import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getCurrentUser, logoutUser } from "../controllers/authControllers.js";
import { sendMailSchema } from "../schemas/userSchema.js";
import * as authControllers from "../controllers/authControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
const authRouter = express.Router();

authRouter.post("/register");
authRouter.post("/login");
authRouter.post("/logout", authenticate, logoutUser);
authRouter.get("/current", authenticate, getCurrentUser);
authRouter.patch("/user");
authRouter.post(
  "/help",
  authenticate,
  validateBody(sendMailSchema),
  authControllers.sendMail
);

export default authRouter;
