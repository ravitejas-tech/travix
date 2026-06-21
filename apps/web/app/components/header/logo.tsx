interface LogoProps {
    compact?: boolean
}

export function Logo({ compact = false }: LogoProps) {
    return (
        <a href="/" className="flex items-center" aria-label="Travix home">
            <img
                src="/logo.png"
                alt="Travix"
                className={`object-contain drop-shadow-md transition-all duration-300 ${
                    compact ? 'h-11 w-11' : 'h-16 w-16 sm:h-20 sm:w-20'
                }`}
            />
        </a>
    )
}
