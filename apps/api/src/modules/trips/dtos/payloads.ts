import { Type } from '@sinclair/typebox';
import { LiteralUnion } from '@travix/crud';
import { BudgetType, MAX_PAGE_SIZE } from '@travix/shared';

export const CreateTripPayload = Type.Object({
  userLocationId: Type.Optional(
    Type.String({ length: 26, example: '01J0X8Z9C0V8Q5K3R7T2M4N6P8' }),
  ),
  cityId: Type.String({ example: '01J0X8Z9C0V8Q5K3R7T2M4N6P8' }),
  numberOfDays: Type.Integer({ minimum: 1, maximum: 30, example: 5 }),
  budgetType: LiteralUnion(
    Object.values(BudgetType) as [BudgetType, ...BudgetType[]],
    {
      example: BudgetType.MEDIUM,
    },
  ),
  interests: Type.Array(Type.String({ example: 'food' }), {
    example: ['food', 'culture'],
  }),
  currencyCode: Type.Optional(
    Type.String({ minLength: 3, maxLength: 3, default: 'USD', example: 'USD' }),
  ),
});

export const TripIdParam = Type.String();

export const PageQuery = Type.Integer({ minimum: 1, default: 1 });
export const LimitQuery = Type.Integer({
  minimum: 1,
  maximum: MAX_PAGE_SIZE,
  default: 20,
});
export const SearchQuery = Type.String({ example: 'Tokyo' });
export const SortQuery = LiteralUnion(['recent', 'budget_high', 'budget_low'], {
  default: 'recent',
  example: 'budget_high',
});
export type TripSort = (typeof SortQuery)['static'];
