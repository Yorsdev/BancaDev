import { Router } from 'express';
import { UserTransactions } from './transactions/routes';
import { UserRoutes } from './users/routes';

export class AppRoutes {
  static routes(): Router {
    const router = Router();

    router.use('/api/auth', UserRoutes.routes); //Para register y Login
    router.use('/api/users', UserRoutes.routes); // para me
    router.use('/api/transactions', UserTransactions.routes);

    return router;
  }
}
