import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '../ui/button'
import { CarouselDots } from './carousel-dots'
import { HERO_SLIDES } from '~/data/hero.constants'

interface HeroInfoPanelProps {
    active: number
    onSelect: (index: number) => void
}

export function HeroInfoPanel({ active, onSelect }: HeroInfoPanelProps) {
    const navigate = useNavigate()
    const slide = HERO_SLIDES[active]

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90">
                <MapPin className="h-3.5 w-3.5" />
                {slide.location}
            </span>

            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4"
                >
                    <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">{slide.title}</h2>
                    <p className="mt-2 text-sm text-white/80">{slide.subtitle}</p>
                </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button onClick={() => navigate('/register')}>
                    Start planning <ArrowRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="mt-6">
                <CarouselDots count={HERO_SLIDES.length} active={active} onSelect={onSelect} />
            </div>
        </motion.div>
    )
}
