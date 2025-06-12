import { Request, Response } from 'express';
import { handleErrors } from '../common/handle.errors';
import { CreatorTransactionService } from '../transactions/services/creator-transaction.service';
import { RegisterUserDto } from '../../dtos/register-user.dto';

export class UserController {
  constructor(
    private readonly creatorTransactionService: CreatorTransactionService,
  ) {}

  create = (req: Request, res: Response) => {
    this.creatorTransactionService
      .execute(req.body, (req as any).sessionUser) //Modificado
      .then(() => res.status(201).json())
      .catch((error: any) => handleErrors(error, res));
  };

  // async register = (req: Request, res: Response) => {
  //   const [error, data] = RegisterUserDto.execute(req.body);
  //   if (error) {
  //     return res.status(422).json({ message: error });
  //   }
  // };
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.creatorUserService.execute(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return handleErrors(res, error);
    }
  }
}
