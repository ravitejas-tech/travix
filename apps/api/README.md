# Travix API Server (NestJS REST API) 🚀

This is the core backend API for the Travix application. It is built using **NestJS**, following a strict **CQRS (Command Query Responsibility Segregation)** pattern, and integrates with **TypeORM** for persistence and **Google Gemini AI** for travel generation.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [NestJS](https://nestjs.com/) (modular, enterprise-grade architecture).
  - _Why NestJS?_ It enforces clean architecture via modularity, dependency injection, and a structured layout. This ensures that the CLI and API server can share database configurations, TypeORM entities, and core commands/queries seamlessly.
- **Architecture Pattern**: **CQRS** via `@nestjs/cqrs` for clean separation of read (Query) and write (Command) logic.
- **AI Integrations**: [Google Gemini SDK (`@google/genai`)](https://github.com/google/generative-ai-js) for structured JSON generation.
- **Validation & OpenAPI**: `@sinclair/typebox` and the custom `@travix/crud` library for runtime validation and automatic Swagger Generation.
- **ORM & Database**: [TypeORM](https://typeorm.io/) connecting to MySQL/MariaDB.
  - _Why TypeORM?_ Excellent TypeScript compatibility, decorator-based entity mapping, and out-of-the-box integration with `typeorm-extension` for CLI seeding and migrations.
  - _Why MySQL/MariaDB?_ Relational data consistency is essential for structured trips. We model users, trips, itinerary days, activities, and budget elements with strict foreign keys and transactional updates.
- **Authentication**: Stateless JWT token authentication with [Passport](http://www.passportjs.org/).
- **Authorization**: CASL (Attribute-based Access Control).
- **Logger**: [Pino](https://github.com/pinojs/pino) (`nestjs-pino`) for fast and structured JSON logging.

---

## 📁 Project Directory Structure

```text
apps/api/src/
├── api.module.ts            # Root API module configuring TypeORM, CQRS, Config, and Logger
├── main.ts                  # NestJS entrypoint (cors, validation configurations, swagger setup)
├── config/                  # Configuration loaders (database, jwt, etc.)
├── strategies/              # Authentication strategies (JWT extraction and validation)
├── guards/                  # Security guards (JwtAuthGuard, CaslGuard)
├── decorators/              # Decorators like @AuthUser to access JWT profiles in controllers
├── utils/                   # Setup utilities (Swagger OpenAPI configuration helper)
├── cqrs/                    # CENTRALIZED CQRS Layer
│   ├── commands/
│   │   ├── impl/            # CQRS Command class definitions
│   │   └── handlers/        # CQRS Command execution handlers (business/write logic)
│   └── queries/
│       ├── impl/            # CQRS Query class definitions
│       └── handlers/        # CQRS Query execution handlers (read/DB queries)
└── modules/                 # Modular HTTP Controllers & Registrations (Request/Response only)
    ├── auth/                # Sign-in/Sign-up/Session endpoints
    ├── generation/          # Google Gemini provider abstraction (Gemini & Stub clients)
    ├── locations/           # Country/State/City lookup endpoints
    ├── trips/               # Trip creation, list, and delete endpoints
    ├── itinerary/           # Itinerary day & activity planning endpoints
    └── hotels/              # Hotel suggestions endpoints
```

---

## 🔑 Architecture Principles

Every developer and agent working on this API must follow these strict patterns:

1.  **Strict CQRS**: No database query, entity mapping, ownership checks, or business logic resides in NestJS controllers. Controllers are _purely_ HTTP endpoints that validate input and dispatch commands/queries:
    - **Writes/Actions**: Use `CommandBus` + Command Handlers.
    - **Reads/Fetches**: Use `QueryBus` + Query Handlers.
2.  **No Custom shared Business Services**: Do not write feature business services. All business logic lives in their respective CQRS handlers. Shared integrations (e.g. `TokenService` or `GenerationService` calling Gemini API) are exceptions.
3.  **Database Access**: Always use `this.datasource.manager` inside CQRS handlers. Never inject repositories directly. Multiple database operations must be wrapped in transactions: `manager.transaction(...)`.
4.  **TypeBox for DTO Validation**: Do not use `class-validator`. Define validation schemas in `dtos/payloads.ts` and `dtos/responses.ts` using TypeBox. Static TypeScript types are derived from schemas: `type Payload = Static<typeof PayloadSchema>`.
5.  **Declarative Endpoints**: Declare controllers with the `@HttpEndpoint()` decorator from `@travix/crud`. Do not use bare `@Get`, `@Post`, `@Body` decorators.

---

## 🤖 AI Generation Layer

The AI generation layer is located in `src/modules/generation/`.

- It uses the abstract `GenerationService` interface, allowing hot-swapping generation engines.
- **`GeminiGenerationService`**: Communicates with the Google Gemini API using structured schemas (defined in `@travix/shared`) to enforce JSON layouts.
- **`StubGenerationService`**: A deterministic mockup generator that outputs valid travel plans, active when no `GEMINI_API_KEY` is present.
- Gemini is only invoked inside CQRS command/query handlers.

---

## ⚙️ Configuration

Set up environment variables in `apps/api/.env`:

```env
PORT=6500
HOST=0.0.0.0

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_DATABASE=travix

JWT_ACCESS_SECRET=your_access_secret_key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d

# Google Gemini (Optional)
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-2.5-flash
```

---

## 🚀 Running the API

Run the API locally in watch mode:

```bash
# From workspace root
yarn dev --filter=api

# Or inside apps/api
yarn dev
```

The API will start on: `http://localhost:6500`
Swagger documentation is generated automatically at: `http://localhost:6500/openapi`
