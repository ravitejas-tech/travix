import { Type } from '@sinclair/typebox';
import { LiteralUnion, Nullable } from '@travix/crud';
import { HotelCategory } from '@travix/shared';

export const HotelResponse = Type.Object({
  id: Type.String(),
  name: Type.String(),
  category: LiteralUnion(
    Object.values(HotelCategory) as [HotelCategory, ...HotelCategory[]],
  ),
  rating: Nullable(Type.Number()),
  description: Nullable(Type.String()),
  sortOrder: Type.Integer(),
});

export const HotelsResponse = Type.Array(HotelResponse);
