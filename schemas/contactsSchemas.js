import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().min(8).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number().min(8),
});

export const updateStatusContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number().min(8),
  favorite: Joi.boolean(),
});
