import * as Joi from 'joi';
import { Task } from '../types/task';

export const updateTaskSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required()
  }),
  body: Joi.object({
    title: Joi.string().max(50),
    description: Joi.string().max(100),
    status: Joi.string()
      .valid(...Object.values(Task.Status))
  })
});
