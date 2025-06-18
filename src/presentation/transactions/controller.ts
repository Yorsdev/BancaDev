import { Request, Response } from 'express';
import { CreateTransactionService } from './services/creator-transaction.service';
import { CreateTransactionDto } from '../../domain/dtos/create-transactions.Dto';
import { GetTransactionHistoryService } from './services/get-transaction-history.service';
import { TransactionResponseDto } from '../../domain/dtos/transaction-response.dto';
import { GetTransactionByIdService } from './services/get-transaction-by-Id.service';
import { handleErrors } from '../common/handle.errors';

export class TransactionsController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
    private readonly getTransactionHistoryService: GetTransactionHistoryService,
    private readonly getTransactionByIdService: GetTransactionByIdService,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const sessionUser = (req as any).user;
      console.log('🧠 sessionUser:', sessionUser);
      console.log('📥 req.body:', req.body);
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
      const sessionUser = (req as any).user;
      const transactions = await this.getTransactionHistoryService.execute(
        sessionUser.id,
      );
      const response = TransactionResponseDto.fromEntities(transactions);

      return res.json(response);
    } catch (error) {
      return handleErrors(res, error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { user: sessionUser } = req as any;

      console.log('📥 GET /transactions/:id → ID:', id);
      console.log('🧠 Usuario autenticado:', sessionUser);

      const transaction = await this.getTransactionByIdService.execute(
        id,
        sessionUser.id,
      );
      return res.json(transaction);
    } catch (error) {
      console.log('❌ Error en getById:', error);
      return handleErrors(res, error);
    }
  }
}
