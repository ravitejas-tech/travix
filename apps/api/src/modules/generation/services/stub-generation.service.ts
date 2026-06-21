import { Injectable, Logger } from '@nestjs/common';
import {
  ActivityType,
  BudgetType,
  GeneratedActivity,
  GeneratedDay,
  GeneratedHotel,
  GeneratedTrip,
  GenerationContext,
  HotelCategory,
} from '@travix/shared';
import { GenerationService } from './generation.service';

const BUDGET_DAILY_BASELINE: Record<BudgetType, number> = {
  [BudgetType.LOW]: 60,
  [BudgetType.MEDIUM]: 150,
  [BudgetType.HIGH]: 350,
};

const INTEREST_TO_ACTIVITY: Record<string, ActivityType> = {
  food: ActivityType.FOOD,
  culture: ActivityType.CULTURE,
  adventure: ActivityType.ADVENTURE,
  shopping: ActivityType.SHOPPING,
  sightseeing: ActivityType.SIGHTSEEING,
};

@Injectable()
export class StubGenerationService extends GenerationService {
  private readonly logger = new Logger(StubGenerationService.name);

  async generateTrip(context: GenerationContext): Promise<GeneratedTrip> {
    this.logger.debug(`Generating stub trip for ${context.destination}`);

    const days: GeneratedDay[] = Array.from(
      { length: context.numberOfDays },
      (_, index) => this.buildDay(context, index + 1),
    );

    return {
      days,
      budget: this.buildBudget(context),
      hotels: this.buildHotels(context),
    };
  }

  async regenerateDay(
    context: GenerationContext,
    dayNumber: number,
    instructions?: string | null,
  ): Promise<GeneratedDay> {
    const day = this.buildDay(context, dayNumber);
    if (instructions) {
      day.summary = `${day.summary} (adjusted: ${instructions})`;
    }
    return day;
  }

  async generateHotels(context: GenerationContext): Promise<GeneratedHotel[]> {
    return this.buildHotels(context);
  }

  private buildDay(
    context: GenerationContext,
    dayNumber: number,
  ): GeneratedDay {
    const interests =
      context.interests.length > 0 ? context.interests : ['sightseeing'];
    const activities: GeneratedActivity[] = interests
      .slice(0, 3)
      .map((interest) => ({
        name: `${this.capitalize(interest)} experience in ${context.destination}`,
        description: `A ${interest}-focused activity tailored to a ${context.budgetType} budget.`,
        type:
          INTEREST_TO_ACTIVITY[interest.toLowerCase()] ?? ActivityType.OTHER,
      }));

    return {
      dayNumber,
      summary: `Day ${dayNumber} in ${context.destination}`,
      activities,
    };
  }

  private buildBudget(context: GenerationContext) {
    const daily = BUDGET_DAILY_BASELINE[context.budgetType];
    const accommodation = daily * context.numberOfDays;
    const food = Math.round(daily * 0.4 * context.numberOfDays);
    const activities = Math.round(daily * 0.3 * context.numberOfDays);
    const flights = daily * 4;
    return {
      flights,
      accommodation,
      food,
      activities,
      total: flights + accommodation + food + activities,
    };
  }

  private buildHotels(context: GenerationContext): GeneratedHotel[] {
    const categories: HotelCategory[] = [
      HotelCategory.BUDGET,
      HotelCategory.MID_RANGE,
      HotelCategory.LUXURY,
    ];
    return categories.map((category) => ({
      name: `${context.destination} ${this.capitalize(category.replace('_', ' '))} Stay`,
      category,
      rating:
        category === HotelCategory.LUXURY
          ? 4.8
          : category === HotelCategory.MID_RANGE
            ? 4.2
            : 3.7,
      description: `A ${category.replace('_', ' ')} option in ${context.destination}.`,
    }));
  }

  private capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
