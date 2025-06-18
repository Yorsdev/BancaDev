"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorUserService = void 0;
const class_transformer_1 = require("class-transformer");
const bcrypt_adapter_1 = require("../../../config/bcrypt.adapter");
const data_1 = require("../../../data");
const nodemailer_adapter_1 = require("../../emails/nodemailer.adapter");
class CreatorUserService {
    constructor() {
        this.userRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.User);
        this.mailer = new nodemailer_adapter_1.NodemailerAdapter();
    }
    async execute(data) {
        const user = new data_1.User();
        user.name = data.name.trim().toLowerCase();
        user.email = data.email.trim().toLowerCase();
        user.password = bcrypt_adapter_1.encryptAdapter.hash(data.password.trim());
        user.account_number = this.generateAccountNumber();
        user.balance = 0;
        user.status = true;
        user.role = data_1.UserRole.USER;
        try {
            await this.userRepository.save(user);
            await this.mailer.sendConfirmationEmail(user.email, user.name);
            return (0, class_transformer_1.instanceToPlain)(user);
        }
        catch (error) {
            console.log('❌ Error creating user:', error);
            throw error;
        }
    }
    generateAccountNumber() {
        return Math.floor(Math.random() * 9000000000 + 1000000000).toString();
    }
}
exports.CreatorUserService = CreatorUserService;
