import { Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { env } from './env';

export const context = (config: any) => {
  const req: Request = config.req;
  const tokenWithBearer = req.get('Authorization') || '';
  const token = tokenWithBearer.split(' ').pop();

  let user;
  if (token) {
    try {
      const tokenData = verify(token, env.TOKEN_SECRET) as JwtPayload;
      user = tokenData.user;
    } catch (error) {}
  }

  return {
    user
  };
}
