"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionHistoryService = void 0;
const data_1 = require("../../../data");
const custom_errors_1 = require("../../../domain/errors/custom.errors");
class GetTransactionHistoryService {
    constructor() {
        this.transactionRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.Transaction);
    }
    async execute(userId) {
        const transactions = await this.transactionRepository.find({
            where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
            relations: ['sender', 'receiver'],
            order: { transaction_date: 'DESC' },
        });
        if (!transactions.length) {
            throw custom_errors_1.CustomError.notFound('No transaction history found for this user');
        }
        return transactions;
    }
}
exports.GetTransactionHistoryService = GetTransactionHistoryService;
