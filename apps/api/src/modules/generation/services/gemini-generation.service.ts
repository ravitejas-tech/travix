import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  GeneratedDay,
  GeneratedHotel,
  GeneratedTrip,
  GenerationContext,
  generationDaySchema,
  generationHotelsSchema,
  generationTripSchema,
} from '@travix/shared';
import { GoogleGenAI } from '@google/genai';
import { GenerationService } from './generation.service';

@Injectable()
export class GeminiGenerationService extends GenerationService {
  private readonly logger = new Logger(GeminiGenerationService.name);

  constructor(
    private readonly client: GoogleGenAI,
    private readonly model: string,
  ) {
    super();
  }

  async generateTrip(context: GenerationContext): Promise<GeneratedTrip> {
    const prompt = [
      `Plan a ${context.numberOfDays}-day trip to ${context.destination}.`,
      context.userLocation ? `The traveler is departing from ${context.userLocation}.` : '',
      `Budget level: ${context.budgetType}. Costs in ${context.currencyCode}.`,
      `Traveler interests: ${context.interests.join(', ') || 'general sightseeing'}.`,
      `For the transportation cost (stored in the flights field), estimate the cost based on the distance and logical travel mode between the starting origin and destination (e.g. flight for long distances, train/car/bus for nearby locations).`,
      `Provide a brief, 1-sentence explanation in each of the description fields (flightsDescription, accommodationDescription, foodDescription, activitiesDescription) detailing exactly how that cost was estimated (e.g. specifying the travel mode/route, average nightly lodging rate, daily meal estimate, or activity fees).`,
      `Produce a day-by-day itinerary (2-4 activities/day), an estimated budget, and 3 hotel suggestions`,
      `(one budget, one mid_range, one luxury).`,
    ]
      .filter(Boolean)
      .join(' ');

    return this.generate<GeneratedTrip>(prompt, generationTripSchema);
  }

  async regenerateDay(
    context: GenerationContext,
    dayNumber: number,
    instructions?: string | null,
  ): Promise<GeneratedDay> {
    const prompt = [
      `For a ${context.numberOfDays}-day trip to ${context.destination} (budget: ${context.budgetType},`,
      `interests: ${context.interests.join(', ') || 'general sightseeing'}),`,
      context.userLocation ? `departing from ${context.userLocation},` : '',
      `regenerate the plan for day ${dayNumber} with 2-4 activities.`,
      instructions ? `Extra instructions: ${instructions}.` : '',
    ]
      .filter(Boolean)
      .join(' ');

    return this.generate<GeneratedDay>(prompt, generationDaySchema);
  }

  async generateHotels(context: GenerationContext): Promise<GeneratedHotel[]> {
    const prompt = [
      `Suggest 3 hotels in ${context.destination} for a ${context.budgetType}-budget traveler`,
      context.userLocation ? `traveling from ${context.userLocation}` : '',
      `(one budget, one mid_range, one luxury), with ratings out of 5.`,
    ]
      .filter(Boolean)
      .join(' ');

    const result = await this.generate<{ hotels: GeneratedHotel[] }>(
      prompt,
      generationHotelsSchema,
    );
    return result.hotels;
  }

  private async generate<T>(
    prompt: string,
    responseSchema: object,
  ): Promise<T> {
    try {
      const response = await this.client.models.generateContent({
        model: this.model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema as never,
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('empty response from Gemini');
      }

      return JSON.parse(text) as T;
    } catch (error) {
      this.logger.error(
        'Gemini generation failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('failed to generate travel plan');
    }
  }
}
