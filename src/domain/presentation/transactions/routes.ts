import { Router } from 'express';
import { CreatorTransactionService } from './services/creator-transaction.service';
import { TransactionsController } from './controller';

export class UserTransactions {
  static get routes() {
    const router = Router();

    const creatortransactionService = new CreatorTransactionService();

    const controller = new TransactionsController(creatortransactionService);

    router.post('/', controller.create.bind(controller));

    return router;
  }
}
