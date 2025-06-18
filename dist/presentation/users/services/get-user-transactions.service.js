"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserTransactionsService = void 0;
const data_1 = require("../../../data");
class GetUserTransactionsService {
    async execute(user) {
        const transactionRepo = data_1.PostgresDatabase.datasource.getRepository(data_1.Transaction);
        const transactions = await transactionRepo.find({
            where: [{ sender: { id: user.id } }, { receiver: { id: user.id } }],
            relations: ['sender', 'receiver'],
            order: { transaction_date: 'DESC' },
        });
        return transactions;
    }
}
exports.GetUserTransactionsService = GetUserTransactionsService;
