"use strict";
// export class CreateTransactionDto {
//   constructor(
//     public readonly amount: number,
//     public readonly senderId: string,
//     public readonly receiverId: string,
//   ) {}
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionDto = void 0;
//   static execute(body: any): [string?, CreateTransactionDto?] {
//     const { amount, senderId, receiverId } = body;
//     if (!amount || isNaN(amount) || amount <= 0)
//       return ['Amount must be a valid number greater than zero'];
//     if (!senderId || !receiverId)
//       return ['Sender and receiver IDs are required'];
//     if (senderId === receiverId)
//       return ['Sender and receiver cannot be the same user'];
//     return [undefined, new CreateTransactionDto(amount, senderId, receiverId)];
//   }
// }
class CreateTransactionDto {
    constructor(amount, receiverId) {
        this.amount = amount;
        this.receiverId = receiverId;
    }
    static execute(body, senderId) {
        const { amount, receiverId } = body;
        if (!amount || isNaN(amount) || amount <= 0)
            return ['Amount must be a valid number greater than zero'];
        if (!receiverId)
            return ['Receiver ID is required'];
        if (senderId === receiverId)
            return ['Sender and receiver cannot be the same user'];
        return [undefined, new CreateTransactionDto(amount, receiverId)];
    }
}
exports.CreateTransactionDto = CreateTransactionDto;
