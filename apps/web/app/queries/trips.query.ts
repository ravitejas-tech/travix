import { createMutation, createQuery } from 'react-query-kit'

import {
    client,
    type V1TripsControllerCreateBody,
    type V1TripsControllerCreateResponse,
    type V1TripsControllerDetailResponse,
    type V1TripsControllerListResponse,
} from '~/api'
import { queryClient } from '~/lib/query-client'

export type TripSort = 'recent' | 'budget_high' | 'budget_low'

export const useTrips = createQuery<V1TripsControllerListResponse, { search?: string; sort?: TripSort }, Error>({
    queryKey: ['trips', 'list'],
    fetcher: ({ search, sort } = {}) =>
        client.v1
            .listV1Trips({ limit: 50, search: search?.trim() || undefined, sort })
            .then((res) => res.data),
})

export const useTrip = createQuery<V1TripsControllerDetailResponse, { tripId: string }, Error>({
    queryKey: ['trips', 'detail'],
    fetcher: ({ tripId }) => client.v1.detailV1Trips(tripId).then((res) => res.data),
})

export const useCreateTrip = createMutation<V1TripsControllerCreateResponse, V1TripsControllerCreateBody, Error>({
    mutationKey: ['trips', 'create'],
    mutationFn: (payload) => client.v1.createV1Trips(payload).then((res) => res.data),
})

export const useDeleteTrip = createMutation<void, { tripId: string }, Error>({
    mutationKey: ['trips', 'delete'],
    mutationFn: ({ tripId }) => client.v1.removeV1Trips(tripId).then((res) => res.data),
})

/** Refetch a trip's detail and the trips list after a mutation. */
export const invalidateTrip = (tripId: string) => {
    queryClient.invalidateQueries({ queryKey: useTrip.getKey({ tripId }) })
    queryClient.invalidateQueries({ queryKey: useTrips.getKey() })
}
