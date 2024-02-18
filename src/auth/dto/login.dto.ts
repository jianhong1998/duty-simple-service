import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserAccountType } from 'src/user/enums/user-account-type.type';

export class LoginRequestDTO {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class LoginResponseDTO {
    @IsString()
    token: string;

    @IsEnum(UserAccountType)
    userAccountType: UserAccountType;

    constructor(token: string, userAccountType: UserAccountType) {
        this.token = token;
        this.userAccountType = userAccountType;
    }
}
