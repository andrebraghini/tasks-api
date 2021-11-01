import * as Joi from 'joi';

export const listUserTasksSchema = Joi.object({
  query: Joi.object({
    user_id: Joi.string().uuid().required()
  })
});
