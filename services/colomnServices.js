import { HttpError } from "../helpers/HttpError.js";
import { ColomnModel } from "../models/colomnModel.js";

export const getAllColomns = async (id, owner) => {
  const colomns = await ColomnModel.find({ boardId: id, owner });

  if (!colomns) {
    throw HttpError(404);
  }

  return colomns;
};

export const addColomn = async (boardId, owner, data) => {
  const exist = await ColomnModel.findOne({ title: data.title });

  if (exist) {
    return {
      error: "Colomn with such title already exists",
    };
  }
  const newColomn = await ColomnModel.create({ ...data, owner, boardId });

  return newColomn;
};

export const updateColomn = async (id, owner, data) => {
  const updatedColomn = await ColomnModel.findOneAndUpdate(
    { _id: id, owner },
    data,
    { new: true }
  );

  return updatedColomn;
};

export const removeColomn = async (id, owner) => {
  const deletedColomn = await ColomnModel.findOneAndDelete({
    _id: id,
    owner,
  });

  return deletedColomn;
};
