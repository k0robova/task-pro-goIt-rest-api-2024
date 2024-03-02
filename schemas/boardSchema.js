import Joi from "joi";

export const createBoardSchema = Joi.object({
  name: Joi.string().required().label("Name").messages({
    "string.empty": '"name" cannot be an empty field',
    "any.required": 'missing required field "name"',
  }),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().required().label("Name").messages({
    "string.empty": '"name" cannot be an empty field',
  }),
});
