import {
    ExecutionContext,
    UnauthorizedException,
    createParamDecorator,
} from '@nestjs/common';
import { UserModel } from 'src/user/models/user.model';

export const CurrentUser = createParamDecorator<
    never,
    ExecutionContext,
    UserModel
>((_, ctx) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const user = request['user'] as UserModel | null | undefined;

    if (!user) throw new UnauthorizedException();

    return user;
});
