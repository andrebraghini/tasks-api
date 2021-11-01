import * as Joi from 'joi';

export const getTaskSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required()
  })
});
