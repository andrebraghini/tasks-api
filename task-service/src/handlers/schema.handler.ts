import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { SchemaError } from '../errors/schema.error';

export function schemaHandler(schema: Joi.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true
    });

    if (validation.error) {
      return next(new SchemaError(validation.error.details));
    }

    Object.assign(req, validation.value);

    return next();
  };
}
