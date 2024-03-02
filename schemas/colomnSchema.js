import Joi from "joi";

export const createColomnSchema = Joi.object({
  title: Joi.string().required().label("Title").messages({
    "string.empty": '"title" cannot be an empty field',
    "any.required": 'missing required field "title"',
  }),
});

export const updateColomnSchema = Joi.object({
  title: Joi.string().label("Title").messages({
    "string.empty": '"title" не може бути порожнім полем',
  }),
});
