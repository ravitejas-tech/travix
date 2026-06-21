import { buildQuery } from 'rapiq'

import { Api } from './Api'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:6500'

export const client = new Api({
  baseURL,
  paramsSerializer(params) {
    return buildQuery(params).replace(/^\?/, '')
  },
})

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem('access_token')
}

client.instance.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})
