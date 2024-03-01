import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { logoutUserDB } from "../services/authServices.js";

export const registerUser = trycatchFunc(async (req, res) => {});

export const loginUser = trycatchFunc(async (req, res) => {});

export const getCurrentUser = trycatchFunc(async (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
});

export const logoutUser = trycatchFunc(async (req, res) => {
  const { _id } = req.user;
  const user = logoutUserDB(_id, { token: "" });
  res.status(204).json({});
});

export const updateUser = trycatchFunc(async (req, res) => {});
