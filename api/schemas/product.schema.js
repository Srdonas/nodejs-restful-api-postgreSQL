// Validar la data que nos manda el cliente
const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().min(10);
const description = Joi.string().max(250);
const image = Joi.string().uri();

const createProductSchema= Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
});

const updateProductSchema= Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
});

const getProductsSchema= Joi.object({
  id: id.required()
});

const deleteProductSchema= Joi.object({
  id: id.required()
});


module.exports = { createProductSchema, updateProductSchema, getProductsSchema, deleteProductSchema };
