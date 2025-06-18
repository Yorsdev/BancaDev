"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const custom_errors_1 = require("../../domain/errors/custom.errors");
const handleErrors = (res, error) => {
    if (error instanceof custom_errors_1.CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
};
exports.handleErrors = handleErrors;
