import { Type } from '@sinclair/typebox';
import { Nullable } from '@travix/crud';

export const RegisterPayload = Type.Object({
  firstName: Nullable(Type.String({ example: 'John' })),
  lastName: Nullable(Type.String({ example: 'Doe' })),
  email: Type.String({ format: 'email', example: 'johndoe@example.com' }),
  password: Type.String({
    minLength: 8,
    maxLength: 64,
    example: 'abcd@123456',
  }),
});

export const LoginPayload = Type.Object({
  email: Type.String({ format: 'email', example: 'johndoe@example.com' }),
  password: Type.String({
    minLength: 8,
    maxLength: 64,
    example: 'abcd@123456',
  }),
});

export const RefreshTokenPayload = Type.Object({
  refreshToken: Type.String(),
});
