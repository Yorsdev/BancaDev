import { DataSource } from 'typeorm';
import { env } from '../../config/env';
import { User } from './models/user.model';
import { Transaction } from './models/transaction.model';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbName,
  synchronize: true, // solo para desarrollo
  logging: true,
  entities: [User, Transaction],
});
