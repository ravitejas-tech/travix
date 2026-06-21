import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState, type InputHTMLAttributes } from 'react'

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

export const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
    ({ label, error, id, type = 'text', ...props }, ref) => {
        const [show, setShow] = useState(false)
        const isPassword = type === 'password'
        const inputType = isPassword && show ? 'text' : type

        return (
            <div className="flex flex-col gap-1.5">
                <label htmlFor={id} className="text-sm font-medium text-white/90">
                    {label}
                </label>
                <div className="relative">
                    <input
                        id={id}
                        ref={ref}
                        type={inputType}
                        className={`w-full rounded-xl border bg-white/10 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/50 focus:border-white/60 focus:bg-white/15 ${
                            isPassword ? 'pr-11' : ''
                        } ${error ? 'border-red-300' : 'border-white/20'}`}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShow((s) => !s)}
                            aria-label={show ? 'Hide password' : 'Show password'}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/60 transition-colors hover:text-white"
                        >
                            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    )}
                </div>
                {error && <span className="text-xs text-red-200">{error}</span>}
            </div>
        )
    },
)

AuthField.displayName = 'AuthField'
