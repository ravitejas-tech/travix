import { motion, type Transition } from 'framer-motion'

const EYE_STYLE = { transformBox: 'fill-box', transformOrigin: 'center' } as const

const BLINK = {
    scaleY: [1, 1, 0.1, 1, 1],
}
const BLINK_TRANSITION: Transition = {
    duration: 4.5,
    repeat: Infinity,
    ease: 'easeInOut',
    times: [0, 0.46, 0.5, 0.54, 1],
}

export function RobotMascot() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="pointer-events-none select-none"
            aria-hidden
        >
            <motion.div
                animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg width="76" height="76" viewBox="0 0 100 100" fill="none">
                    {/* antenna */}
                    <line
                        x1="50"
                        y1="18"
                        x2="50"
                        y2="30"
                        stroke="var(--color-primary)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <motion.circle
                        cx="50"
                        cy="14"
                        r="4.5"
                        fill="var(--color-accent)"
                        animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />

                    {/* ears */}
                    <rect x="13" y="48" width="6" height="14" rx="3" fill="var(--color-primary)" />
                    <rect x="81" y="48" width="6" height="14" rx="3" fill="var(--color-primary)" />

                    {/* head + face screen */}
                    <rect x="20" y="30" width="60" height="50" rx="16" fill="var(--color-primary)" />
                    <rect x="27" y="38" width="46" height="34" rx="11" fill="var(--color-primary-dark)" />

                    {/* eyes look around */}
                    <motion.g
                        animate={{ x: [0, -6, -6, 6, 6, 0, 0], y: [0, 0, 2, 2, 0, 0, 0] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            times: [0, 0.12, 0.3, 0.5, 0.68, 0.85, 1],
                        }}
                    >
                        <motion.circle
                            cx="42"
                            cy="53"
                            r="5"
                            fill="#fff"
                            style={EYE_STYLE}
                            animate={BLINK}
                            transition={BLINK_TRANSITION}
                        />
                        <motion.circle
                            cx="58"
                            cy="53"
                            r="5"
                            fill="#fff"
                            style={EYE_STYLE}
                            animate={BLINK}
                            transition={BLINK_TRANSITION}
                        />
                    </motion.g>

                    {/* mouth */}
                    <rect x="43" y="64" width="14" height="3" rx="1.5" fill="var(--color-accent)" />
                </svg>
            </motion.div>
        </motion.div>
    )
}
