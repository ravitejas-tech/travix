import { ConflictException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { InjectDataSource } from '@nestjs/typeorm'
import { RoleEntity, UserEntity } from '@travix/db'
import { Role } from '@travix/shared'
import { TokenService } from 'api/modules/auth/services'
import { hash } from 'bcrypt'
import { DataSource, EntityManager } from 'typeorm'
import { RegisterUserCommand } from '../impl/register-user.command'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
    constructor(
        @InjectDataSource() private readonly datasource: DataSource,
        @Inject(TokenService) private readonly tokenService: TokenService,
    ) {}

    async execute(command: RegisterUserCommand) {
        const { payload } = command

        const user = await this.datasource.manager.transaction(async (manager) => {
            await this.ensureEmailIsAvailable(manager, payload.email)
            return this.createUser(manager, payload)
        })

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

    private async ensureEmailIsAvailable(manager: EntityManager, email: string) {
        const existing = await manager.findOne(UserEntity, { where: { email } })
        if (existing) {
            throw new ConflictException('email already registered')
        }
    }

    private async createUser(manager: EntityManager, payload: RegisterUserCommand['payload']) {
        const role = await manager.findOne(RoleEntity, { where: { name: Role.USER } })

        const user = manager.create(UserEntity, {
            firstName: payload.firstName ?? null,
            lastName: payload.lastName ?? null,
            email: payload.email,
            password: await hash(payload.password, UserEntity.PASSWORD_SALT_ROUNDS),
            roles: role ? [role] : [],
        })

        return manager.save(user)
    }
}
