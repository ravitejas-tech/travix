import { useState } from 'react'

import type { Route } from './+types/home'
import { ChatComposer } from '../../components/dashboard/chat/chat-composer'
import { ChatGreeting } from '../../components/dashboard/chat/chat-greeting'
import { ChatSuggestions } from '../../components/dashboard/chat/chat-suggestions'
import { RobotMascot } from '../../components/dashboard/chat/robot-mascot'
import { TripWizardModal } from '../../components/trip-wizard/trip-wizard-modal'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Plan a trip · Travix' }]
}

export default function DashboardHome() {
    const [wizardOpen, setWizardOpen] = useState(false)
    const [initialInterests, setInitialInterests] = useState<string[]>([])

    const openWizard = (interests: string[] = []) => {
        setInitialInterests(interests)
        setWizardOpen(true)
    }

    return (
        <div className="relative flex min-h-full flex-col items-center justify-center px-6 py-12">
            <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
                <RobotMascot />
            </div>

            <div className="w-full max-w-2xl space-y-8">
                <ChatGreeting />
                <ChatComposer onOpen={() => openWizard()} />
                <ChatSuggestions onPick={(interest) => openWizard([interest])} />
            </div>

            <TripWizardModal
                open={wizardOpen}
                onClose={() => setWizardOpen(false)}
                initialInterests={initialInterests}
            />
        </div>
    )
}
