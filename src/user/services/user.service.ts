import { Injectable } from '@nestjs/common';
import { UserDBService } from './user.db.service';
import { CreateUserRequestDTO } from '../dto/create-user.dto';
import { PasswordUtil } from 'src/common/utils/password.util';
import { UserAccountStatus } from '../enums/user-account-status.type';
import { IUser } from '../types/user.type';
import { omit } from 'lodash';
import { GetAllUserResponseDTO } from '../dto/get-all-user-response.dto';

@Injectable()
export class UserService {
    constructor(private userDBService: UserDBService) {}

    public async getAllUsers(): Promise<GetAllUserResponseDTO> {
        const users = await this.userDBService.getAll();

        return new GetAllUserResponseDTO(users);
    }

    public async createUserAccount(
        userDetails: CreateUserRequestDTO,
    ): Promise<Omit<IUser, 'password'>> {
        const { accountType, emailAddress } = userDetails;

        const password = PasswordUtil.generateHashedPassword(10);

        const newUser = await this.userDBService.create({
            emailAddress,
            password,
            accountType,
            accountStatus: UserAccountStatus.PENDING_INITIAL,
        });

        return omit(newUser, 'password');
    }
}
