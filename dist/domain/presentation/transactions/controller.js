"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const handle_errors_1 = require("../common/handle.errors");
class TransactionsController {
    constructor(creatorTransactionService) {
        this.creatorTransactionService = creatorTransactionService;
    }
    async create(req, res) {
        try {
            const result = await this.creatorTransactionService.execute(req.body, req.user); // req.user si usas auth
            return res.status(201).json(result);
        }
        catch (error) {
            return (0, handle_errors_1.handleErrors)(error, res);
        }
    }
}
exports.TransactionsController = TransactionsController;
