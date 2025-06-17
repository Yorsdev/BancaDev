"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDatabase = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("./models/user.model");
const transaction_model_1 = require("./models/transaction.model");
/**
 * Clase para gestionar la conexión a la base de datos PostgresSQL utilizando TypeORM.
 *
 * @remarks
 * Esta clase configura y establece la conexión a una base de datos PostgresSQL utilizando TypeORM.
 *
 * La conexion se configura para sincroizar la base de datos y utilizar SSL con rechazo de certificado no autorizado, en desarrollo.
 *
 * @example
 * ```typescript
 * const postgres = new PostgresDatabase({
 *   host: "localhost",
 *   port: 5432,
 *   username: "user",
 *   password: "password",
 *   database: "database",
 * });
 *
 * await postgres.connect();
 * ```
 */
class PostgresDatabase {
    /**
     * Crea una instancia de la clase PostgresDatabase.
     *
     * @param options - Opciones de configuración para la conexión a la base de datos.
     * @param options.host - Host de la base de datos.
     * @param options.port - Puerto de la base de datos.
     * @param options.username - Nombre de usuario para la conexión a la base de datos.
     * @param options.password - Contraseña para la conexión a la base de datos.
     * @param options.database - Nombre de la base de datos.
     */
    constructor(options) {
        PostgresDatabase.datasource = new typeorm_1.DataSource({
            type: 'postgres',
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            synchronize: true,
            entities: [user_model_1.User, transaction_model_1.Transaction],
            ssl: { rejectUnauthorized: false },
        });
    }
    /**
     * Establece la conexión a la base de datos.
     *
     * @returns {Promise<void>} - Una promesa que se resuelve cuando la conexión se ha establecido correctamente.
     * @throws {Error} - Si ocurre un error al intentar conectar a la base de datos.
     */
    // async connect() {
    //   try {
    //     await this.datasource.initialize();
    //     console.log('Postgres database connected!');
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    async connect() {
        try {
            await PostgresDatabase.datasource.initialize();
            console.log('Postgres database connected!');
        }
        catch (error) {
            console.error('❌ Error during conection database:', error);
            throw error;
        }
    }
}
exports.PostgresDatabase = PostgresDatabase;
