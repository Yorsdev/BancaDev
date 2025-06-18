"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const transaction_model_1 = require("./transaction.model");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "client";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ unique: true, length: 100 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "account_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)('enum', {
        enum: UserRole,
        default: UserRole.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)('boolean', {
        nullable: false,
        default: true,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_model_1.Transaction, (transaction) => transaction.sender),
    __metadata("design:type", Array)
], User.prototype, "sentTransactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_model_1.Transaction, (transaction) => transaction.receiver),
    __metadata("design:type", Array)
], User.prototype, "receivedTransactions", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
