"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTransactions = void 0;
const express_1 = require("express");
const creator_transaction_service_1 = require("./services/creator-transaction.service");
const controller_1 = require("./controller");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const get_transaction_history_service_1 = require("./services/get-transaction-history.service");
const get_transaction_by_Id_service_1 = require("./services/get-transaction-by-Id.service");
class UserTransactions {
    static get routes() {
        const router = (0, express_1.Router)();
        const createTransactionService = new creator_transaction_service_1.CreateTransactionService();
        const getTransactionHistoryService = new get_transaction_history_service_1.GetTransactionHistoryService();
        const getTransactionByIdService = new get_transaction_by_Id_service_1.GetTransactionByIdService();
        const controller = new controller_1.TransactionsController(createTransactionService, getTransactionHistoryService, getTransactionByIdService);
        //era transfer
        router.post('/', auth_middleware_1.AuthMiddleware.protect, async (req, res, next) => {
            try {
                await controller.create(req, res);
            }
            catch (error) {
                next(error);
            }
        });
        //era history
        router.get('/', auth_middleware_1.AuthMiddleware.protect, async (req, res, next) => {
            try {
                await controller.getHistory(req, res);
            }
            catch (error) {
                next(error);
            }
        });
        // NUEVA RUTA para obtener una transacción por id
        router.get('/:id', auth_middleware_1.AuthMiddleware.protect, async (req, res, next) => {
            try {
                await controller.getById(req, res);
            }
            catch (err) {
                next(err);
            }
        });
        return router;
    }
}
exports.UserTransactions = UserTransactions;
