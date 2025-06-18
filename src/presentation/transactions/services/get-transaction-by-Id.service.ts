import { PostgresDatabase, Transaction } from '../../../data';
import { CustomError } from '../../../domain/errors/custom.errors';

export class GetTransactionByIdService {
  private transactionRepository =
    PostgresDatabase.datasource.getRepository(Transaction);

  async execute(transactionId: string, userId: string) {
    const transaction = await this.transactionRepository.findOne({
      where: [
        { id: transactionId, sender: { id: userId } },
        { id: transactionId, receiver: { id: userId } },
      ],
      relations: ['sender', 'receiver'],
    });

    if (!transaction) {
      throw CustomError.notFound('Transaction not found');
    }

    return transaction;
  }
}
