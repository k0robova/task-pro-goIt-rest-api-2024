import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { HttpError } from "../helpers/HttpError.js";
import {
  addColomn,
  getAllColomns,
  removeColomn,
  updateColomn,
} from "../services/colomnServices.js";

export const getColomns = trycatchFunc(async (req, res) => {
  const id = req.params.boardId;
  const { _id: owner } = req.user;

  const colomns = await getAllColomns(id, owner);

  res.json(colomns);
});

export const createColomn = trycatchFunc(async (req, res) => {
  const id = req.params.boardId;
  const { _id: owner } = req.user;

  const newColomn = await addColomn(id, owner, req.body);

  if (newColomn.error) {
    throw HttpError(409, newColomn.error);
  }

  res.status(201).json(newColomn);
});

export const deleteColomn = trycatchFunc(async (req, res) => {
  const id = req.params.colomnId;
  const { _id: owner } = req.user;

  const colomn = await removeColomn(id, owner);

  if (!colomn) {
    throw HttpError(404, `Colomn with id ${id} not found`);
  }

  res.json({ message: "Colomn deleted successfully" });
});

export const updateColomnCtrl = trycatchFunc(async (req, res) => {
  const id = req.params.colomnId;
  const { body } = req;
  const { _id: owner } = req.user;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedColomn = await updateColomn(id, owner, body);

  if (!updatedColomn) {
    throw HttpError(404, `Colomn with id ${id} not found`);
  }

  res.json(updatedColomn);
});
