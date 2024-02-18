import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../models/user.model';
import { UserDBService } from '../services/user.db.service';
import { UserController } from '../controllers/user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    providers: [UserDBService],
    controllers: [UserController],
    exports: [TypeOrmModule, UserDBService],
})
export class UserModule {}
