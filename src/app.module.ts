import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfig } from './config';
import { UserModule } from './user/modules/user.module';
import { AuthModule } from './auth/modules/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardService } from './auth/services/auth-guard.service';

@Module({
    imports: [
        AppConfig.configModule,
        AppConfig.typeormModule,
        AppConfig.jwtModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuardService,
        },
    ],
})
export class AppModule {}
