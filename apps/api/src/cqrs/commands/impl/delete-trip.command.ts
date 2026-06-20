import { Command } from '@nestjs/cqrs'

export class DeleteTripCommand extends Command<void> {
    public readonly userId: string
    public readonly tripId: string
}
