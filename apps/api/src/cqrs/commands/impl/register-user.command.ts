import { Command } from '@nestjs/cqrs';
import { Static } from '@sinclair/typebox';
import { RegisterPayload } from 'api/modules/auth/dtos/payloads';
import { AuthBaseResponse } from 'api/modules/auth/dtos/responses';

export class RegisterUserCommand extends Command<
  Static<typeof AuthBaseResponse>
> {
  public readonly payload: Static<typeof RegisterPayload>;
}
