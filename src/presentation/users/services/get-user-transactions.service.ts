import { PostgresDatabase, Transaction, User } from '../../../data';

export class GetUserTransactionsService {
  async execute(user: User) {
    const transactionRepo =
      PostgresDatabase.datasource.getRepository(Transaction);

    const transactions = await transactionRepo.find({
      where: [{ sender: { id: user.id } }, { receiver: { id: user.id } }],
      relations: ['sender', 'receiver'],
      order: { transaction_date: 'DESC' },
    });

    return transactions;
  }
}
