import { Schema, model } from "mongoose";

const themeList = ["light", "violet", "dark"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    theme: {
      type: String,
      enum: themeList,
      default: "light",
    },
    avatarURL: { type: String, default: "" },
    token: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

export const User = model("User", userSchema);
