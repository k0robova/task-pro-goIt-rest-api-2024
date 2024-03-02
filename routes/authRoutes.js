import express from "express";
import { registerUser } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login");

authRouter.post("/logout");
authRouter.get("/current");
authRouter.patch("/user");

export default authRouter;
