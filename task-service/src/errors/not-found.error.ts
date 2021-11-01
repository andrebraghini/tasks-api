import { HttpCodedError } from './http-coded.error';

export class NotFoundError extends HttpCodedError {

  constructor(
    public message = 'Not found',
    public code = 'not_found',
    public details?: any
  ) {
    super(404, message, code, details);
  }

}