import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfig } from './config';
import { UserModule } from './user/modules/user.module';
import { AuthModule } from './auth/modules/auth.module';

@Module({
    imports: [
        AppConfig.configModule,
        AppConfig.typeormModule,
        AppConfig.jwtModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
