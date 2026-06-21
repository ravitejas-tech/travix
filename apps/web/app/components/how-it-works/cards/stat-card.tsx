import { Sparkles } from 'lucide-react'
import { BentoCard } from '../bento-card'

export function StatCard() {
    return (
        <BentoCard className="flex flex-col justify-between bg-primary p-6 text-white">
            <Sparkles className="h-8 w-8" />
            <div>
                <p className="text-5xl font-bold leading-none">30s</p>
                <p className="mt-2 text-sm text-white/80">the average time to a complete, personal plan.</p>
            </div>
        </BentoCard>
    )
}
