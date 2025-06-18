import { instanceToPlain } from 'class-transformer';
import { encryptAdapter } from '../../../config/bcrypt.adapter';
import { PostgresDatabase, User, UserRole } from '../../../data';
import { RegisterUserDto } from '../../../domain/dtos/register-user.dto';
import { NodemailerAdapter } from '../../emails/nodemailer.adapter';
import { error } from 'console';

export class CreatorUserService {
  private readonly userRepository =
    PostgresDatabase.datasource.getRepository(User);
  private readonly mailer = new NodemailerAdapter();

  async execute(data: RegisterUserDto) {
    const user = new User();

    user.name = data.name.trim().toLowerCase();
    user.email = data.email.trim().toLowerCase();
    user.password = encryptAdapter.hash(data.password.trim());
    user.account_number = this.generateAccountNumber();
    user.balance = 0;
    user.status = true;
    user.role = UserRole.USER;

    try {
      await this.userRepository.save(user);
      await this.mailer.sendConfirmationEmail(user.email, user.name);
      return instanceToPlain(user);
    } catch (error) {
      console.log('❌ Error creating user:', error);
      throw error;
    }
  }
  private generateAccountNumber(): string {
    return Math.floor(Math.random() * 9000000000 + 1000000000).toString();
  }
}
