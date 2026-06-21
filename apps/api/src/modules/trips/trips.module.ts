import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTripHandler } from 'api/cqrs/commands/handlers/create-trip.handler';
import { DeleteTripHandler } from 'api/cqrs/commands/handlers/delete-trip.handler';
import { GetTripHandler } from 'api/cqrs/queries/handlers/get-trip.handler';
import { GetTripsHandler } from 'api/cqrs/queries/handlers/get-trips.handler';
import { V1TripsController } from './controllers/v1/trips.controller';

const CommandHandlers = [CreateTripHandler, DeleteTripHandler];
const QueryHandlers = [GetTripsHandler, GetTripHandler];

@Module({
  imports: [CqrsModule],
  controllers: [V1TripsController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class TripsModule {}
