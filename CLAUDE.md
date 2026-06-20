Strict rulebook for consistency. Follow without exception. If unclear, check existing code before inventing new patterns.

## Global

- File naming: kebab-case everywhere (`user-card.tsx`, `create-user.command.ts`). No PascalCase/camelCase filenames.
- One file = one responsibility. Don't mix UI, logic, types, constants in one file.

## API (NestJS + TypeORM + CQRS)

- Naming: `user.controller.ts`, `create-user.command.ts`/`.handler.ts`, `get-users.query.ts`/`.handler.ts`, `user.entity.ts`.
- Controllers: request/response only, delegate to `CommandBus`/`QueryBus`. No business logic, no DB ops, no data transforms.
- Logic placement: simple pass-through → Controller→Bus; shared/reusable → Service; complex/multi-step/multi-DB-op → CQRS Handler.
- DB access: always `this.datasource.manager`. Never `getRepository()` or `@InjectEntityManager()`.
- Multiple DB ops → wrap in `manager.transaction()`.
- Relations: manually define the FK column, then `@ManyToOne`/`@JoinColumn`. Never rely on implicit joins.
- Every entity extends `BaseEntity` (`id`, `createdAt`, `updatedAt`, `deletedAt`).
- Migrations: pre-production → keep only one file, delete & regenerate on each change. Post-production → never delete, always add new.
- Seeders: `InitialSeeder` (required app data), `DummySeeder` (dev/test data).
- Authorization: CASL only, no custom permission logic.
- Versioning: all routes under `/v1`; controller classes named `V1XController`.
- Exceptions: NestJS built-ins only (`NotFoundException`, `BadRequestException`, etc.), never raw `Error`.
- Logging: NestJS `Logger`, never `console.log`.
- Handlers: split complex `execute()` into small private methods; `execute()` stays a high-level orchestration summary.

## Web (React Router)

- Frontend = dumb UI only. No business logic, no client-side filtering/sorting — backend is source of truth.
- API calls: only `createQuery`/`createMutation` from `react-query-kit`. Never raw `useQuery`/`useMutation` in components.
- State: prefer local state or URL params. Zustand only for true global state.
- Components: small, focused, typed props. No business logic or API calls inside queries.
- File separation: `*.types.ts`, `*.schema.ts` (Zod), `*.query.ts`, `*.constants.ts`, `*.store.ts`, `*.data.ts`, `use-*.ts`.
- Error handling: reusable `<LoadingScreen/>` / `<ErrorScreen/>`; always toast on mutation success/error.
- Forms: react-hook-form + Zod only. No per-field `useState`.
- Performance: memoize with `React.memo`/`useMemo`/`useCallback`; avoid creating new objects/functions inline in JSX.
- Styling: Tailwind CSS.

## Final Note

Consistency > Creativity. This file exists so every dev and AI agent produces code that looks like one person wrote it.
