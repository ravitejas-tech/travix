import { Type } from '@sinclair/typebox';
import { Nullable } from '@travix/crud';

export const AuthUserResponse = Type.Object({
  id: Type.String(),
  email: Type.String({ format: 'email' }),
  firstName: Nullable(Type.String()),
  lastName: Nullable(Type.String()),
  phone: Nullable(Type.String()),
  roles: Type.Array(Type.String()),
});

export const AuthBaseResponse = Type.Object({
  accessToken: Type.String(),
  refreshToken: Type.String(),
  user: AuthUserResponse,
});
