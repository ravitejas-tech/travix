import {
  GeneratedDay,
  GeneratedHotel,
  GeneratedTrip,
  GenerationContext,
} from '@travix/shared';

export abstract class GenerationService {
  abstract generateTrip(context: GenerationContext): Promise<GeneratedTrip>;

  abstract regenerateDay(
    context: GenerationContext,
    dayNumber: number,
    instructions?: string | null,
  ): Promise<GeneratedDay>;

  abstract generateHotels(
    context: GenerationContext,
  ): Promise<GeneratedHotel[]>;
}
