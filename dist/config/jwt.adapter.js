"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env");
class JwtAdapter {
    static async generateToken(payload, duration = '3h') {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.sign(payload, env_1.envs.JWT_KEY, { expiresIn: duration }, (error, token) => {
                if (error)
                    return resolve(null);
                resolve(token);
            });
        });
    }
    static async validateToken(token) {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.verify(token, env_1.envs.JWT_KEY, (err, decoded) => {
                if (err)
                    return resolve(null);
                resolve(decoded);
            });
        });
    }
}
exports.JwtAdapter = JwtAdapter;
