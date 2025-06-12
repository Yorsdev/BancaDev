import { regularExpressions } from '../../config/regex';

export class RegisterUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  static execute(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ['Name is required'];
    if (!email) return ['Email is required'];
    if (!regularExpressions.email.test(email)) return ['Email is valid'];
    if (!password) return ['Password is required'];
    if (!regularExpressions.password.test(password))
      return [
        'Format password is invalid, it must be between 10 and 16 characters long, contain at least one uppercase letter, one lowercase letter, one special character, and one number',
      ];

    return [
      undefined,
      new RegisterUserDto(
        name.trim().toLowerCase(),
        email.trim().toLowerCase(),
        password.trim(),
      ),
    ];
  }
}
