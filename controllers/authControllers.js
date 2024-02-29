import { HttpError } from "../helpers/HttpError.js";
import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { User } from "../models/userModel.js";
import * as authServices from "../services/authServices.js";

export const registerUser = trycatchFunc(async (req, res) => {
  const { email, name } = req.body;

  const user = await authServices.checkIfUserExists(email);

  if (user) {
    throw HttpError(409, "User with this email exists");
  }

  const newUser = await userServices.createUser({
    ...req.body,
    avatarURL,
  });

  res.status(201).json({ user: { name, email }, token: newUser.token });
});

export const loginUser = trycatchFunc(async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.checkIfUserExists(email);

  if (!user) {
    throw HttpError(401, "Invalid email or password");
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw HttpError(401, "Invalid email or password");
  }

  const newUser = await authServices.loginUserDB(user._id);

  res.json({
    user: { name: newUser.name, email },
    token: newUser.token,
  });
});

export const getCurrentUser = trycatchFunc(async (req, res) => {
  const { name, email } = req.user;

  res.json({ name, email });
});

export const logoutUser = trycatchFunc(async (req, res) => {
  await authServices.logoutUserDB(req.user._id);

  res.json({ message: "User logout success" });
});

export const updateUserName = trycatchFunc(async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const user = await User.findByIdAndUpdate(_id, { name }, { new: true });
  res.json(user);
});

export const updateAvatar = trycatchFunc(async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(400, "You must upload avatar");
  }

  const { path: tempPath, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;

  const avatarDir = path.resolve("public", "avatar");
  const resultDir = path.resolve(avatarDir, fileName);

  await fs.rename(tempPath, resultDir);

  const avatarURL = path.join("avatar", fileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
});
