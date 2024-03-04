import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { HttpError } from "../helpers/HttpError.js";
import * as columnServices from "../services/columnServices.js";

export const getColumns = trycatchFunc(async (req, res) => {
  const id = req.params.boardId;
  const { _id: owner } = req.user;

  const columns = await columnServices.getAllColumns(id, owner);

  res.json(columns);
});

export const createColumn = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;

  const newColumn = await columnServices.addColumn(owner, req.body);

  if (newColumn.error) {
    throw HttpError(409, newColumn.error);
  }

  res.status(201).json(newColumn);
});

export const deleteColumn = trycatchFunc(async (req, res) => {
  const id = req.params.columnId;
  const { _id: owner } = req.user;

  const column = await columnServices.removeColumn(id, owner);

  if (!column) {
    throw HttpError(404, `Column with id ${id} not found`);
  }

  res.json({ message: "Column deleted successfully" });
});

export const updateColumnCtrl = trycatchFunc(async (req, res) => {
  const id = req.params.columnId;
  const { body } = req;
  const { _id: owner } = req.user;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedColumn = await columnServices.updateColumn(id, owner, body);

  if (!updatedColumn) {
    throw HttpError(404, `Column with id ${id} not found`);
  }

  res.json(updatedColumn);
});
