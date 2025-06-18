import { PostgresDatabase, User } from '../../../data';
import { CustomError } from '../../../domain/errors/custom.errors';

export class FinderUserService {
  async executeByFindAll() {
    const userRepository = PostgresDatabase.datasource.getRepository(User);

    return await userRepository.find({
      select: ['id', 'name', 'email', 'role'],
      where: { status: true },
      relations: { sentTransactions: true, receivedTransactions: true },
    });
  }

  async executeByFindOne(id: string) {
    const userRepository = PostgresDatabase.datasource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id, status: true },
      select: ['id', 'name', 'email', 'role'],
    });

    if (!user) throw CustomError.notFound('User not found');

    return user;
  }
}
