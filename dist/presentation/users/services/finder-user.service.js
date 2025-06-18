"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinderUserService = void 0;
const data_1 = require("../../../data");
const custom_errors_1 = require("../../../domain/errors/custom.errors");
class FinderUserService {
    async executeByFindAll() {
        const userRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.User);
        return await userRepository.find({
            select: ['id', 'name', 'email', 'role'],
            where: { status: true },
            relations: { sentTransactions: true, receivedTransactions: true },
        });
    }
    async executeByFindOne(id) {
        const userRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.User);
        const user = await userRepository.findOne({
            where: { id, status: true },
            select: ['id', 'name', 'email', 'role'],
        });
        if (!user)
            throw custom_errors_1.CustomError.notFound('User not found');
        return user;
    }
}
exports.FinderUserService = FinderUserService;
