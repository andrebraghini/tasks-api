import 'dotenv/config';

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  TOKEN_SECRET: process.env.TOKEN_SECRET || '',
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  TASK_SERVICE_URL: process.env.TASK_SERVICE_URL,
  INTROSPECTION: process.env.INTROSPECTION === 'true'
};
