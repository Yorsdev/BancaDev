"use strict";
// import { Request, Response } from 'express';
// import { CreatorTransactionService } from './services/creator-transaction.service';
// import { handleErrors } from '../common/handle.errors';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const handle_errors_1 = require("../common/handle.errors");
class TransactionsController {
    constructor(creatorTransactionService) {
        this.creatorTransactionService = creatorTransactionService;
    }
    async create(req, res) {
        try {
            // Reemplaza esto con tu lógica real
            const result = await this.creatorTransactionService.execute(req.body, req.body.user);
            return res.status(201).json(result);
        }
        catch (error) {
            return (0, handle_errors_1.handleErrors)(res, error);
        }
    }
}
exports.TransactionsController = TransactionsController;
