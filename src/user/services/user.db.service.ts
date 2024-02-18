import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '../models/user.model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IUser } from '../types/user.type';

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
}
