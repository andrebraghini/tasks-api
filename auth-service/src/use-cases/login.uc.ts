import { Request, Response } from 'express';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { env } from '../env';

function generateToken(userId: string) {
  const options = { expiresIn: env.TOKEN_EXPIRES_IN };
  const data = {
    user: {
      id: userId
    }
  };

  return sign(data, env.TOKEN_SECRET, options);
}

export async function loginUseCase(req: Request, res: Response) {
  const { username, password } = req.body;

  const userRepository = new UserRepository();
  const user = await userRepository.getByUsername(username.toLowerCase());

  if (user && compareSync(password, user.password)) {
    const access_token = generateToken(user.id);
    res.json({ access_token });
    return;
  }
  
  res.sendStatus(403);
}