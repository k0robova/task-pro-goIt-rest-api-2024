import { HttpError } from "../helpers/HttpError.js";
import { trycatchFunc } from "../helpers/trycatchFunc.js";
import * as authServices from "../services/authServices.js";

export const registerUser = trycatchFunc(async (req, res) => {
  const { email, name } = req.body;
  const user = await authServices.checkIfUserExists(email);

  if (user) {
    throw HttpError(409, "User with this email exists");
  }

  const newUser = await authServices.registerUserDB({
    ...req.body,
  });

  res.status(201).json({
    user: { name, email, avatarURL: newUser.avatarURL, theme: newUser.theme },
    token: newUser.token,
  });
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
    user: {
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
      theme: newUser.theme,
    },
    token: newUser.token,
  });
});

export const getCurrentUser = trycatchFunc(async (req, res) => {
  const { name, email, avatarURL, theme } = req.user;
  res.json({ name, email, avatarURL, theme });
});

export const logoutUser = trycatchFunc(async (req, res) => {
  const { _id } = req.user;
  const user = await authServices.logoutUserDB(_id, { token: "" });
  res.status(204).json({});
});

export const updateUser = trycatchFunc(async (req, res) => {
  const { _id } = req.user;

  let avatarURL;

  if (req.file) {
    const { path: tmpUpload } = req.file;
    avatarURL = await authServices.saveAvatar(tmpUpload, _id);
  }
  // Перевірка наявності даних користувача в запиті
  if (req.body) {
    const { name, email, password } = req.body;
    const updatedUser = await authServices.updateUserData(_id, {
      name,
      email,
      password,
      avatarURL,
    });
    res.json({
      updatedUser,
    });
  }
});

export const sendMail = trycatchFunc(async (req, res) => {
  const { email, comment } = req.body;

  await authServices.sendMail(email, comment);

  res.json({ message: "Message was sent successfully!" });
});

export const updateUserTheme = trycatchFunc(async (req, res) => {
  const { _id: idOwner } = req.user;
  const { theme } = req.body;

  const updatedTheme = await authServices.updateThemeDB(idOwner, theme);

  res.status(200).json({
    email: updatedTheme.email,
    theme: updatedTheme.theme,
  });
});
