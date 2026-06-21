import {
    Bed,
    Bell,
    CalendarHeart,
    CloudSun,
    CreditCard,
    GitFork,
    Languages,
    MessageCircle,
    Plane,
    Settings,
    Share2,
    SlidersHorizontal,
    Ticket,
    Users,
    type LucideIcon,
} from 'lucide-react'

export interface ComingSoonFeature {
    title: string
    description: string
    icon: LucideIcon
}

export interface ComingSoonContent {
    eyebrow: string
    title: string
    tagline: string
    icon: LucideIcon
    features: ComingSoonFeature[]
}

export type ComingSoonKey = 'bookings' | 'community' | 'explore' | 'settings'

export const COMING_SOON: Record<ComingSoonKey, ComingSoonContent> = {
    bookings: {
        eyebrow: 'Booking & transactions',
        title: 'Book it all in one place',
        tagline: 'Turn your itinerary into a booked trip — flights, stays and experiences, no tab-hopping.',
        icon: Ticket,
        features: [
            { title: 'Flight search & booking', description: 'Compare and book flights from your plan.', icon: Plane },
            { title: 'Hotel booking', description: 'Reserve the stays we suggest, instantly.', icon: Bed },
            {
                title: 'Tours & tickets',
                description: 'Lock in museums, tours and experiences.',
                icon: CreditCard,
            },
        ],
    },
    community: {
        eyebrow: 'Collaboration & social',
        title: 'Plan together, travel together',
        tagline: 'Invite friends, edit the same trip in real time, and borrow ideas from the community.',
        icon: Users,
        features: [
            { title: 'Group trips', description: 'Co-plan a single trip with shared edits.', icon: Users },
            { title: 'Share itineraries', description: 'Send a public link or invite collaborators.', icon: Share2 },
            {
                title: 'Community templates',
                description: 'Browse and clone trips other travelers made.',
                icon: GitFork,
            },
        ],
    },
    settings: {
        eyebrow: 'Personalization',
        title: 'Make Travix yours',
        tagline: 'Set your preferences once and every itinerary, budget and suggestion adapts to you.',
        icon: Settings,
        features: [
            {
                title: 'Travel preferences',
                description: 'Pace, dietary, accessibility and mobility filters.',
                icon: SlidersHorizontal,
            },
            {
                title: 'Currency & language',
                description: 'See plans in your currency and language.',
                icon: Languages,
            },
            {
                title: 'Notifications',
                description: 'Reminders and nudges, tuned to your taste.',
                icon: Bell,
            },
        ],
    },
    explore: {
        eyebrow: 'Smarter discovery',
        title: 'Discover what makes the dates special',
        tagline: 'Weather-aware ideas, local events and seasonal highlights surfaced for your travel window.',
        icon: CloudSun,
        features: [
            {
                title: 'Local events',
                description: 'Festivals and concerts during your dates.',
                icon: CalendarHeart,
            },
            { title: 'Weather-aware ideas', description: 'Indoor swaps when rain is forecast.', icon: CloudSun },
            {
                title: 'Conversational tweaks',
                description: 'Refine discoveries through natural chat.',
                icon: MessageCircle,
            },
        ],
    },
}
