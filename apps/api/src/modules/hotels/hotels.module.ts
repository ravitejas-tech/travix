import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegenerateHotelsHandler } from 'api/cqrs/commands/handlers/regenerate-hotels.handler';
import { GetHotelsHandler } from 'api/cqrs/queries/handlers/get-hotels.handler';
import { V1HotelsController } from './controllers/v1/hotels.controller';

const CommandHandlers = [RegenerateHotelsHandler];
const QueryHandlers = [GetHotelsHandler];

@Module({
  imports: [CqrsModule],
  controllers: [V1HotelsController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class HotelsModule {}
