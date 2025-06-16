// import { User } from '../../../../data';
// import { CustomError } from '../../../errors/custom.errors';

// export class FinderUserService {
//   async executeByFindAll() {
//     return await User.find({
//       select: ['id', 'name', 'email', 'role'],
//       where: {
//         status: true,
//       },
//       relations: {
//         petPost: true,
//       },
//     });
//   }

//   async executeByFindOne(id: string) {
//     const user = await User.findOne({
//       select: ['id', 'name', 'email', 'role'],
//       where: {
//         status: true,
//         id,
//       },
//     });
//     if (!user) {
//       throw CustomError.notFound('User not found');
//     }
//     return user;
//   }
// }
// Update the import path below if the file is located elsewhere

// import { User } from '../../../../data';
// import { CustomError } from '../../../errors/custom.errors';

// const userRepository = AppDataSource.getRepository(User);

// export class FinderUserService {
//   async executeByFindAll() {
//     return await userRepository.find({
//       select: ['id', 'name', 'email', 'role'],
//       where: {
//         status: true,
//       },
//       relations: {
//         petPost: true,
//       },
//     });
//   }

//   async executeByFindOne(id: string) {
//     const user = await userRepository.findOne({
//       where: {
//         id,
//         status: true,
//       },
//       select: ['id', 'name', 'email', 'role'],
//     });

//     if (!user) {
//       throw CustomError.notFound('User not found');
//     }

//     return user;
//   }
// }

import { PostgresDatabase, User } from '../../../../data';
import { CustomError } from '../../../errors/custom.errors';

export class FinderUserService {
  async executeByFindAll() {
    const userRepository = PostgresDatabase.datasource.getRepository(User);

    return await userRepository.find({
      select: ['id', 'name', 'email', 'role'],
      where: { status: true },
      relations: { petPost: true },
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
