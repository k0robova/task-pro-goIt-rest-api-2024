import { UserModel } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import sendgrid from "@sendgrid/mail";
import jwt from "jsonwebtoken";

const { SENDGRID_API_KEY, SECRET_KEY } = process.env;

export const checkIfUserExists = async (email) =>
  await UserModel.findOne({ email });

export const registerUserDB = async (userData) => {
  const user = new UserModel({ ...userData });

  await user.hashPassword();

  await user.save();

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "5h" });

  const newUser = await UserModel.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  return newUser;
};

export const loginUserDB = async (userId) => {
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "5h" });

  const newUser = await UserModel.findByIdAndUpdate(
    userId,
    { token },
    { new: true }
  );

  return newUser;
};

export const logoutUserDB = async (userId, token) => {
  const user = await UserModel.findByIdAndUpdate(userId, token);
  return user;
};

export const updateUserDB = async (formData) => {};

export const sendMail = async (email, comment) => {
  const helpEmail = {
    from: "grogulandriy1998@gmail.com",
    to: "taskpro.project@gmail.com",
    subject: "Need Help",
    html: `<h1>Email to answer: ${email}<br>Comment: ${comment}</h1>`,
    text: `Email to answer: ${email}<br>Comment: ${comment}`,
  };

  sendgrid.setApiKey(SENDGRID_API_KEY);

  await sendgrid.send(helpEmail);
  return true;
};
