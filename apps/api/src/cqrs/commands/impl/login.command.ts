import { Command } from '@nestjs/cqrs';
import { Static } from '@sinclair/typebox';
import { LoginPayload } from 'api/modules/auth/dtos/payloads';
import { AuthBaseResponse } from 'api/modules/auth/dtos/responses';

export class LoginCommand extends Command<Static<typeof AuthBaseResponse>> {
  public readonly payload: Static<typeof LoginPayload>;
}
