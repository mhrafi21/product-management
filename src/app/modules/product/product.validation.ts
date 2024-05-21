import Joi from 'joi'

// validation using Joi schema

const inventorySchema = Joi.object({
  quantity: Joi.number().integer().min(0).required(),
  inStock: Joi.boolean().required(),
})

const variantsSchema = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
})

const productJoiSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variants: Joi.array().items(variantsSchema).required(),
  inventory: inventorySchema.required(),
})


export default productJoiSchema;