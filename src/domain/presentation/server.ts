import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import express, { Router } from 'express';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(option: Options) {
    this.port = option.port;
    this.routes = option.routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log('📦 Conecting to postgreSQL database');
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

// config(); // Carga el .env

// const PORT = process.env.PORT || 3000;

// AppDataSource.initialize()
//   .then(() => {
//     console.log('📦 Conectado a la base de datos');
//     app.listen(PORT, () => {
//       console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ Error al conectar a la base de datos', err);
//   });
