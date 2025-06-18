"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const creator_user_service_1 = require("./services/creator-user.service");
const finder_user_service_1 = require("./services/finder-user.service");
const login_user_service_1 = require("./services/login-user.service");
const auth_middleware_1 = require("../common/middleware/auth.middleware");
const get_user_transactions_service_1 = require("./services/get-user-transactions.service");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const creatorUserService = new creator_user_service_1.CreatorUserService();
        const finderUserService = new finder_user_service_1.FinderUserService();
        const loginUserService = new login_user_service_1.LoginUserService();
        const getTransactionsService = new get_user_transactions_service_1.GetUserTransactionsService();
        const controller = new controller_1.UserController(creatorUserService, finderUserService, loginUserService, getTransactionsService);
        router.post('/register', async (req, res, next) => {
            try {
                await controller.register(req, res);
            }
            catch (err) {
                next(err);
            }
        });
        router.post('/login', async (req, res, next) => {
            try {
                await controller.login(req, res);
            }
            catch (err) {
                next(err);
            }
        });
        router.get('/me', auth_middleware_1.AuthMiddleware.protect, async (req, res, next) => {
            // try {
            //   await controller.getHistory(req, res);
            // } catch (err) {
            //   next(err);
            // }
            try {
                const { user } = req;
                res.json({ id: user.id, name: user.name, email: user.email });
            }
            catch (err) {
                next(err);
            }
        });
        return router;
    }
}
exports.UserRoutes = UserRoutes;
