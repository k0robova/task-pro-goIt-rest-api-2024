import { HttpError } from "../helpers/HttpError.js";
import { BoardModel } from "../models/boardModel.js";

export const getAllBoards = (owner) => BoardModel.find({ owner });

export const getBoard = async (id, owner) => {
  const board = await BoardModel.findOne({ _id: id, owner });

  if (!board) {
    throw HttpError(404);
  }
};

export const addBoard = async (owner, data) => {
  const exist = await BoardModel.findOne({ name: data.name });

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

  if (!deletedBoard) {
    throw HttpError(404);
  }
};
