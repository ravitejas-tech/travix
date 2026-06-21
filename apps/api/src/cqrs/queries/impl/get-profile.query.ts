import { Query } from '@nestjs/cqrs';
import { Static } from '@sinclair/typebox';
import { AuthUserResponse } from 'api/modules/auth/dtos/responses';

export class GetProfileQuery extends Query<Static<typeof AuthUserResponse>> {
  public readonly userId: string;
}
