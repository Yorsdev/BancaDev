"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionByIdService = void 0;
const data_1 = require("../../../data");
const custom_errors_1 = require("../../../domain/errors/custom.errors");
class GetTransactionByIdService {
    constructor() {
        this.transactionRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.Transaction);
    }
    async execute(transactionId, userId) {
        const transaction = await this.transactionRepository.findOne({
            where: [
                { id: transactionId, sender: { id: userId } },
                { id: transactionId, receiver: { id: userId } },
            ],
            relations: ['sender', 'receiver'],
        });
        if (!transaction) {
            throw custom_errors_1.CustomError.notFound('Transaction not found');
        }
        return transaction;
    }
}
exports.GetTransactionByIdService = GetTransactionByIdService;
