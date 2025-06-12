"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require("reflect-metadata");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
class Server {
    constructor(option) {
        this.app = (0, express_1.default)();
        this.port = option.port;
        this.routes = option.routes;
    }
    async start() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(this.routes);
        this.app.listen(this.port, () => {
            console.log('📦 Conecting to postgreSQL database');
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
exports.Server = Server;
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
