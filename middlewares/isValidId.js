import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/HttpError.js";

export const isValidBoardsId = (req, _, next) => {
  const id = req.params.boardId;

  if (!isValidObjectId(id)) {
    next(HttpError(400, `Requested id(${id}) is invalid`));
    return;
  }

  next();
};

export const isValidColomnsId = (req, _, next) => {
  const id = req.params.colomnId;

  if (!isValidObjectId(id)) {
    next(HttpError(400, `Requested id(${id}) is invalid`));
    return;
  }

  next();
};

export const isValidCardId = (req, _, next) => {
  const id = req.params.cardId;

  if (!isValidObjectId(id)) {
    next(HttpError(400, `Requested id(${id}) is invalid`));
    return;
  }

  next();
};
