"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const whitelist = [
    'http://localhost:5173', // Frontend local (React, Vite, etc.)
    'https://miappbancaria.com', // Dominio real en producción (opcional)
];
exports.corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true, // Si usarás cookies en el futuro
};
