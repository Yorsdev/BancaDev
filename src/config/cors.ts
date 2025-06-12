import { CorsOptions } from 'cors';

const whitelist = [
  'http://localhost:5173', // Frontend local (React, Vite, etc.)
  'https://miappbancaria.com', // Dominio real en producción (opcional)
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true, // Si usarás cookies en el futuro
};
