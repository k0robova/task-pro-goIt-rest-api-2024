import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { HttpError } from "../helpers/HttpError.js";
import {
  addBoard,
  getAllBoards,
  removeBoard,
  updateBoard,
} from "../services/boardServices.js";

export const getBoards = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;
  const boards = await getAllBoards(owner);
  res.json(boards);
});

export const deleteBoard = trycatchFunc(async (req, res) => {
  const id = req.params.boardId;
  const { _id: owner } = req.user;

  const board = await removeBoard(owner, id);

  if (!board) {
    throw HttpError(404, `Board with id ${id} not found`);
  }

  res.json({ message: "Board deleted successfully" });
});

export const createBoard = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;

  const newBoard = await addBoard(owner, req.body);

  if (newBoard.error) {
    throw HttpError(409, newBoard.error);
  }

  res.status(201).json(newBoard);
});

export const updateBoardCtrl = trycatchFunc(async (req, res) => {
  const id = req.params.boardId;
  const { body } = req;
  const { _id: owner } = req.user;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedBoard = await updateBoard(id, owner, body);

  if (!updatedBoard) {
    throw HttpError(404, `Board with id ${id} not found`);
  }

  res.json(updatedBoard);
});
