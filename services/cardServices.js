import { HttpError } from "../helpers/HttpError.js";
import { CardModel } from "../models/cardModel.js";

export const getAllCards = async (id, owner) => {
  const cards = await CardModel.find({ colomnId: id, owner });

  if (!cards) {
    throw HttpError(404);
  }

  return cards;
};

export const addCards = async (colomnId, owner, data) => {
  const exist = await CardModel.findOne({ title: data.title });

  if (exist) {
    return {
      error: "Board with such name already exists",
    };
  }
  const newCard = await CardModel.create({ ...data, owner, colomnId });
  return newCard;
};

export const updateCard = async (id, owner, data) => {
  const updatedCard = await CardModel.findOneAndUpdate(
    {
      _id: id,
      owner,
    },
    data,
    {
      new: true,
    }
  );

  return updatedCard;
};

export const removeCard = async (id, owner) => {
  const deletedCard = await CardModel.findOneAndDelete({ _id: id, owner });

  return deletedCard;
};
