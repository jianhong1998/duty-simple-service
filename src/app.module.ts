import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfig } from './config';

@Module({
    imports: [
        AppConfig.configModule,
        AppConfig.typeormModule,
        AppConfig.jwtModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
