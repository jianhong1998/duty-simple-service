import { UserAccountType } from 'src/user/enums/user-account-type.type';

export interface ILoginResponse {
    token: string;
    userAccountType: UserAccountType;
}
