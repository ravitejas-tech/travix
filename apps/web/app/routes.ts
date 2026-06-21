import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
    index('routes/home.tsx'),
    route('login', 'routes/auth/login.tsx'),
    route('register', 'routes/auth/register.tsx'),
    layout('routes/dashboard/layout.tsx', [
        route('dashboard', 'routes/dashboard/home.tsx'),
        route('dashboard/analytics', 'routes/dashboard/analytics.tsx'),
        route('dashboard/trips', 'routes/dashboard/trips.tsx'),
        route('dashboard/trips/:tripId', 'routes/dashboard/trip.tsx'),
        route('dashboard/bookings', 'routes/dashboard/bookings.tsx'),
        route('dashboard/community', 'routes/dashboard/community.tsx'),
        route('dashboard/explore', 'routes/dashboard/explore.tsx'),
        route('dashboard/settings', 'routes/dashboard/settings.tsx'),
    ]),
] satisfies RouteConfig
