import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfig } from './config';
import { UserModule } from './user/modules/user.module';

@Module({
    imports: [
        AppConfig.configModule,
        AppConfig.typeormModule,
        AppConfig.jwtModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
