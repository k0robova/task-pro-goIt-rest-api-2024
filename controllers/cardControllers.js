import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { HttpError } from "../helpers/HttpError.js";
import {
  addCards,
  getAllCards,
  removeCard,
  updateCard,
} from "../services/cardServices.js";

export const getCards = trycatchFunc(async (req, res) => {
  const id = req.params.colomnId;
  const { _id: owner } = req.user;

  const cards = await getAllCards(id, owner);

  res.json(cards);
});

export const createCard = trycatchFunc(async (req, res) => {
  const id = req.params.colomnId;
  const { _id: owner } = req.user;
  const { body } = req;

  const newCard = await addCards(id, owner, body);

  res.status(201).json(newCard);
});

export const deleteCard = trycatchFunc(async (req, res) => {
  const id = req.params.cardId;
  const { _id: owner } = req.user;

  const card = await removeCard(id, owner);

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

  const updatedCard = await updateCard(id, owner, body);

  if (!updatedCard) {
    throw HttpError(404, `Card with id ${id} not found`);
  }

  res.json(updatedCard);
});
