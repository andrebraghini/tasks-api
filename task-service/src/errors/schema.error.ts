import * as Joi from 'joi';
import { HttpCodedError } from './http-coded.error';

export class SchemaError extends HttpCodedError {

  constructor(details: Joi.ValidationErrorItem[]) {
    super(400, 'Invalid request data', 'invalid_request_data', details);
  }
  
}
