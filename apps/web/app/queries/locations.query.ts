import { createQuery } from 'react-query-kit'

import { client, type V1LocationsControllerSearchCitiesResponse } from '~/api'

export const useSearchCities = createQuery<V1LocationsControllerSearchCitiesResponse, { search: string }>({
    queryKey: ['locations', 'cities'],
    fetcher: ({ search }) => client.v1.searchV1LocationsCities({ search, limit: 8 }).then((res) => res.data),
})
