import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../models/user.model';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    providers: [],
    controllers: [],
    exports: [],
})
export class UserModule {}
