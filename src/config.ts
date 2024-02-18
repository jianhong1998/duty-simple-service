import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConfig from './db/database.config';
import { DataSource } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';

export class AppConfig {
    public static configModule = ConfigModule.forRoot({
        envFilePath: '.env',
        cache: false,
        isGlobal: true,
    });

    public static typeormModule = TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
            DatabaseConfig.getConfig(configService),
        dataSourceFactory: async (options) =>
            await new DataSource(options).initialize(),
    });

    public static jwtModule = JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        global: true,
        useFactory: (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET') || 'jwt_secret',
            global: true,
            signOptions: {
                expiresIn: '30 days',
            },
        }),
    });
}
