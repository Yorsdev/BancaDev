import { Router } from 'express';
import { UserController } from './controller';
import { CreatorUserService } from './services/creator-user.service';
import { FinderUserService } from './services/finder-user.service';
import { LoginUserService } from './services/login-user.service';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { GetUserTransactionsService } from './services/get-user-transactions.service';
import { get } from 'http';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const creatorUserService = new CreatorUserService();
    const finderUserService = new FinderUserService();
    const loginUserService = new LoginUserService();
    const getTransactionsService = new GetUserTransactionsService();

    const controller = new UserController(
      creatorUserService,
      finderUserService,
      loginUserService,
      getTransactionsService,
    );

    router.post('/register', async (req, res, next) => {
      try {
        await controller.register(req, res);
      } catch (err) {
        next(err);
      }
    });
    router.post('/login', async (req, res, next) => {
      try {
        await controller.login(req, res);
      } catch (err) {
        next(err);
      }
    });
    router.get('/me', AuthMiddleware.protect, async (req, res, next) => {
      // try {
      //   await controller.getHistory(req, res);
      // } catch (err) {
      //   next(err);
      // }
      try {
        const { user } = req as any;
        res.json({ id: user.id, name: user.name, email: user.email });
      } catch (err) {
        next(err);
      }
    });

    return router;
  }
}
