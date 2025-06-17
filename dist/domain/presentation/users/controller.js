"use strict";
// import { Request, Response } from 'express';
// import { handleErrors } from '../common/handle.errors';
// import { CreatorTransactionService } from '../transactions/services/creator-transaction.service';
// import { RegisterUserDto } from '../../dtos/register-user.dto';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const handle_errors_1 = require("../common/handle.errors");
class UserController {
    constructor(creatorUserService, finderTransactionService) {
        this.creatorUserService = creatorUserService;
        this.finderTransactionService = finderTransactionService;
        this.findOne = (req, res) => {
            const { id } = req.params;
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
}
exports.UserController = UserController;
