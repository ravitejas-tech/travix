import { Link } from 'react-router'

import type { Route } from './+types/register'
import { AuthLayout } from '../../components/auth/auth-layout'
import { RegisterForm } from '../../components/auth/register-form'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Create account · Travix' }]
}

export default function Register() {
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
