import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { registerUserDB } from "../services/authServices.js";

export const registerUser = trycatchFunc(async (req, res) => {
  const { email } = req.body;

  const newUser = await registerUserDB({ ...req.body });
  res.status(201).json({
    token: newUser.token,
    user: {
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
    },
  });
});
export const loginUser = trycatchFunc(async (req, res) => {});
export const getCurrentUser = trycatchFunc(async (req, res) => {});
export const logoutUser = trycatchFunc(async (req, res) => {});
export const updateUser = trycatchFunc(async (req, res) => {});
