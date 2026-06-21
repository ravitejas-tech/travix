import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from '@travix/db';
import { TokenService } from 'api/modules/auth/services';
import { compare } from 'bcrypt';
import { DataSource } from 'typeorm';
import { LoginCommand } from '../impl/login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    @Inject(TokenService) private readonly tokenService: TokenService,
  ) {}

  async execute(command: LoginCommand) {
    const { payload } = command;

    const user = await this.datasource.manager.findOne(UserEntity, {
      where: { email: payload.email },
      relations: ['roles'],
    });

    if (
      !user ||
      !user.password ||
      !(await compare(payload.password, user.password))
    ) {
      throw new UnauthorizedException('invalid credentials');
    }

    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens({
        id: user.id,
        email: user.email,
      });

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
    };
  }
}
