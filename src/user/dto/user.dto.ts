import { ApiProperty } from '@nestjs/swagger';
import { UserAccountStatus } from '../enums/user-account-status.type';
import { UserAccountType } from '../enums/user-account-type.type';
import { IUser } from '../types/user.type';
import { IsEmail, IsEnum, IsNumber } from 'class-validator';

export class UserDTO implements Omit<IUser, 'password'> {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsEmail()
    emailAddress: string;

    @ApiProperty()
    @IsEnum(UserAccountStatus)
    accountStatus: UserAccountStatus;

    @ApiProperty()
    @IsEnum(UserAccountType)
    accountType: UserAccountType;

    constructor(user: IUser) {
        const { id, accountStatus, accountType, emailAddress } = user;

        this.id = id;
        this.accountStatus = accountStatus;
        this.accountType = accountType;
        this.emailAddress = emailAddress;
    }
}
