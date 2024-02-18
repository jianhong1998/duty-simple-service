import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserAccountType } from 'src/user/enums/user-account-type.type';

export class LoginRequestDTO {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class LoginResponseDTO {
    @ApiProperty()
    @IsString()
    token: string;

    @ApiProperty()
    @IsEnum(UserAccountType)
    userAccountType: UserAccountType;

    constructor(token: string, userAccountType: UserAccountType) {
        this.token = token;
        this.userAccountType = userAccountType;
    }
}
