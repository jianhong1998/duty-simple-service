import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordUtil } from 'src/common/utils/password.util';
import { UserAccountStatus } from 'src/user/enums/user-account-status.type';
import { UserDBService } from 'src/user/services/user.db.service';
import { TokenService } from './token.service';
import { ILoginResponse } from '../types/login-response.type';

@Injectable()
export class AuthService {
    private UNAUTHORIZE_MESSAGE = 'Invalid email or password.';

    constructor(
        private userDBService: UserDBService,
        private tokenService: TokenService,
    ) {}

    async verifyUserLoginCredential(
        email: string,
        password: string,
    ): Promise<ILoginResponse> {
        const user = await this.userDBService.getOne({
            emailAddress: email,
        });

        if (
            !user ||
            !PasswordUtil.comparePassword({
                password,
                hashedPassword: user.password,
            }) ||
            user.accountStatus === UserAccountStatus.DISABLED ||
            user.accountStatus === UserAccountStatus.RESETTING_PASSWORD
        ) {
            throw new UnauthorizedException(this.UNAUTHORIZE_MESSAGE);
        }

        const token = this.tokenService.generateToken({ userId: user.id });

        return {
            token,
            userAccountType: user.accountType,
        };
    }
}
