import { Router } from 'express';
import { CreatorTransactionService } from './services/creator-transaction.service';
import { TransactionsController } from './controller';

export class UserTransactions {
  static get routes(): Router {
    const router = Router();

    const creatortransactionService = new CreatorTransactionService();

    const controller = new TransactionsController(creatortransactionService);

    router.post('/', async (req, res, next) => {
      try {
        await controller.create(req, res);
      } catch (err) {
        next(err);
      }
    });

    return router;
  }
}
