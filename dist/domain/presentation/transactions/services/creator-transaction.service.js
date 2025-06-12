"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorTransactionService = void 0;
const custom_errors_1 = require("../../../errors/custom.errors");
class CreatorTransactionService {
    async execute(data, sessionUser) {
        console.log('Something');
        throw custom_errors_1.CustomError.badRequest('Validation failed');
    }
}
exports.CreatorTransactionService = CreatorTransactionService;
