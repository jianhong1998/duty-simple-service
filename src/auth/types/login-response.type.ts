import { UserAccountStatus } from 'src/user/enums/user-account-status.type';
import { UserAccountType } from 'src/user/enums/user-account-type.type';

export interface ILoginResponse {
    token: string;
    userAccountType: UserAccountType;
    userAccountStatus: UserAccountStatus;
    isLoginSuccess: boolean;
    name: string;
    employeeId: number;
}
