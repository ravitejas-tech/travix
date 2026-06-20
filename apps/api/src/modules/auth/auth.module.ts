import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { LoginHandler } from 'api/cqrs/commands/handlers/login.handler'
import { RefreshTokenHandler } from 'api/cqrs/commands/handlers/refresh-token.handler'
import { RegisterUserHandler } from 'api/cqrs/commands/handlers/register-user.handler'
import { GetProfileHandler } from 'api/cqrs/queries/handlers/get-profile.handler'
import { JwtStrategy } from 'api/strategies/jwt.strategy'
import { V1AuthController } from './controllers/v1/auth.controller'
import { TokenService } from './services'

const CommandHandlers = [RegisterUserHandler, LoginHandler, RefreshTokenHandler]
const QueryHandlers = [GetProfileHandler]

@Module({
    imports: [CqrsModule],
    controllers: [V1AuthController],
    providers: [TokenService, JwtStrategy, ...CommandHandlers, ...QueryHandlers],
    exports: [TokenService],
})
export class AuthModule {}
