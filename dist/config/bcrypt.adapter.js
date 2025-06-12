"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptAdapter = void 0;
const bcryptjs_1 = require("bcryptjs");
exports.encryptAdapter = {
    hash: (password) => {
        const salt = (0, bcryptjs_1.genSaltSync)(12);
        return (0, bcryptjs_1.hashSync)(password, salt);
    },
    compare: (unHushedPassword, hasshedPassword) => {
        return (0, bcryptjs_1.compareSync)(unHushedPassword, hasshedPassword);
    },
};
