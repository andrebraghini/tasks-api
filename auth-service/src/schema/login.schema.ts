import * as Joi from 'joi';

export const loginSchema = Joi.object({
  body: Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().required()
  })
});
