import { Request, Response } from 'express';
import { hashSync } from 'bcrypt';
import { v4 as guid } from 'uuid';
import { UserRepository } from '../repositories/user.repository';

function encodePassword(password: string): string {
  return hashSync(password, 10);
}

export async function signUpUseCase(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = {
    id: guid(),
    username: username.toLowerCase(),
    password: encodePassword(password)
  };

  const userRepository = new UserRepository();
  userRepository.insert(user)
    .then(() => res.json({ success: true }))
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    });
}
