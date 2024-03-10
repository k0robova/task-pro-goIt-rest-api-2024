import { HttpError } from "../helpers/HttpError.js";
import { BoardModel } from "../models/boardModel.js";
import { CardModel } from "../models/cardModel.js";
import { ColumnModel } from "../models/columnModel.js";

export const getAllBoards = (owner) => BoardModel.find({ owner });

export const addBoard = async (owner, data) => {
  const exist = await BoardModel.findOne({ name: data.name, owner });

  if (exist) {
    return {
      error: "Board with such name already exists",
    };
  }

  const board = await BoardModel.create({ ...data, owner });

  return board;
};

export const updateBoard = async (boardId, owner, data) => {
  const updatedBoard = await BoardModel.findOneAndUpdate(
    {
      _id: boardId,
      owner,
    },
    data,
    {
      new: true,
    }
  );

  return updatedBoard;
};

export const removeBoard = async (owner, boardId) => {
  const deletedBoard = await BoardModel.findOneAndDelete({
    _id: boardId,
    owner,
  });
  await ColumnModel.deleteMany({ boardId, owner });
  await CardModel.deleteMany({ boardId, owner });

  if (!deletedBoard) {
    throw HttpError(404);
  }

  return true;
};
