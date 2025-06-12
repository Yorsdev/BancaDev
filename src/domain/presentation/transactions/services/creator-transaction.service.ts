import { CustomError } from '../../../errors/custom.errors';

export class CreatorTransactionService {
  async execute(data: any, sessionUser: any) {
    console.log('Something');

    throw CustomError.badRequest('Validation failed');
  }
}
