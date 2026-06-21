import { createMutation } from 'react-query-kit'

import { client, type V1HotelsControllerRegenerateResponse } from '~/api'

export const useRegenerateHotels = createMutation<V1HotelsControllerRegenerateResponse, { tripId: string }, Error>({
    mutationKey: ['hotels', 'regenerate'],
    mutationFn: ({ tripId }) => client.v1.regenerateV1Hotels(tripId).then((res) => res.data),
})
