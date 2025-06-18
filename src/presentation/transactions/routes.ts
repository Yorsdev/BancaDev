import { Router } from 'express';
import { CreateTransactionService } from './services/creator-transaction.service';
import { TransactionsController } from './controller';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { GetTransactionHistoryService } from './services/get-transaction-history.service';

export class UserTransactions {
  static get routes(): Router {
    const router = Router();

    const createTransactionService = new CreateTransactionService();
    const getTransactionHistoryService = new GetTransactionHistoryService();
    const controller = new TransactionsController(
      createTransactionService,
      getTransactionHistoryService,
    );

    router.post('/transfer', AuthMiddleware.protect, async (req, res, next) => {
      try {
        await controller.create(req, res);
      } catch (next) {}
    });

    router.get('/history', AuthMiddleware.protect, async (req, res, next) => {
      try {
        await controller.getHistory(req, res);
      } catch (error) {
        next(error);
      }
    });

    return router;
  }
}
