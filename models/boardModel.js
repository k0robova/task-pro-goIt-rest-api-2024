import { Schema, model } from "mongoose";

const boardShcema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "four-circles",
    },
    background: {
      type: String,
      default: "1",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false }
);

export const BoardModel = model("Board", boardShcema);
