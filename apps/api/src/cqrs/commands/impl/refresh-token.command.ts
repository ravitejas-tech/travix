import { Command } from '@nestjs/cqrs'
import { Static } from '@sinclair/typebox'
import { AuthBaseResponse } from 'api/modules/auth/dtos/responses'

export class RefreshTokenCommand extends Command<Static<typeof AuthBaseResponse>> {
    public readonly refreshToken: string
}
