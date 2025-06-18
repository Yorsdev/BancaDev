import { CustomError, LoginUserDto } from '../../../domain';
// import { User } from '../../../data';
import { PostgresDatabase, User } from '../../../data';
import { encryptAdapter } from '../../../config/bcrypt.adapter';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { envs } from '../../../config/env';

export class LoginUserService {
  async execute(data: LoginUserDto) {
    const user = await this.ensureUserExists(data.email);
    this.ensuerPasswordIsCorrect(data.password, user.password);

    const token = await this.generateToken(
      { id: user!.id },
      envs.JWT_EXPIRATION,
    );
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        rol: user.role,
      },
    };
  }
  private async ensureUserExists(email: string) {
    const userRepository = PostgresDatabase.datasource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        email,
        status: true,
      },
    });

    if (!user) {
      throw CustomError.notFound('User not found');
    }
    return user;
  }

  private ensuerPasswordIsCorrect(
    unHashedPassword: string,
    hashedPassword: string,
  ) {
    const isMatch = encryptAdapter.compare(unHashedPassword, hashedPassword);
    if (!isMatch) {
      throw CustomError.unAuthorized('Invalid credentials');
    }
  }

  private async generateToken(payload: any, duration: string) {
    const token = await JwtAdapter.generateToken(
      payload,
      duration as import('jsonwebtoken').SignOptions['expiresIn'],
    );
    if (!token) throw CustomError.internalServer('Error while creating JWT');
    return token;
  }
}
