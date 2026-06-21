import type { Route } from './+types/bookings'
import { ComingSoon } from '../../components/dashboard/coming-soon'
import { COMING_SOON } from '~/data/coming-soon.constants'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Bookings · Travix' }]
}

export default function BookingsPage() {
    return <ComingSoon content={COMING_SOON.bookings} />
}
