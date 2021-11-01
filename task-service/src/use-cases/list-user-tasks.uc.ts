import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/task.repository';

export async function listUserTasksUseCase(req: Request, res: Response) {
  const { user_id } = req.query;

  const taskRepository = new TaskRepository();
  const data = await taskRepository.listByUserId(user_id as string);

  res.json({ data });
}
