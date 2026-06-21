import { createQuery } from 'react-query-kit'

import {
    client,
    type V1AuthControllerMeResponse
} from '~/api'

export const useMe = createQuery<V1AuthControllerMeResponse, void, Error>({
  queryKey: ['auth', 'me'],
  fetcher: async () => {
    const { data } = await client.v1.meV1Auth()
    return data
  },
})
