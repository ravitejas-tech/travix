import type { Route } from './+types/settings'
import { ComingSoon } from '../../components/dashboard/coming-soon'
import { COMING_SOON } from '~/data/coming-soon.constants'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Settings · Travix' }]
}

export default function SettingsPage() {
    return <ComingSoon content={COMING_SOON.settings} />
}
