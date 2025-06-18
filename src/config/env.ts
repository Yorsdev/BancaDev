import 'dotenv/config';
import * as env from 'env-var';
import { get } from 'env-var';

const encodedPassword = encodeURIComponent(
  get('DATABASE_PASSWORD').required().asString(),
);
export const envs = {
  PORT: get('PORT').default(3000).required().asPortNumber(),
  NODE_ENV: get('NODE_ENV').default('development').asString(),

  //JWT Conn
  JWT_KEY: get('JWT_KEY').required().asString(),
  JWT_EXPIRATION: get('JWT_EXPIRATION').required().asString(),

  //All Database
  DATABASE_USERNAME: get('DATABASE_USERNAME').required().asString(),
  DATABASE_PASSWORD: get('DATABASE_PASSWORD').required().asString(),
  DATABASE_HOST: get('DATABASE_HOST').required().asString(),
  DATABASE_PORT: get('DATABASE_PORT').default(5432).asPortNumber(),
  DATABASE_NAME: get('DATABASE_NAME').required().asString(),
  DATABASE_URL: `postgresql://${get('DATABASE_USERNAME')
    .required()
    .asString()}:${encodedPassword}@${get('DATABASE_HOST')
    .required()
    .asString()}:${get('DATABASE_PORT').default(5432).asPortNumber()}/${get(
    'DATABASE_NAME',
  )
    .required()
    .asString()}?sslmode=require`,

  //Bcrypt
  BCRYPT_ROUNDS: env.get('BCRYPT_ROUNDS').default(10).asInt(),

  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  SEND_MAIL: get('SEND_MAIL').required().asBool(),
};
