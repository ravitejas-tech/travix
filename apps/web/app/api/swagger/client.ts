import { Api } from './Api'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:6500'

export const client = new Api({
  baseURL,
  paramsSerializer(params) {
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, String(v)))
        } else {
          searchParams.append(key, String(value))
        }
      }
    }
    return searchParams.toString()
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
