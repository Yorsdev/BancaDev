// import { Router } from 'express';
// import { CreatorTransactionService } from '../transactions/services/creator-transaction.service';
// import { UserController } from './controller';
// import { CreatorUserService } from './services/creator-user.service';
// import { FinderUserService } from './services/finder-user.service';

// export class UserRoutes {
//   static get routes(): Router {
//     const router = Router();

//     const creatorUserService = new CreatorUserService();

//     const controller = new UserController();

//     router.post('/Register', async (req, res, next) => {
//       try {
//         await controller.register(req, res);
//       } catch (err) {
//         next(err);
//       }
//     });

//     return router;
//   }
// }
import { Router } from 'express';
import { UserController } from './controller';
import { CreatorUserService } from './services/creator-user.service';
import { FinderUserService } from './services/finder-user.service';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const creatorUserService = new CreatorUserService();
    const finderUserService = new FinderUserService();

    const controller = new UserController(
      creatorUserService,
      finderUserService,
    );

    router.post('/Register', async (req, res, next) => {
      try {
        await controller.register(req, res);
      } catch (err) {
        next(err);
      }
    });

    return router;
  }
}
