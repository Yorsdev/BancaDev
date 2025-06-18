import 'reflect-metadata';
import { envs } from './config/env';
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/router';
import { PostgresDatabase } from './data';

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

async function main() {
  const postgres = new PostgresDatabase({
    username: envs.DATABASE_USERNAME,
    password: envs.DATABASE_PASSWORD,
    host: envs.DATABASE_HOST,
    port: Number(envs.DATABASE_PORT),
    database: envs.DATABASE_NAME,
  });
  await postgres.connect();

  const server = new Server({
    port: Number(envs.PORT),
    routes: AppRoutes.routes(),
  });

  await server.start();
}
main();
