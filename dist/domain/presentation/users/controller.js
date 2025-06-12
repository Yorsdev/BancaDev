"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const handle_errors_1 = require("../common/handle.errors");
const register_user_dto_1 = require("../../dtos/register-user.dto");
class UserController {
    constructor(creatorTransactionService) {
        this.creatorTransactionService = creatorTransactionService;
        this.create = (req, res) => {
            this.creatorTransactionService
                .execute(req.body, req.sessionUser) //Modificado
                .then(() => res.status(201).json())
                .catch((error) => (0, handle_errors_1.handleErrors)(error, res));
        };
        this.register = (req, res) => {
            const [error, data] = register_user_dto_1.RegisterUserDto.execute(req.body);
            if (error) {
                return res.status(422).json({ message: error });
            }
        };
    }
}
exports.UserController = UserController;
