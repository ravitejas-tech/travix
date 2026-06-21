import type { Route } from './+types/explore'
import { ComingSoon } from '../../components/dashboard/coming-soon'
import { COMING_SOON } from '~/data/coming-soon.constants'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Explore · Travix' }]
}

export default function ExplorePage() {
    return <ComingSoon content={COMING_SOON.explore} />
}
