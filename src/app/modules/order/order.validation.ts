import Joi from "joi"

export const orderJoiSchema = Joi.object({
    email: Joi.string().email().required(),
    productId: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().positive().required()
  });
  