"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const regex_1 = require("../../config/regex");
class LoginUserDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static execute(object) {
        const { email, password } = object;
        if (!email)
            return ['Email is required'];
        if (!password)
            return ['Password is required'];
        if (!regex_1.regularExpressions.password.test(password))
            return [
                'Format password is invalid, it must be between 10 and 16 characters long, contain at least one uppercase letter, one lowercase letter, one special character, and one number',
            ];
        if (!regex_1.regularExpressions.email.test(email))
            return ['Format email is invalid'];
        return [
            undefined,
            new LoginUserDto(email.trim().toLowerCase(), password.trim()),
        ];
    }
}
exports.LoginUserDto = LoginUserDto;
