import { Schema, model } from "mongoose";

const boardShcema = new Schema({
  name: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    default: "default.jpg",
  },
  columns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Column",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const BoardModel = model("Board", boardShcema);
