import { PostgresDatabase, Transaction } from '../../../data';
import { CustomError } from '../../../domain/errors/custom.errors';

export class GetTransactionHistoryService {
  private transactionRepository =
    PostgresDatabase.datasource.getRepository(Transaction);

  async execute(userId: string) {
    const transactions = await this.transactionRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver'],
      order: { transaction_date: 'DESC' },
    });

    if (!transactions.length) {
      throw CustomError.notFound('No transaction history found for this user');
    }

    return transactions;
  }
}
