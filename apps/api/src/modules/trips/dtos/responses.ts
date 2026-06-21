import { Type } from '@sinclair/typebox';
import { LiteralUnion, Nullable, PaginatedResponse } from '@travix/crud';
import { BudgetType, TripStatus } from '@travix/shared';
import { HotelResponse } from 'api/modules/hotels/dtos/responses';
import { ItineraryDayResponse } from 'api/modules/itinerary/dtos/responses';

export const BudgetResponse = Type.Object({
  flights: Nullable(Type.Number()),
  accommodation: Nullable(Type.Number()),
  food: Nullable(Type.Number()),
  activities: Nullable(Type.Number()),
  total: Type.Number(),
  currencyCode: Type.String(),
  currencySymbol: Type.String(),
});

const DestinationResponse = Type.Object({
  cityId: Type.String(),
  cityName: Type.String(),
  countryName: Type.String(),
});

export const TripSummaryResponse = Type.Object({
  id: Type.String(),
  destination: DestinationResponse,
  numberOfDays: Type.Integer(),
  budgetType: LiteralUnion(
    Object.values(BudgetType) as [BudgetType, ...BudgetType[]],
  ),
  interests: Type.Array(Type.String()),
  status: LiteralUnion(
    Object.values(TripStatus) as [TripStatus, ...TripStatus[]],
  ),
  total: Nullable(Type.Number()),
  createdAt: Type.String({ format: 'date-time' }),
});

export const TripDetailResponse = Type.Composite([
  TripSummaryResponse,
  Type.Object({
    days: Type.Array(ItineraryDayResponse),
    budget: Nullable(BudgetResponse),
    hotels: Type.Array(HotelResponse),
  }),
]);

export const PaginatedTripsResponse = PaginatedResponse(TripSummaryResponse);
