import { motion, type Variants } from 'framer-motion'

interface HeroHeadlineProps {
    text: string
}

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.045 } },
}

const letter: Variants = {
    hidden: { opacity: 0, y: '0.35em' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
}

export function HeroHeadline({ text }: HeroHeadlineProps) {
    const words = text.split(' ')

    return (
        <motion.h1
            key={text}
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-balance text-4xl font-light leading-tight text-white drop-shadow-lg sm:text-6xl"
        >
            {words.map((word, wi) => (
                <span key={wi} className="mr-[0.25em] inline-block whitespace-nowrap">
                    {Array.from(word).map((char, ci) => (
                        <motion.span key={ci} variants={letter} className="inline-block">
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.h1>
    )
}
