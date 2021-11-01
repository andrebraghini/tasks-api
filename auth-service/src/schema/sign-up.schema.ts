import * as Joi from 'joi';

export const signUpSchema = Joi.object({
  body: Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().required()
  })
});