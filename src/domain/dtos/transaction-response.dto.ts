import { Transaction } from '../../data';

export class TransactionResponseDto {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly transactionDate: Date,
    public readonly sender: { id: string; name: string },
    public readonly receiver: { id: string; name: string },
  ) {}

  static fromEntity(transaction: Transaction): TransactionResponseDto {
    return new TransactionResponseDto(
      transaction.id,
      transaction.amount,
      transaction.transaction_date,
      {
        id: transaction.sender.id,
        name: transaction.sender.name,
      },
      {
        id: transaction.receiver.id,
        name: transaction.receiver.name,
      },
    );
  }

  static fromEntities(transactions: Transaction[]): TransactionResponseDto[] {
    return transactions.map((t) => this.fromEntity(t));
  }
}
