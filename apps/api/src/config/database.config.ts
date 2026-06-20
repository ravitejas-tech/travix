import { InternalServerErrorException } from '@nestjs/common'
import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const databaseConfig = registerAs('database.config', (): TypeOrmModuleOptions => {
    if (!process.env['DATABASE_URL']) {
        throw new InternalServerErrorException('DATABASE_URL is not set')
    }
    return {
        type: 'mysql',
        url: process.env['DATABASE_URL'],
        database: process.env['DATABASE_NAME'] ?? 'travix',
        synchronize: false,
        dropSchema: false,
        bigNumberStrings: false,
        supportBigNumbers: true,
        migrationsRun: false,
        timezone: 'Z',
        connectorPackage: 'mysql2',
    }
})
