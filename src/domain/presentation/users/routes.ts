import { Router } from 'express';
import { CreatorTransactionService } from '../transactions/services/creator-transaction.service';
import { UserController } from './controller';

export class UserRoutes {
  static get routes() {
    const router = Router();

    const creatortransactionService = new CreatorTransactionService();

    const controller = new UserController(creatortransactionService);

    router.post('/Register', controller.register.bind(controller));

    return router;
  }
}
