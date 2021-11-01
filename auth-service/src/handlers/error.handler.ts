import { Request, Response, NextFunction } from 'express';
import { HttpCodedError } from '../errors/http-coded.error';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpCodedError) {
    res.status(err.statusCode).send({
      success: false,
      error: err.toJSON()
    });
    return next();
  }

  console.error(err);
  return res
    .status(500)
    .send({
      success: false,
      error: {
        code: 'internal_server_error',
        message: 'Internal server error'
      }
    });
}
