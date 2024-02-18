import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../models/user.model';
import { UserDBService } from '../services/user.db.service';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    providers: [UserDBService, UserService],
    controllers: [UserController],
    exports: [TypeOrmModule, UserDBService, UserService],
})
export class UserModule {}
