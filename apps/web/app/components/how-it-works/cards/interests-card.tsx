import { Plus } from 'lucide-react'
import { BentoCard } from '../bento-card'
import { INTERESTS } from '~/data/how-it-works.constants'

export function InterestsCard() {
    return (
        <BentoCard className="flex flex-col justify-center gap-3 bg-white p-6">
            <p className="text-sm font-semibold text-primary">Pick what you love</p>
            <div className="flex flex-wrap gap-2">
                {INTERESTS.map((tag, index) => (
                    <span
                        key={tag}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${
                            index % 2 === 0 ? 'bg-primary/10 text-primary' : 'border border-primary/20 text-primary/70'
                        }`}
                    >
                        {tag}
                        {index % 2 === 0 && <Plus className="h-3 w-3" />}
                    </span>
                ))}
            </div>
        </BentoCard>
    )
}
