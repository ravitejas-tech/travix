import { createMutation } from 'react-query-kit'

import {
  client,
  type V1AuthControllerLoginBody,
  type V1AuthControllerLoginResponse,
  type V1AuthControllerRegisterBody,
  type V1AuthControllerRegisterResponse
} from '~/api'
import { setToken } from '~/lib/token'
import { useAuthStore } from '~/stores/auth.store'

export const useLogin = createMutation<
  V1AuthControllerLoginResponse,
  V1AuthControllerLoginBody,
  Error
>({
  mutationKey: ['auth', 'login'],
  mutationFn: async (payload) => {
    const { data } = await client.v1.loginV1Auth(payload)
    return data
  },
  onSuccess: (data) => {
    setToken({ access: data.accessToken, refresh: data.refreshToken })
    useAuthStore.getState().setUser(data.user)
  },
})

export const useRegister = createMutation<
  V1AuthControllerRegisterResponse,
  V1AuthControllerRegisterBody,
  Error
>({
  mutationKey: ['auth', 'register'],
  mutationFn: async (payload) => {
    const { data } = await client.v1.registerV1Auth(payload)
    return data
  },
  onSuccess: (data) => {
    setToken({ access: data.accessToken, refresh: data.refreshToken })
    useAuthStore.getState().setUser(data.user)
  },
})
