import type { LucideIcon } from 'lucide-react'

export interface TripInput {
    icon: LucideIcon
    label: string
    value: string
}

export interface SampleDay {
    day: string
    activity: string
}

export interface Destination {
    image: string
    name: string
    country: string
    tagline: string
}

export interface PricingPlan {
    name: string
    price: string
    cadence: string
    description: string
    features: string[]
    cta: string
    featured?: boolean
}

export interface AboutStat {
    value: string
    label: string
}

export interface FooterLink {
    label: string
    href: string
}

export interface FooterColumn {
    title: string
    links: FooterLink[]
}
