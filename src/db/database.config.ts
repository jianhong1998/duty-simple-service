import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export default class DatabaseConfig {
    static getConfig(configService: ConfigService): DataSourceOptions {
        const entityPathName = join(__dirname, '../', '**', '*.model.{ts,js}');
        const migrationPathName = join(__dirname, '/migrations/*.{js,ts}');

        return {
            type: 'postgres',
            host: configService.get('DB_HOST') || 'localhost',
            port: +configService.get('DB_PORT') || 5432,
            username: configService.get('DB_USER') || 'postgres',
            password: configService.get('DB_PASSWORD') || 'postgres',
            database: configService.get('DB_NAME') || 'duty_simple_dev',
            entities: [entityPathName],
            migrations: [migrationPathName],
            migrationsRun: true,
            synchronize: configService.get('NODE_ENV') !== 'development',
        };
    }
}
