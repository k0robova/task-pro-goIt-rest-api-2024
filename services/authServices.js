import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_KEY } = process.env;

export const registerUserDB = async (formData) => {
  const user = new UserModel({ ...formData });

  await user.save();

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  const newUser = await UserModel.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  return newUser;
};

export const loginUserDB = async (userId) => {};

export const logoutUserDB = async (userId) => {};

export const updateUserDB = async (formData) => {};
