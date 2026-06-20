import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as entities from '@travix/db'
import { LoggerModule } from 'nestjs-pino'
import { databaseConfig } from './config/database.config'
import { loggerConfig } from './config/logger.config'
import { AuthModule } from './modules/auth/auth.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, loggerConfig],
            envFilePath: ['.env'],
        }),
        LoggerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return configService.getOrThrow('logger.config')
            },
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    ...configService.getOrThrow('database.config'),
                    entities: Object.values(entities).filter((e) => typeof e === 'function'),
                    synchronize: false,
                }
            },
        }),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.getOrThrow('JWT_ACCESS_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN', '15m'),
                    },
                }
            },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        CqrsModule.forRoot(),
        AuthModule,
    ],
})
export class ApiModule {}
