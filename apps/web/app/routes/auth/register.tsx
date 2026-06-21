import { Link } from 'react-router'

import type { Route } from './+types/register'
import { AuthLayout } from '../../components/auth/auth-layout'
import { RegisterForm } from '../../components/auth/register-form'
import { useRedirectIfAuthenticated } from '~/hooks/use-redirect-if-authenticated'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Create account · Travix' }]
}

export default function Register() {
    const redirecting = useRedirectIfAuthenticated()
    if (redirecting) return null

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Start building personalized itineraries in seconds."
            footer={
                <>
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-white underline-offset-4 hover:underline">
                        Sign in
                    </Link>
                </>
            }
        >
            <RegisterForm />
        </AuthLayout>
    )
}
