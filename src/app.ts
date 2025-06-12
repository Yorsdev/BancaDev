import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/cors';
import { json } from 'express';
import { handleErrors } from './common/middleware/handle.errors';
import { AppDataSource } from './data/postgres/postgres.database';

const app = express();

app.use(cors(corsOptions));
app.use(json());

app.get('/', (_, res) => res.send('Banking API'));
app.use(handleErrors);

export default app;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conectado a PostgreSQL');
    app.listen(env.port, () =>
      console.log(`🚀 Servidor escuchando en http://localhost:${env.port}`),
    );
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });
