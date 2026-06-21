import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from '@travix/db';
import { databaseConfig } from './config/database.config';
import { DbRootCommand } from './commands/db/root.cmd';

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
          ...configService.get('database.config'),
          entities: Object.values(entities).filter(
            (e) => typeof e === 'function',
          ),
          synchronize: false,
          manualInitialization: true,
        };
      },
    }),
  ],
  providers: [...DbRootCommand.registerWithSubCommands()],
})
export class CliModule {}
