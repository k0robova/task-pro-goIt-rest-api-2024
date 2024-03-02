import { Schema, model } from "mongoose";

const colomnSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false }
);

export const ColomnModel = model("Colomn", colomnSchema);
