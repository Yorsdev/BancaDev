import { encryptAdapter } from '../../../../config/bcrypt.adapter';
import { PostgresDatabase, User, UserRole } from '../../../../data';
import { RegisterUserDto } from '../../../dtos/register-user.dto';

export class CreatorUserService {
  private readonly userRepository =
    PostgresDatabase.datasource.getRepository(User);
  //CONTINUAR CORRIGIENDO

  async execute(data: RegisterUserDto) {
    const user = new User();

    user.name = data.name.trim().toLowerCase();
    user.email = data.name.trim().toLowerCase();
    user.password = encryptAdapter.hash(data.password.trim());
    user.account_number = this.generateAccountNumber();
    user.balance = 0;
    user.status = true;
    user.role = UserRole.USER;

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log('Error creating user:', error);
      throw error;
    }
  }

  private generateAccountNumber(): string {
    return Math.floor(Math.random() * 9000000000 + 1000000000).toString();
  }
}
