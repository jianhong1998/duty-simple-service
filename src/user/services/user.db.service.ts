import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '../models/user.model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IUser } from '../types/user.type';
import { IUserCreation } from '../types/user-creation.type';

@Injectable()
export class UserDBService {
    constructor(
        @InjectRepository(UserModel) private userRepo: Repository<UserModel>,
    ) {}

    public async getOne(
        condition: FindOptionsWhere<UserModel>,
    ): Promise<IUser | null> {
        const user = await this.userRepo.findOneBy(condition);

        return user;
    }

    public async getAll(
        condition?: FindOptionsWhere<UserModel>,
    ): Promise<IUser[]> {
        const users = await this.userRepo.findBy(condition);

        return users;
    }

    public async create(user: IUserCreation): Promise<IUser> {
        const newUser = new UserModel();

        newUser.accountStatus = user.accountStatus;
        newUser.accountType = user.accountType;
        newUser.emailAddress = user.emailAddress;
        newUser.password = user.password;

        await this.userRepo.save(newUser);

        return newUser;
    }
}
