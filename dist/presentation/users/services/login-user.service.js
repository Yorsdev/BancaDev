"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserService = void 0;
const domain_1 = require("../../../domain");
// import { User } from '../../../data';
const data_1 = require("../../../data");
const bcrypt_adapter_1 = require("../../../config/bcrypt.adapter");
const jwt_adapter_1 = require("../../../config/jwt.adapter");
const env_1 = require("../../../config/env");
class LoginUserService {
    async execute(data) {
        const user = await this.ensureUserExists(data.email);
        this.ensuerPasswordIsCorrect(data.password, user.password);
        const token = await this.generateToken({ id: user.id }, env_1.envs.JWT_EXPIRATION);
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                rol: user.role,
            },
        };
    }
    async ensureUserExists(email) {
        const userRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.User);
        const user = await userRepository.findOne({
            where: {
                email,
                status: true,
            },
        });
        if (!user) {
            throw domain_1.CustomError.notFound('User not found');
        }
        return user;
    }
    ensuerPasswordIsCorrect(unHashedPassword, hashedPassword) {
        const isMatch = bcrypt_adapter_1.encryptAdapter.compare(unHashedPassword, hashedPassword);
        if (!isMatch) {
            throw domain_1.CustomError.unAuthorized('Invalid credentials');
        }
    }
    async generateToken(payload, duration) {
        const token = await jwt_adapter_1.JwtAdapter.generateToken(payload, duration);
        if (!token)
            throw domain_1.CustomError.internalServer('Error while creating JWT');
        return token;
    }
}
exports.LoginUserService = LoginUserService;
