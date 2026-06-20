import { Inject, UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { InjectDataSource } from '@nestjs/typeorm'
import { UserEntity } from '@travix/db'
import { TokenService } from 'api/modules/auth/services'
import { DataSource } from 'typeorm'
import { RefreshTokenCommand } from '../impl/refresh-token.command'

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {
    constructor(
        @InjectDataSource() private readonly datasource: DataSource,
        @Inject(TokenService) private readonly tokenService: TokenService,
    ) {}

    async execute(command: RefreshTokenCommand) {
        const payload = await this.tokenService.verifyRefreshToken(command.refreshToken)

        const user = await this.datasource.manager.findOne(UserEntity, {
            where: { id: payload.id },
            relations: ['roles'],
        })

        if (!user) {
            throw new UnauthorizedException('invalid refresh token')
        }

        const { accessToken, refreshToken } = await this.tokenService.generateTokens({
            id: user.id,
            email: user.email,
        })

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName ?? null,
                lastName: user.lastName ?? null,
                phone: user.phone ?? null,
                roles: user.roles?.map((role) => role.name) ?? [],
            },
        }
    }
}
