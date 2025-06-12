"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTransactions = void 0;
const express_1 = require("express");
const creator_transaction_service_1 = require("./services/creator-transaction.service");
const controller_1 = require("./controller");
class UserTransactions {
    static get routes() {
        const router = (0, express_1.Router)();
        const creatortransactionService = new creator_transaction_service_1.CreatorTransactionService();
        const controller = new controller_1.TransactionsController(creatortransactionService);
        router.post('/', controller.create.bind(controller));
        return router;
    }
}
exports.UserTransactions = UserTransactions;
