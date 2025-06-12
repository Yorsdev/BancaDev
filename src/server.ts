import 'reflect-metadata';
import app from './app';
import { config } from 'dotenv';
import { AppDataSource } from './data/postgres/postgres.database';

config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos', err);
  });
