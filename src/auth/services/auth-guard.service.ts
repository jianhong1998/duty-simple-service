import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { UserDBService } from 'src/user/services/user.db.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/custom-decorators/public.decorator';
import { Request } from 'express';
import { AllowAccountTypes } from 'src/common/custom-decorators/allow-account-types.decorator';
import { UserAccountType } from 'src/user/enums/user-account-type.type';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private userDBService: UserDBService,
        private reflector: Reflector,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) return true;

        const request = context.switchToHttp().getRequest<Request>();

        const token = this.extractTokenFromRequest(request);

        const isTokenValid = this.tokenService.verifyToken(token);

        if (!isTokenValid)
            throw new UnauthorizedException(
                'Token is invalid or already expired.',
            );

        const { userId } = this.tokenService.decodeToken<{ userId: number }>(
            token,
        );

        const user = await this.userDBService.getOne({ id: userId });

        request['user'] = user;

        const allowedAccountTypes = this.reflector.get(
            AllowAccountTypes,
            context.getHandler(),
        );

        if (!allowedAccountTypes) return true;

        return this.isAccountTypeAllowed(user.accountType, allowedAccountTypes);
    }

    private extractTokenFromRequest(request: Request): string {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        if (type !== 'Bearer')
            throw new UnauthorizedException('Token is invalid.');

        return token;
    }

    private isAccountTypeAllowed(
        currentUserAccountType: UserAccountType,
        allowedAccountTypes: UserAccountType[],
    ): boolean {
        return allowedAccountTypes.includes(currentUserAccountType);
    }
}
