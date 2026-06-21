import { Reveal } from './reveal'

interface SectionHeadingProps {
    eyebrow: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: SectionHeadingProps) {
    const isCenter = align === 'center'

    return (
        <Reveal
            className={`flex max-w-2xl flex-col gap-4 ${
                isCenter ? 'mx-auto items-center text-center' : 'items-start text-left'
            }`}
        >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
            <h2 className="text-3xl font-semibold leading-tight text-primary sm:text-4xl">{title}</h2>
            {subtitle && <p className="text-base text-muted">{subtitle}</p>}
        </Reveal>
    )
}
