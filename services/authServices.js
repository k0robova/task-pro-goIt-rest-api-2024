import dotenvConfig from "../dotenvConfig.js";
import { User } from "../models/userModel.js";

const { SECRET_KEY } = dotenvConfig;

export const checkIfUserExists = async email => await User.findOne({ email });

export const registerUserDB = async formData => {
  const user = new User({ ...formData });

  await user.hashPassword();

  await user.save();

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "5h" });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  return newUser;
};

export const loginUserDB = async userId => {
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "5h" });

  const newUser = await User.findByIdAndUpdate(
    userId,
    { token },
    { new: true }
  );

  return newUser;
};

export const logoutUserDB = async userId => {await User.findByIdAndUpdate(userId, { token: "" });};

export const updateUserDB = async formData => {};
