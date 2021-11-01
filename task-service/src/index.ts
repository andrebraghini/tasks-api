import express from 'express';
import { env } from './env';
import { NotFoundError } from './errors/not-found.error';
import { errorHandler } from './handlers/error.handler';
import { schemaHandler } from './handlers/schema.handler';
import { addTaskSchema } from './schema/add-task.schema';
import { getTaskSchema } from './schema/get-task.schema';
import { listUserTasksSchema } from './schema/list-user-tasks.schema';
import { updateTaskSchema } from './schema/update-task.schema';
import { addTaskUseCase } from './use-cases/add-task.uc';
import { getTaskUseCase } from './use-cases/get-task.uc';
import { listUserTasksUseCase } from './use-cases/list-user-tasks.uc';
import { updateTaskUseCase } from './use-cases/update-task.uc';

const app = express();

app.use(express.json());

app.post('/tasks', schemaHandler(addTaskSchema), addTaskUseCase);
app.get('/tasks/:id', schemaHandler(getTaskSchema), getTaskUseCase);
app.get('/tasks', schemaHandler(listUserTasksSchema), listUserTasksUseCase);
app.patch('/tasks/:id', schemaHandler(updateTaskSchema), updateTaskUseCase);

app.use('*', (_req, _res, next) => next(new NotFoundError()));
app.use(errorHandler);

app.listen(env.HTTP_PORT, () => {
  console.log(`API server started at http://localhost:${env.HTTP_PORT}`);
});
