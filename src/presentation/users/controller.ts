import { Request, Response } from 'express';
import { handleErrors } from '../common/handle.errors';
import { FinderUserService } from './services/finder-user.service';
import { CreatorUserService } from './services/creator-user.service';
import { LoginUserDto } from '../../domain';
import { LoginUserService } from './services/login-user.service';
import { envs } from '../../config/env';
import { GetUserTransactionsService } from './services/get-user-transactions.service';

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly finderTransactionService: FinderUserService,
    private readonly loginUserService: LoginUserService,
    private readonly getTransactionsService: GetUserTransactionsService,
  ) {}

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.creatorUserService.execute(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return handleErrors(res, error);
    }
  }

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;
  };

  login = (req: Request, res: Response) => {
    const [error, data] = LoginUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.loginUserService
      .execute(data!)
      .then((data) => {
        res.cookie('token', data.token, {
          httpOnly: true,
          secure: envs.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3 * 60 * 60 * 1000,
        });
        res.status(200).json(data);
      })
      .catch((error) => handleErrors(res, error));
  };

  async getHistory(req: Request, res: Response): Promise<Response> {
    try {
      const sessionUser = (req as any).sessionUser;
      const result = await this.getTransactionsService.execute(sessionUser);
      return res.json(result);
    } catch (error: any) {
      return handleErrors(res, error);
    }
  }
}
