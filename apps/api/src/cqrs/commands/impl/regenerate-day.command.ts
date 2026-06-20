import { Command } from '@nestjs/cqrs'
import { Static } from '@sinclair/typebox'
import { ItineraryDayResponse } from 'api/modules/itinerary/dtos/responses'

export class RegenerateDayCommand extends Command<Static<typeof ItineraryDayResponse>> {
    public readonly userId: string
    public readonly tripId: string
    public readonly dayId: string
    public readonly instructions?: string | null
}
