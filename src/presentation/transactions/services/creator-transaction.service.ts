import { PostgresDatabase, Transaction, User } from '../../../data';
import { CustomError } from '../../../domain';

import { CreateTransactionDto } from '../../../domain/dtos/create-transactions.Dto';

export class CreateTransactionService {
  private userRepository = PostgresDatabase.datasource.getRepository(User);
  private transactionRepository =
    PostgresDatabase.datasource.getRepository(Transaction);

  async execute(dto: CreateTransactionDto, senderId: string) {
    const { amount, receiverId } = dto;

    if (senderId === receiverId) {
      throw CustomError.badRequest('Sender and receiver must be different');
    }

    const sender = await this.userRepository.findOne({
      where: { id: senderId },
    });
    const receiver = await this.userRepository.findOne({
      where: { id: receiverId },
    });

    if (!sender) throw CustomError.notFound('Sender user not found');
    if (!receiver) throw CustomError.notFound('Receiver user not found');

    if (!sender.status || !receiver.status) {
      throw CustomError.forbidden('Sender or receiver is inactive');
    }

    if (Number(sender.balance) < Number(amount)) {
      throw CustomError.unprocessableEntity('Insufficient balance');
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
