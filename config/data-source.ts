import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'hospital_app',
    synchronize: process.env.NODE_ENV !== 'development',
    entities: ['dist/**/*.model{.js,.ts}'],
    migrations: ['dist/src/db/migrations/**/*{.js,.ts}'],
    seeds: ['dist/src/db/seeders/**/*{.js,.ts}'],
    factories: ['dist/src/db/factories/**/*{.js,.ts}'],
    seedTracking: false,
};

export const dataSource = new DataSource(options);
