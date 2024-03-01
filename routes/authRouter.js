import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getCurrentUser, logoutUser } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register");
authRouter.post("/login");
authRouter.post("/logout", authenticate, logoutUser);
authRouter.get("/current", authenticate, getCurrentUser);
authRouter.patch("/user");

export default authRouter;
