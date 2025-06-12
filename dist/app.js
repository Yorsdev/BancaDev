"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const express_2 = require("express");
const handle_errors_1 = require("./common/middleware/handle.errors");
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_2.corsOptions));
app.use((0, express_2.json)());
app.get('/', (_, res) => res.send('Banking API'));
app.use(handle_errors_1.HandleErrors);
exports.default = app;
