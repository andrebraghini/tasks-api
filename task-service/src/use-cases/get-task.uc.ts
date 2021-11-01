import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/task.repository';

export async function getTaskUseCase(req: Request, res: Response) {
  const { id } = req.params;

  const taskRepository = new TaskRepository();
  const task = await taskRepository.getById(id);

  if (!task) {
    res.sendStatus(404);
    return;
  }

  res.json(task);
}
