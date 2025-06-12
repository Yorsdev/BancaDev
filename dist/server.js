"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const postgres_database_1 = require("./data/postgres/postgres-database");
const app_1 = __importDefault(require("./app"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3000;
postgres_database_1.AppDataSource.initialize()
    .then(() => {
    console.log('📦 Conectado a la base de datos');
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ Error al conectar a la base de datos', err);
});
