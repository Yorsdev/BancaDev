"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./transactions/routes");
const routes_2 = require("./users/routes");
class AppRoutes {
    static routes() {
        const router = (0, express_1.Router)();
        router.use('/api/user', routes_2.UserRoutes.routes);
        router.use('/api/transactions', routes_1.UserTransactions.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
