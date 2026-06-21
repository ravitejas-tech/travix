import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddActivityHandler } from 'api/cqrs/commands/handlers/add-activity.handler';
import { RegenerateDayHandler } from 'api/cqrs/commands/handlers/regenerate-day.handler';
import { RemoveActivityHandler } from 'api/cqrs/commands/handlers/remove-activity.handler';
import { V1ItineraryController } from './controllers/v1/itinerary.controller';

const CommandHandlers = [
  RegenerateDayHandler,
  AddActivityHandler,
  RemoveActivityHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [V1ItineraryController],
  providers: [...CommandHandlers],
})
export class ItineraryModule {}
