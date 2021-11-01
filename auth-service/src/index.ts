import express from 'express';
import { env } from './env';
import { NotFoundError } from './errors/not-found.error';
import { errorHandler } from './handlers/error.handler';
import { schemaHandler } from './handlers/schema.handler';
import { loginSchema } from './schema/login.schema';
import { signUpSchema } from './schema/sign-up.schema';
import { loginUseCase } from './use-cases/login.uc';
import { signUpUseCase } from './use-cases/sign-up.uc';

const app = express();

app.use(express.json());

app.post('/login', schemaHandler(loginSchema), loginUseCase);
app.post('/sign-up', schemaHandler(signUpSchema), signUpUseCase);

app.use('*', (_req, _res, next) => next(new NotFoundError()));
app.use(errorHandler);

app.listen(env.HTTP_PORT, () => {
  console.log(`API server started at http://localhost:${env.HTTP_PORT}`);
});
