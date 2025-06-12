"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const creator_transaction_service_1 = require("../transactions/services/creator-transaction.service");
const controller_1 = require("./controller");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const creatortransactionService = new creator_transaction_service_1.CreatorTransactionService();
        const controller = new controller_1.UserController(creatortransactionService);
        router.post('/Register', controller.register.bind(controller));
        return router;
    }
}
exports.UserRoutes = UserRoutes;
