import { Request, Response } from 'express';
import { CreateTransactionService } from './services/creator-transaction.service';
import { handleErrors } from '../common/handle.errors';
import { CreateTransactionDto } from '../../domain/dtos/create-transactions.Dto';
import { GetTransactionHistoryService } from './services/get-transaction-history.service';
import { TransactionResponseDto } from '../../domain/dtos/transaction-response.dto';

export class TransactionsController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
    private readonly getTransactionHistoryService: GetTransactionHistoryService,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const sessionUser = (req as any).sessionUser;
      const [error, dto] = CreateTransactionDto.execute(
        req.body,
        sessionUser.id,
      );

      if (error || !dto)
        return res
          .status(400)
          .json({ message: error || 'Invalid transaction data' });

      const transaction = await this.createTransactionService.execute(
        dto,
        sessionUser.id,
      );

      return res.status(201).json(transaction);
    } catch (error: any) {
      return handleErrors(res, error);
    }
  }

  async getHistory(req: Request, res: Response): Promise<Response> {
    try {
      const sessionUser = (req as any).sessionUser;
      const transactions = await this.getTransactionHistoryService.execute(
        sessionUser.id,
      );
      const response = TransactionResponseDto.fromEntities(transactions);

      return res.json(response);
    } catch (error) {
      return handleErrors(res, error);
    }
  }
}
