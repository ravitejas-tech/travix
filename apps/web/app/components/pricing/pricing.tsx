import { SectionHeading } from '../ui/section-heading'
import { PricingCard } from './pricing-card'
import { PRICING_PLANS } from '~/data/pricing.constants'

export function Pricing() {
    return (
        <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
            <SectionHeading
                eyebrow="Pricing"
                title="Plans that scale with your wanderlust"
                subtitle="Start free. Upgrade when you're ready to explore without limits."
            />

            <div className="mt-14 grid items-center gap-6 lg:grid-cols-3">
                {PRICING_PLANS.map((plan, index) => (
                    <PricingCard key={plan.name} plan={plan} index={index} />
                ))}
            </div>
        </section>
    )
}
