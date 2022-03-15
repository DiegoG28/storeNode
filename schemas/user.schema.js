const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const last = Joi.string().min(3).max(15);
const gender = Joi.string();

const createUserSchema = Joi.object({
   name: name.required(),
   last: last.required(),
   gender: gender.required()
});

const updateUserSchema = Joi.object({
   id: id,
   name: name,
   last: last,
   gender: gender
}).min(1);

const getUserSchema = Joi.object({
   id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
