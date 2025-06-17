"use strict";
// import { User } from '../../../../data';
// import { CustomError } from '../../../errors/custom.errors';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinderUserService = void 0;
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
const data_1 = require("../../../../data");
const custom_errors_1 = require("../../../errors/custom.errors");
class FinderUserService {
    async executeByFindAll() {
        const userRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.User);
        return await userRepository.find({
            select: ['id', 'name', 'email', 'role'],
            where: { status: true },
            relations: { sentTransactions: true, receivedTransactions: true },
        });
    }
    async executeByFindOne(id) {
        const userRepository = data_1.PostgresDatabase.datasource.getRepository(data_1.User);
        const user = await userRepository.findOne({
            where: { id, status: true },
            select: ['id', 'name', 'email', 'role'],
        });
        if (!user)
            throw custom_errors_1.CustomError.notFound('User not found');
        return user;
    }
}
exports.FinderUserService = FinderUserService;
