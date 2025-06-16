"use strict";
// import { Transaction } from './transaction.model';
// import { Exclude } from 'class-transformer';
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   OneToMany,
//   BaseEntity,
// } from 'typeorm';
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
// export enum UserRole {
//   USER = 'user',
//   ADMIN = 'admin',
// }
// @Entity('users')
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;
//   @Column('varchar', {
//     length: 150,
//   })
//   name!: string;
//   @Column('varchar', {
//     length: 150,
//     unique: true,
//     nullable: false,
//   })
//   email!: string;
//   @Exclude()
//   @Column('varchar', {
//     length: 255,
//     nullable: false,
//   })
//   password!: string;
//   @Column({ length: 20 })
//   account_number!: string;
//   @Column('decimal', { precision: 10, scale: 2, default: 0 })
//   balance!: number;
//   @CreateDateColumn({ type: 'timestamp' })
//   created_at!: Date;
//   @OneToMany(() => Transaction, (transaction) => transaction.sender)
//   sentTransactions!: Transaction[];
//   @OneToMany(() => Transaction, (transaction) => transaction.receiver)
//   receivedTransactions!: Transaction[];
// }
const typeorm_1 = require("typeorm");
const transaction_model_1 = require("./transaction.model");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
    static findOne(arg0) {
        throw new Error('Method not implemented.');
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 100 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "account_number", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
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
