import * as Joi from 'joi';
import { Task } from '../types/task';

export const addTaskSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
    title: Joi.string().max(50).required(),
    description: Joi.string().max(100).required(),
    status: Joi.string()
      .valid(...Object.values(Task.Status))
      .required()
  })
});
