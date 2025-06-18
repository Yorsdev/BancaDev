"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const handle_errors_1 = require("../common/handle.errors");
const domain_1 = require("../../domain");
const env_1 = require("../../config/env");
class UserController {
    constructor(creatorUserService, finderTransactionService, loginUserService, getTransactionsService) {
        this.creatorUserService = creatorUserService;
        this.finderTransactionService = finderTransactionService;
        this.loginUserService = loginUserService;
        this.getTransactionsService = getTransactionsService;
        this.findOne = (req, res) => {
            const { id } = req.params;
        };
        this.login = (req, res) => {
            const [error, data] = domain_1.LoginUserDto.execute(req.body);
            if (error) {
                return res.status(422).json({ message: error });
            }
            this.loginUserService
                .execute(data)
                .then((data) => {
                res.cookie('token', data.token, {
                    httpOnly: true,
                    secure: env_1.envs.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 3 * 60 * 60 * 1000,
                });
                res.status(200).json(data);
            })
                .catch((error) => (0, handle_errors_1.handleErrors)(res, error));
        };
    }
    async register(req, res) {
        try {
            const result = await this.creatorUserService.execute(req.body);
            return res.status(201).json(result);
        }
        catch (error) {
            return (0, handle_errors_1.handleErrors)(res, error);
        }
    }
    async getHistory(req, res) {
        try {
            const sessionUser = req.sessionUser;
            const result = await this.getTransactionsService.execute(sessionUser);
            return res.json(result);
        }
        catch (error) {
            return (0, handle_errors_1.handleErrors)(res, error);
        }
    }
}
exports.UserController = UserController;
