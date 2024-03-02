import Joi from "joi";

export const cardSchema = Joi.object({
  title: Joi.string().required().label("Title").messages({
    "string.empty": '"Title" не може бути порожнім',
    "any.required": '"Title" - обов\'язкове поле',
  }),
  description: Joi.string().required().label("Description").messages({
    "string.empty": '"Description" не може бути порожнім',
    "any.required": '"Description" - обов\'язкове поле',
  }),
  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("medium")
    .label("Priority")
    .messages({
      "any.only": 'Неприпустиме значення для поля "Priority"',
      "string.base": 'Поле "Priority" повинно бути рядком',
    }),
  deadline: Joi.date().required().label("Deadline").messages({
    "any.required": '"Deadline" - обов\'язкове поле',
    "date.base": 'Поле "Deadline" повинно бути датою',
  }),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().label("Title").messages({
    "string.empty": '"Title" не може бути порожнім',
  }),
  description: Joi.string().label("Description").messages({
    "string.empty": '"Description" не може бути порожнім',
  }),
  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("medium")
    .label("Priority")
    .messages({
      "any.only": 'Неприпустиме значення для поля "Priority"',
      "string.base": 'Поле "Priority" повинно бути рядком',
    }),
  deadline: Joi.date().label("Deadline").messages({
    "date.base": 'Поле "Deadline" повинно бути датою',
  }),
});
