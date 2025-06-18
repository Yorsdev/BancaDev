import { regularExpressions } from '../../config/regex';

export class LoginUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static execute(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;
    if (!email) return ['Email is required'];
    if (!password) return ['Password is required'];
    if (!regularExpressions.password.test(password))
      return [
        'Format password is invalid, it must be between 10 and 16 characters long, contain at least one uppercase letter, one lowercase letter, one special character, and one number',
      ];

    if (!regularExpressions.email.test(email))
      return ['Format email is invalid'];

    return [
      undefined,
      new LoginUserDto(email.trim().toLowerCase(), password.trim()),
    ];
  }
}
