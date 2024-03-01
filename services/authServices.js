// const { SECRET_KEY } = dotenvConfig;
import { UserModel } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import sendgrid from "@sendgrid/mail";

export const registerUserDB = async (formData) => {};

export const loginUserDB = async (userId) => {};

export const logoutUserDB = async (userId, token) => {
  const user = await UserModel.findByIdAndUpdate(userId, token);
  return user;
};

export const updateUserDB = async (formData) => {};

const { SENDGRID_API_KEY } = process.env;

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
