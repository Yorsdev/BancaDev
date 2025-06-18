"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const env_1 = require("./config/env");
const server_1 = require("./presentation/server");
const router_1 = require("./presentation/router");
const data_1 = require("./data");
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
async function main() {
    const postgres = new data_1.PostgresDatabase({
        username: env_1.envs.DATABASE_USERNAME,
        password: env_1.envs.DATABASE_PASSWORD,
        host: env_1.envs.DATABASE_HOST,
        port: Number(env_1.envs.DATABASE_PORT),
        database: env_1.envs.DATABASE_NAME,
    });
    await postgres.connect();
    const server = new server_1.Server({
        port: Number(env_1.envs.PORT),
        routes: router_1.AppRoutes.routes(),
    });
    await server.start();
}
main();
