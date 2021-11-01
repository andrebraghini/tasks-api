import 'dotenv/config';

export const env = {
  HTTP_PORT: parseInt(process.env.HTTP_PORT || '3000', 10) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'production',

  DATABASE_CLIENT: process.env.DATABASE_CLIENT || 'mysql2',
  DATABASE_HOST: process.env.DATABASE_HOST || 'http://localhost',
  DATABASE_PORT: process.env.DATABASE_PORT || 3306,
  DATABASE_USER: process.env.DATABASE_USER || 'root',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'root',
  DATABASE_SCHEMA: process.env.DATABASE_SCHEMA || 'task'
};
