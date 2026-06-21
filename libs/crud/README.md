# `@travix/crud` (Validation & Pagination Framework) 📦📐

This is an internal utility library that integrates **TypeBox** request/response validation, OpenAPI/Swagger generation, and database pagination formatting into **NestJS**.

It ensures all REST endpoints in the monorepo are type-safe, self-documenting, and follow standard response formats.

---

## 🛠️ Tech Stack & Selection Rationale

- **Schema Definition**: [@sinclair/typebox](https://github.com/sinclairzx81/typebox)
    - _Why TypeBox?_
        1. **High Runtime Performance**: It compiles schemas into optimized in-memory JavaScript validation functions using `Ajv` under the hood, yielding execution speeds up to 100x faster than standard reflection-based libraries (`class-validator`/`class-transformer`).
        2. **Single Source of Truth**: Eliminates type duplication. We write a schema definition once, and extract the static TypeScript type using `Static<typeof Schema>`.
        3. **Declarative OpenAPI Generation**: TypeBox schemas compile directly to standard JSON Schemas, allowing NestJS Swagger utilities to generate complete, interactive OpenAPI definitions automatically without class-level decorators.
- **Validation**: `validator` for string checks.
- **NestJS Integrations**: `@nestjs/common` and `@nestjs/swagger` (for custom decorators and OpenAPIs).
- **Database Pagination**: `typeorm` and `typeorm-extension` for paging data structures.

---

## 📁 Key Features & Modules

### 1. `@HttpEndpoint` Decorator (`src/decorators.ts`)

A custom decorator replacing the standard NestJS route decorators (like `@Get()`, `@Post()`, `@Body()`). It combines route declaration, validation, and Swagger generation into one declarative statement:

```typescript
@HttpEndpoint({
    method: 'POST',
    path: '/login',
    validate: {
        request: [{ type: 'body', schema: LoginPayloadSchema }],
        response: { schema: LoginResponseSchema, responseCode: 200 }
    }
})
```

### 2. Validation Exception Handler (`src/exceptions.ts`)

Converts raw TypeBox validation errors into standardized HTTP 400 Bad Request JSON payloads listing specific field issues, ensuring clean API consumer error handling.

### 3. Response TypeBox Interceptor (`src/interceptors.ts`)

An interceptor that runs before the response is returned to strip extra properties from database entities that are not declared in the response DTO TypeBox schema, preventing accidental data leaks.

### 4. Custom Format Registry (`src/formats.ts`)

Defines shared regex formats like `IsoDate`, `Uuid`, `Email`, etc., to enforce exact string patterns in TypeBox validation.

### 5. TypeORM Pagination Helpers (`src/pagination/`)

Standardized pagination logic:

- `paginateQueryBuilder(qb, { page, limit })`: Generates `items`, `meta` (total items, item count, items per page, total pages, current page), and navigation `links` (first, previous, next, last) for TypeORM queries.
- Exposes `PaginatedResponse(ItemSchema)` to wrap schemas in standard Swagger return models.

---

## 🚀 Building the Library

Because this is a workspace dependency imported by apps, any changes to `libs/crud` require compiling it to the output `dist` folder:

```bash
# Build the library
yarn workspace @travix/crud build

# Run in watch mode
yarn workspace @travix/crud dev
```
