import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as entities from '@travix/db'
import { databaseConfig } from './config/database.config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
            envFilePath: ['.env'],
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
        CqrsModule.forRoot(),
    ],
})
export class ApiModule {}
