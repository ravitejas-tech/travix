import { Controller, Inject, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Static } from '@sinclair/typebox'
import { HttpEndpoint } from '@travix/crud'
import { Builder } from '@travix/shared'
import { LoginCommand } from 'api/cqrs/commands/impl/login.command'
import { RefreshTokenCommand } from 'api/cqrs/commands/impl/refresh-token.command'
import { RegisterUserCommand } from 'api/cqrs/commands/impl/register-user.command'
import { GetProfileQuery } from 'api/cqrs/queries/impl/get-profile.query'
import { AuthUser } from 'api/decorators/authenticated-user.decorator'
import { JwtAuthGuard } from 'api/guards/jwt-auth.guard'
import { LoginPayload, RefreshTokenPayload, RegisterPayload } from '../../dtos/payloads'
import { AuthBaseResponse, AuthUserResponse } from '../../dtos/responses'

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class V1AuthController {
    constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus,
    ) {}

    @HttpEndpoint({
        method: 'POST',
        path: 'register',
        summary: 'Register a new user',
        responseCode: 201,
        validate: {
            request: [{ type: 'body', schema: RegisterPayload }],
            response: { schema: AuthBaseResponse, responseCode: 201 },
        },
    })
    async register(body: Static<typeof RegisterPayload>): Promise<Static<typeof AuthBaseResponse>> {
        return this.commandBus.execute(Builder(RegisterUserCommand, { payload: body }).build())
    }

    @HttpEndpoint({
        method: 'POST',
        path: 'login',
        summary: 'Authenticate with email and password',
        validate: {
            request: [{ type: 'body', schema: LoginPayload }],
            response: { schema: AuthBaseResponse },
        },
    })
    async login(body: Static<typeof LoginPayload>): Promise<Static<typeof AuthBaseResponse>> {
        return this.commandBus.execute(Builder(LoginCommand, { payload: body }).build())
    }

    @HttpEndpoint({
        method: 'POST',
        path: 'refresh',
        summary: 'Exchange a refresh token for a new token pair',
        validate: {
            request: [{ type: 'body', schema: RefreshTokenPayload }],
            response: { schema: AuthBaseResponse },
        },
    })
    async refresh(body: Static<typeof RefreshTokenPayload>): Promise<Static<typeof AuthBaseResponse>> {
        return this.commandBus.execute(Builder(RefreshTokenCommand, { refreshToken: body.refreshToken }).build())
    }

    @UseGuards(JwtAuthGuard)
    @HttpEndpoint({
        method: 'GET',
        path: 'me',
        summary: 'Get the authenticated user profile',
        auth: true,
        validate: {
            response: { schema: AuthUserResponse },
        },
    })
    async me(@AuthUser('id') userId: string): Promise<Static<typeof AuthUserResponse>> {
        return this.queryBus.execute(Builder(GetProfileQuery, { userId }).build())
    }
}
