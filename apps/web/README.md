# Travix Web Client (React Router v8) 🌐🎨

This is the interactive frontend application for Travix. It is built as a single-page app (SPA) using **React Router v8** (React 19) and styled with **Tailwind CSS v4**. It features an elegant multi-step Trip Generation Wizard, dynamic timelines, interactive budgets, and smooth animations powered by **Framer Motion**.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [React Router v8](https://reactrouter.com/) (formerly Remix v2) running in SPA mode with React 19.
    - _Why React Router v8?_ Standardized nested routing, layout outlets, page transition indicators, and Vite integration for blazing fast SPA loading and build speeds.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite` integration.
    - _Why Tailwind CSS v4?_ Offers a compile-time CSS processor that boosts application build speed, with zero configuration files required and seamless CSS-only theme token definitions.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for global token persistence and layout states.
    - _Why Zustand?_ A lightweight, hook-based state manager that avoids the re-render performance costs and boilerplate complexity of Redux or React Context.
- **API Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest) + [`react-query-kit`](https://github.com/liaoliao666/react-query-kit) for clean, encapsulated query and mutation hooks.
- **Animations**: [Framer Motion v12](https://www.framer.com/motion/) for micro-animations, slide-ins, and orchestrations.
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation resolvers.
- **Routing & Utility**: [Rapiq](https://github.com/rapiq/rapiq) for building URL filters and parsing query parameters.
- **Icons & Alerts**: `lucide-react` for icon assets and `sonner` for toast notifications.

---

## 📁 Project Directory Structure

```text
apps/web/app/
├── root.tsx                  # Base layout, HTML shell, and global providers setup
├── routes.ts                 # Page routes configuration (mapped to routes/)
├── app.css                   # Tailwind v4 configuration, theme tokens, and typography
├── Welcome/                  # Welcome assets
├── api/
│   └── swagger/              # Auto-generated API client using swagger-typescript-api
├── queries/                  # React Query Kit endpoints definitions
├── schemas/                  # Shared Zod validation schemas for forms
├── stores/                   # Zustand stores (session and auth management)
├── hooks/                    # Global React custom hooks (e.g. useDebounce)
├── lib/                      # Common axios and api clients configurations
├── types/                    # Shared frontend types
├── components/               # FEATURE-BASED component co-location
│   ├── ui/                   # Reusable atomic UI elements (Button, Card, Input)
│   ├── auth/                 # Sign-in and sign-up form components
│   ├── dashboard/            # Sidebar navigation, layout containers, and overview stats
│   ├── trip-wizard/          # Multi-step Destination, Details, and Interests wizard
│   ├── trip-detail/          # Day timeline, activities lists, hotel lists, and budget trackers
│   └── hero/                 # Landing page content blocks (Hero, Features, Pricing)
└── routes/                   # Routing page containers
    ├── home.tsx              # Public landing page
    ├── auth/                 # Auth layouts (login, register)
    └── dashboard/            # Protected views (overview, trips list, trip details)
```

---

## 📐 Design System & Guidelines

Developers and agents must conform to these styling and structural guidelines:

1.  **Strict File Size Limit**: No React file should exceed **150 lines**. Split large components into smaller, single-responsibility files inside their feature-specific subfolder (e.g., `components/trip-detail/`).
2.  **Color System**: Consistent color palettes defined in `app.css` using theme variables:
    - **Primary Background**: White (`bg-background`).
    - **Brand Primary Text**: Blue (`text-primary` / `bg-primary`).
    - **Supporting Copy**: Gray (`text-muted`).
    - **Contrast Text**: White (`text-secondary` / `bg-secondary`).
    - _Do not hardcode hex colors or custom inline grays._
3.  **Typography**: **Poppins** is loaded globally and is the _only_ font family allowed.
4.  **UI Logic**: The client is a presentation layer. Do not write business logic, filtering, or aggregations here; rely on the backend API as the single source of truth.
5.  **Path Aliasing**: Import files from subdirectories using the tilde alias (e.g., `~/queries/...`, `~/hooks/...`), avoiding deep relative paths.

---

## 🚀 Running the Web App

Start the frontend development server:

```bash
# From workspace root
yarn dev --filter=web

# Or inside apps/web
yarn dev
```

The application will run at: `http://localhost:5173`

---

## 🔄 API Client Generation

The web app uses `swagger-typescript-api` to generate a typed API client based on the backend Swagger OpenAPI JSON spec.

To regenerate the Swagger client definitions:

```bash
# Ensure apps/api is running on port 6500, then run:
yarn workspace web api:generate
```

This updates the client definitions inside `app/api/swagger/`.
