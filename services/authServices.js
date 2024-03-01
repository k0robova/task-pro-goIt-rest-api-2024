// const { SECRET_KEY } = dotenvConfig;
import { UserModel } from "../models/userModel.js";

export const registerUserDB = async (formData) => {};

export const loginUserDB = async (userId) => {};

export const logoutUserDB = async (userId, token) => {
  const user = await UserModel.findByIdAndUpdate(userId, token);
  return user;
};

export const updateUserDB = async (formData) => {};
