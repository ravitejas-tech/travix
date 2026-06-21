import type { Route } from './+types/community'
import { ComingSoon } from '../../components/dashboard/coming-soon'
import { COMING_SOON } from '~/data/coming-soon.constants'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Community · Travix' }]
}

export default function CommunityPage() {
    return <ComingSoon content={COMING_SOON.community} />
}
