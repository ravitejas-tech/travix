import { InternalServerErrorException } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';

export const databaseConfig = registerAs(
  'database.config',
  (): TypeOrmModuleOptions => {
    if (!process.env['DATABASE_URL']) {
      throw new InternalServerErrorException('DATABASE_URL is not set');
    }
    return {
      type: 'mysql',
      url: process.env['DATABASE_URL'],
      database: process.env['DATABASE_NAME'] ?? 'travix',
      migrationsRun: false,
      synchronize: false,
      dropSchema: false,
      timezone: 'Z',
      connectorPackage: 'mysql2',
      migrations: process.env['DATABASE_MIGRATIONS_DIR']
        ? [resolve(process.env['DATABASE_MIGRATIONS_DIR'], '**/*.{js,ts}')]
        : [],
    };
  },
);
