import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export interface AuthenticatedUser {
    id: string
    email?: string | null
}

export const AuthUser = createParamDecorator(
    (data: keyof AuthenticatedUser | undefined, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest()
        const user = req.user as AuthenticatedUser
        return data ? user?.[data] : user
    },
)
