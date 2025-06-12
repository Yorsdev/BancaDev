import { config } from 'dotenv';

config();

export const env = {
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST!,
  dbPort: Number(process.env.DB_PORT),
  dbUsername: process.env.DB_USERNAME!,
  dbPassword: process.env.DB_PASSWORD!,
  dbName: process.env.DB_NAME!,
  jwtSecret: process.env.JWT_SECRET!,
};
