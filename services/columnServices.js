import { HttpError } from "../helpers/HttpError.js";
import { CardModel } from "../models/cardModel.js";
import { ColumnModel } from "../models/columnModel.js";

export const getAllColumns = async (id, owner) => {
  const columns = await ColumnModel.find({ boardId: id, owner });

  if (!columns) {
    throw HttpError(404);
  }

  return columns;
};

export const addColumn = async (owner, data) => {
  const exist = await ColumnModel.findOne({ title: data.title });

  if (exist) {
    return {
      error: "Column with such title already exists",
    };
  }
  const newColumn = await ColumnModel.create({ ...data, owner });

  return newColumn;
};

export const updateColumn = async (id, owner, data) => {
  const updatedColumn = await ColumnModel.findOneAndUpdate(
    { _id: id, owner },
    data,
    { new: true }
  );

  return updatedColumn;
};

export const removeColumn = async (id, owner) => {
  const deletedColumn = await ColumnModel.findOneAndDelete({
    _id: id,
    owner,
  });

  await CardModel.deleteMany({ columnId: id, owner });

  return deletedColumn;
};
