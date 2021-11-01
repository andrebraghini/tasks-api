import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/task.repository';

export async function addTaskUseCase(req: Request, res: Response) {
  const taskRepository = new TaskRepository();
  return taskRepository.insert(req.body)
    .then(() => res.sendStatus(201))
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    });
}
