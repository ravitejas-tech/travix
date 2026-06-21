import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { useLogin } from '~/queries/auth.query'
import { loginSchema, type LoginFormValues } from '~/schemas/auth.schema'
import { AuthField } from './auth-field'
import { AuthSubmit } from './auth-submit'

export function LoginForm() {
    const navigate = useNavigate()
    const { mutate, isPending } = useLogin()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

    const onSubmit = (values: LoginFormValues) => {
        mutate(values, {
            onSuccess: () => {
                toast.success('Welcome back!')
                navigate('/dashboard')
            },
            onError: () => toast.error('Invalid email or password.'),
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <AuthField
                id="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
            />
            <AuthField
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
            />
            <AuthSubmit label="Sign in" loading={isPending} />
        </form>
    )
}
