"use strict";
// import { Router } from 'express';
// import { CreatorTransactionService } from '../transactions/services/creator-transaction.service';
// import { UserController } from './controller';
// import { CreatorUserService } from './services/creator-user.service';
// import { FinderUserService } from './services/finder-user.service';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
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
const express_1 = require("express");
const controller_1 = require("./controller");
const creator_user_service_1 = require("./services/creator-user.service");
const finder_user_service_1 = require("./services/finder-user.service");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const creatorUserService = new creator_user_service_1.CreatorUserService();
        const finderUserService = new finder_user_service_1.FinderUserService();
        const controller = new controller_1.UserController(creatorUserService, finderUserService);
        router.post('/Register', async (req, res, next) => {
            try {
                await controller.register(req, res);
            }
            catch (err) {
                next(err);
            }
        });
        return router;
    }
}
exports.UserRoutes = UserRoutes;
