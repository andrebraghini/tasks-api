import 'dotenv/config';
import path from 'path';

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, '/src/migrations')
    }
  },

  production: {
    client: process.env.DATABASE_CLIENT || 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST || 'http://localhost',
      port: process.env.DATABASE_PORT || 3306,
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_SCHEMA || 'auth',
      supportBigNumbers: true,
      bigNumberStrings: true,
      multipleStatements: true,
      dateStrings: true
    },
    migrations: {
      directory: path.join(__dirname, '/src/migrations')
    },
    pool: {
      max: 10,
      min: 2
    },
  }

};
