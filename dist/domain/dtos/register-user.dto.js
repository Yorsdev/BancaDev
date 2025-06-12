"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const regex_1 = require("../../config/regex");
class RegisterUserDto {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static execute(object) {
        const { name, email, password } = object;
        if (!name)
            return ['Name is required'];
        if (!email)
            return ['Email is required'];
        if (!regex_1.regularExpressions.email.test(email))
            return ['Email is valid'];
        if (!password)
            return ['Password is required'];
        if (!regex_1.regularExpressions.password.test(password))
            return [
                'Format password is invalid, it must be between 10 and 16 characters long, contain at least one uppercase letter, one lowercase letter, one special character, and one number',
            ];
        return [
            undefined,
            new RegisterUserDto(name.trim().toLowerCase(), email.trim().toLowerCase(), password.trim()),
        ];
    }
}
exports.RegisterUserDto = RegisterUserDto;
