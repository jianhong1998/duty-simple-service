import { UserAccountStatus } from '../enums/user-account-status.type';
import { UserAccountType } from '../enums/user-account-type.type';

export interface IUser {
    id: number;
    emailAddress: string;
    password: string;
    accountType: UserAccountType;
    accountStatus: UserAccountStatus;
}
