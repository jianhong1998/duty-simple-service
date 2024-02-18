import { Reflector } from '@nestjs/core';
import { UserAccountType } from 'src/user/enums/user-account-type.type';

export const AllowAccountTypes = Reflector.createDecorator<UserAccountType[]>();
