import { Router } from 'express';
import { CreateTransactionService } from './services/creator-transaction.service';
import { TransactionsController } from './controller';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { GetTransactionHistoryService } from './services/get-transaction-history.service';
import { GetTransactionByIdService } from './services/get-transaction-by-Id.service';

export class UserTransactions {
  static get routes(): Router {
    const router = Router();

    const createTransactionService = new CreateTransactionService();
    const getTransactionHistoryService = new GetTransactionHistoryService();
    const getTransactionByIdService = new GetTransactionByIdService();
    const controller = new TransactionsController(
      createTransactionService,
      getTransactionHistoryService,
      getTransactionByIdService,
    );

    //era transfer
    router.post('/', AuthMiddleware.protect, async (req, res, next) => {
      try {
        await controller.create(req, res);
      } catch (error) {
        next(error);
      }
    });

    //era history
    router.get('/', AuthMiddleware.protect, async (req, res, next) => {
      try {
        await controller.getHistory(req, res);
      } catch (error) {
        next(error);
      }
    });

    // NUEVA RUTA para obtener una transacción por id
    router.get('/:id', AuthMiddleware.protect, async (req, res, next) => {
      try {
        await controller.getById(req, res);
      } catch (err) {
        next(err);
      }
    });

    return router;
  }
}
