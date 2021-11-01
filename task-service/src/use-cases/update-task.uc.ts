import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/task.repository';

export async function updateTaskUseCase(req: Request, res: Response) {
  const { id } = req.params;

  const taskRepository = new TaskRepository();
  return taskRepository.update(id, req.body)
    .then(() => res.sendStatus(204))
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    });
}
