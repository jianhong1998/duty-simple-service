import { IsEmail, IsEnum, IsNumber } from 'class-validator';
import { UserAccountType } from '../enums/user-account-type.type';
import {
    IUserCreation,
    IUserCreationResponse,
} from '../types/user-creation.type';
import { UserAccountStatus } from '../enums/user-account-status.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDTO
    implements Omit<IUserCreation, 'password' | 'accountStatus'>
{
    @ApiProperty()
    @IsEmail()
    emailAddress: string;

    @ApiProperty()
    @IsEnum(UserAccountType)
    accountType: UserAccountType;
}

export class CreateUserResponseDTO implements IUserCreationResponse {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsEnum(UserAccountStatus)
    accountStatus: UserAccountStatus;

    @ApiProperty()
    @IsEnum(UserAccountType)
    accountType: UserAccountType;

    @ApiProperty()
    @IsEmail()
    emailAddress: string;

    constructor(newUser: IUserCreationResponse) {
        const { accountStatus, accountType, emailAddress, id } = newUser;

        this.id = id;
        this.emailAddress = emailAddress;
        this.accountStatus = accountStatus;
        this.accountType = accountType;
    }
}
