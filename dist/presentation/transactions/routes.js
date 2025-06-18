"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTransactions = void 0;
const express_1 = require("express");
const creator_transaction_service_1 = require("./services/creator-transaction.service");
const controller_1 = require("./controller");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const get_transaction_history_service_1 = require("./services/get-transaction-history.service");
class UserTransactions {
    static get routes() {
        const router = (0, express_1.Router)();
        const createTransactionService = new creator_transaction_service_1.CreateTransactionService();
        const getTransactionHistoryService = new get_transaction_history_service_1.GetTransactionHistoryService();
        const controller = new controller_1.TransactionsController(createTransactionService, getTransactionHistoryService);
        router.post('/transfer', auth_middleware_1.AuthMiddleware.protect, async (req, res, next) => {
            try {
                await controller.create(req, res);
            }
            catch (next) { }
        });
        router.get('/history', auth_middleware_1.AuthMiddleware.protect, async (req, res, next) => {
            try {
                await controller.getHistory(req, res);
            }
            catch (error) {
                next(error);
            }
        });
        return router;
    }
}
exports.UserTransactions = UserTransactions;
