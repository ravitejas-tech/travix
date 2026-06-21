import { createMutation } from 'react-query-kit'

import {
    client,
    type V1ItineraryControllerAddActivityBody,
    type V1ItineraryControllerAddActivityResponse,
    type V1ItineraryControllerRegenerateDayResponse,
} from '~/api'

export const useRegenerateDay = createMutation<
    V1ItineraryControllerRegenerateDayResponse,
    { tripId: string; dayId: string; instructions?: string },
    Error
>({
    mutationKey: ['itinerary', 'regenerate-day'],
    mutationFn: ({ tripId, dayId, instructions }) =>
        client.v1.regenerateV1ItineraryDay(dayId, tripId, { instructions }).then((res) => res.data),
})

export const useAddActivity = createMutation<
    V1ItineraryControllerAddActivityResponse,
    { tripId: string; dayId: string } & V1ItineraryControllerAddActivityBody,
    Error
>({
    mutationKey: ['itinerary', 'add-activity'],
    mutationFn: ({ tripId, dayId, ...body }) =>
        client.v1.addV1ItineraryActivity(dayId, tripId, body).then((res) => res.data),
})

export const useRemoveActivity = createMutation<void, { tripId: string; dayId: string; activityId: string }, Error>({
    mutationKey: ['itinerary', 'remove-activity'],
    mutationFn: ({ tripId, dayId, activityId }) =>
        client.v1.removeV1ItineraryActivity(activityId, dayId, tripId).then((res) => res.data),
})
