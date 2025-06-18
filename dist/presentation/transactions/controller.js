"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const handle_errors_1 = require("../common/handle.errors");
const create_transactions_Dto_1 = require("../../domain/dtos/create-transactions.Dto");
const transaction_response_dto_1 = require("../../domain/dtos/transaction-response.dto");
class TransactionsController {
    constructor(createTransactionService, getTransactionHistoryService) {
        this.createTransactionService = createTransactionService;
        this.getTransactionHistoryService = getTransactionHistoryService;
    }
    async create(req, res) {
        try {
            const sessionUser = req.sessionUser;
            const [error, dto] = create_transactions_Dto_1.CreateTransactionDto.execute(req.body, sessionUser.id);
            if (error || !dto)
                return res
                    .status(400)
                    .json({ message: error || 'Invalid transaction data' });
            const transaction = await this.createTransactionService.execute(dto, sessionUser.id);
            return res.status(201).json(transaction);
        }
        catch (error) {
            return (0, handle_errors_1.handleErrors)(res, error);
        }
    }
    async getHistory(req, res) {
        try {
            const sessionUser = req.sessionUser;
            const transactions = await this.getTransactionHistoryService.execute(sessionUser.id);
            const response = transaction_response_dto_1.TransactionResponseDto.fromEntities(transactions);
            return res.json(response);
        }
        catch (error) {
            return (0, handle_errors_1.handleErrors)(res, error);
        }
    }
}
exports.TransactionsController = TransactionsController;
