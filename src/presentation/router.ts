import { Router } from 'express';
import { UserTransactions } from './transactions/routes';
import { UserRoutes } from './users/routes';

export class AppRoutes {
  static routes(): Router {
    const router = Router();

    router.use('/api/user', UserRoutes.routes);
    router.use('/api/transactions', UserTransactions.routes);

    return router;
  }
}
