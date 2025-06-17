"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorUserService = void 0;
const bcrypt_adapter_1 = require("../../../../config/bcrypt.adapter");
const data_1 = require("../../../../data");
class CreatorUserService {
    constructor() {
        this.userRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.User);
    }
    //CONTINUAR CORRIGIENDO
    async execute(data) {
        const user = new data_1.User();
        user.name = data.name.trim().toLowerCase();
        user.email = data.name.trim().toLowerCase();
        user.password = bcrypt_adapter_1.encryptAdapter.hash(data.password.trim());
        user.account_number = this.generateAccountNumber();
        user.balance = 0;
        user.status = true;
        user.role = data_1.UserRole.USER;
        try {
            await this.userRepository.save(user);
            return user;
        }
        catch (error) {
            console.log('Error creating user:', error);
            throw error;
        }
    }
    generateAccountNumber() {
        return Math.floor(Math.random() * 9000000000 + 1000000000).toString();
    }
}
exports.CreatorUserService = CreatorUserService;
