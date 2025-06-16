// import { Request, Response } from 'express';
// import { CreatorTransactionService } from './services/creator-transaction.service';
// import { handleErrors } from '../common/handle.errors';

// // Extiende la interfaz Request para incluir 'user'
// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: any; // Cambia 'any' por el tipo correcto de usuario si lo tienes definido
//   }
// }

// export class TransactionsController {
//   constructor(
//     private readonly creatorTransactionService: CreatorTransactionService,
//   ) {}

//   async create(req: Request, res: Response) {
//     try {
//       const result = await this.creatorTransactionService.execute(
//         req.body,
//         req.user,
//       ); // req.user si usas auth
//       return res.status(201).json(result);
//     } catch (error) {
//       return handleErrors(error, res);
//     }
//   }
// }

import { Request, Response } from 'express';
import { CreatorTransactionService } from './services/creator-transaction.service';
import { handleErrors } from '../common/handle.errors';

export class TransactionsController {
  constructor(
    private readonly creatorTransactionService: CreatorTransactionService,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      // Reemplaza esto con tu lógica real
      const result = await this.creatorTransactionService.execute(
        req.body,
        req.body.user,
      );
      return res.status(201).json(result);
    } catch (error: any) {
      return handleErrors(res, error);
    }
  }
}
