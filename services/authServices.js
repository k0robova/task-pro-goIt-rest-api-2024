import { UserModel } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import sendgrid from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import bcryptjs from "bcryptjs";

const {
  SENDGRID_API_KEY,
  SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

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

export const saveAvatar = async (tmpUpload, _id) => {
  //   cloud_name: "dna5uh3r0",
  //     api_key: "116844259184423",
  //       api_secret: "aZa8sdqU44SyirU3ogCS0VKQLSY",

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  const result = await cloudinary.uploader.upload(tmpUpload);
  return result.url;
};

export const updateUserData = async (userId, updatedData) => {
  if (updatedData.password) {
    updatedData.password = await bcryptjs.hash(updatedData.password, 10);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
    new: true,
  });

  updatedUser.password = undefined;
  return updatedUser || null;
};

export const updateThemeDB = async (idOwner, theme) => {
  const updateTheme = await UserModel.findOneAndUpdate(
    idOwner,
    { theme },
    { new: true }
  );
  return updateTheme;
};
