"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionService = void 0;
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class CreateTransactionService {
    constructor() {
        this.userRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.User);
        this.transactionRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.Transaction);
    }
    async execute(dto, senderId) {
        const { amount, receiverId } = dto;
        if (senderId === receiverId) {
            throw domain_1.CustomError.badRequest('Sender and receiver must be different');
        }
        const sender = await this.userRepository.findOne({
            where: { id: senderId },
        });
        const receiver = await this.userRepository.findOne({
            where: { id: receiverId },
        });
        if (!sender)
            throw domain_1.CustomError.notFound('Sender user not found');
        if (!receiver)
            throw domain_1.CustomError.notFound('Receiver user not found');
        if (!sender.status || !receiver.status) {
            throw domain_1.CustomError.forbidden('Sender or receiver is inactive');
        }
        if (Number(sender.balance) < Number(amount)) {
            throw domain_1.CustomError.unprocessableEntity('Insufficient balance');
        }
        // Actualiza saldos
        sender.balance = Number(sender.balance) - Number(amount);
        receiver.balance = Number(receiver.balance) + Number(amount);
        const transaction = this.transactionRepository.create({
            amount,
            sender,
            receiver,
        });
        await this.transactionRepository.save(transaction);
        await this.userRepository.save([sender, receiver]);
        return {
            id: transaction.id,
            amount: transaction.amount,
            transaction_date: transaction.transaction_date,
            senderId: sender.id,
            receiverId: receiver.id,
        };
    }
}
exports.CreateTransactionService = CreateTransactionService;
