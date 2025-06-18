"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./transactions/routes");
const routes_2 = require("./users/routes");
class AppRoutes {
    static routes() {
        const router = (0, express_1.Router)();
        router.use('/api/auth', routes_2.UserRoutes.routes); //Para register y Login
        router.use('/api/users', routes_2.UserRoutes.routes); // para me
        router.use('/api/transactions', routes_1.UserTransactions.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
