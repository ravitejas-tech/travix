import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { SearchCitiesHandler } from 'api/cqrs/queries/handlers/search-cities.handler'
import { V1LocationsController } from './controllers/v1/locations.controller'

const QueryHandlers = [SearchCitiesHandler]

@Module({
    imports: [CqrsModule],
    controllers: [V1LocationsController],
    providers: [...QueryHandlers],
})
export class LocationsModule {}
