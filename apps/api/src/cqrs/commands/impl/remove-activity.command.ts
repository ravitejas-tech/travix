import { Command } from '@nestjs/cqrs';

export class RemoveActivityCommand extends Command<void> {
  public readonly userId: string;
  public readonly tripId: string;
  public readonly dayId: string;
  public readonly activityId: string;
}
