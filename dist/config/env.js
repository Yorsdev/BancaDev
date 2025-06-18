"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env = __importStar(require("env-var"));
const env_var_1 = require("env-var");
const encodedPassword = encodeURIComponent((0, env_var_1.get)('DATABASE_PASSWORD').required().asString());
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').default(3000).required().asPortNumber(),
    NODE_ENV: (0, env_var_1.get)('NODE_ENV').default('development').asString(),
    //JWT Conn
    JWT_KEY: (0, env_var_1.get)('JWT_KEY').required().asString(),
    JWT_EXPIRATION: (0, env_var_1.get)('JWT_EXPIRATION').required().asString(),
    //All Database
    DATABASE_USERNAME: (0, env_var_1.get)('DATABASE_USERNAME').required().asString(),
    DATABASE_PASSWORD: (0, env_var_1.get)('DATABASE_PASSWORD').required().asString(),
    DATABASE_HOST: (0, env_var_1.get)('DATABASE_HOST').required().asString(),
    DATABASE_PORT: (0, env_var_1.get)('DATABASE_PORT').default(5432).asPortNumber(),
    DATABASE_NAME: (0, env_var_1.get)('DATABASE_NAME').required().asString(),
    DATABASE_URL: `postgresql://${(0, env_var_1.get)('DATABASE_USERNAME')
        .required()
        .asString()}:${encodedPassword}@${(0, env_var_1.get)('DATABASE_HOST')
        .required()
        .asString()}:${(0, env_var_1.get)('DATABASE_PORT').default(5432).asPortNumber()}/${(0, env_var_1.get)('DATABASE_NAME')
        .required()
        .asString()}?sslmode=require`,
    //Bcrypt
    BCRYPT_ROUNDS: env.get('BCRYPT_ROUNDS').default(10).asInt(),
    MAILER_SERVICE: (0, env_var_1.get)('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: (0, env_var_1.get)('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: (0, env_var_1.get)('MAILER_SECRET_KEY').required().asString(),
    SEND_MAIL: (0, env_var_1.get)('SEND_MAIL').required().asBool(),
};
