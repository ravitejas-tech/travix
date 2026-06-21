import { AnimatePresence } from 'framer-motion'
import { HeroBackdrop } from './hero-backdrop'
import { HeroHeadline } from './hero-headline'
import { HeroInfoPanel } from './hero-info-panel'
import { HERO_AUTOPLAY_MS, HERO_SLIDES } from '~/data/hero.constants'
import { useCarousel } from '~/hooks/use-carousel'

export function Hero() {
    const { active, goTo } = useCarousel(HERO_SLIDES.length, HERO_AUTOPLAY_MS)

    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            <HeroBackdrop active={active} />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-12 pt-36 sm:px-10">
                <div className="flex flex-1 items-center">
                    <div className="max-w-3xl">
                        <AnimatePresence mode="wait">
                            <HeroHeadline key={active} text={HERO_SLIDES[active].headline} />
                        </AnimatePresence>
                    </div>
                </div>

                <HeroInfoPanel active={active} onSelect={goTo} />
            </div>
        </section>
    )
}
