import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { HttpError } from "../helpers/HttpError.js";
import * as cardServices from "../services/cardServices.js";

export const getCards = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;
  const id = req.params.boardId;

  const cards = await cardServices.getAllCards(id, owner);

  res.json(cards);
});

export const createCard = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;
  const { body } = req;

  const newCard = await cardServices.addCards(owner, body);

  res.status(201).json(newCard);
});

export const deleteCard = trycatchFunc(async (req, res) => {
  const id = req.params.cardId;
  const { _id: owner } = req.user;

  const card = await cardServices.removeCard(id, owner);

  if (!card) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json({ message: "Card deleted successfully" });
});

export const updateCardCtrl = trycatchFunc(async (req, res) => {
  const id = req.params.cardId;
  const { body } = req;
  const { _id: owner } = req.user;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedCard = await cardServices.updateCard(id, owner, body);

  if (!updatedCard) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json(updatedCard);
});

export const updateColumnIdInCardCtrl = trycatchFunc(async (req, res) => {
  const id = req.params.cardId;
  const { body } = req;
  const { _id: owner } = req.user;

  const updateCard = await cardServices.updateColumnIdInCard(id, owner, body);

  if (!updateCard) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  console.log(updateCard);

  res.json(updateCard);
});
