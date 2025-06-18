"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionResponseDto = void 0;
class TransactionResponseDto {
    constructor(id, amount, transactionDate, sender, receiver) {
        this.id = id;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.sender = sender;
        this.receiver = receiver;
    }
    static fromEntity(transaction) {
        return new TransactionResponseDto(transaction.id, transaction.amount, transaction.transaction_date, {
            id: transaction.sender.id,
            name: transaction.sender.name,
        }, {
            id: transaction.receiver.id,
            name: transaction.receiver.name,
        });
    }
    static fromEntities(transactions) {
        return transactions.map((t) => this.fromEntity(t));
    }
}
exports.TransactionResponseDto = TransactionResponseDto;
