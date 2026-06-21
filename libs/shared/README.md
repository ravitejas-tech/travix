# `@travix/shared` (Enums, Types & AI Schemas) 📦🔗

This shared internal package consolidates **TypeScript types, enums, constants, Google Gemini AI structured generation schemas**, and utility builders. It is imported by the frontend **web app**, the **REST API server**, and the **CLI command tool**, ensuring monorepo-wide consistency.

---

## 🛠️ Tech Stack & Key Libraries

- **Language**: TypeScript (compiled into ESM and CommonJS outputs via standard `tsconfig`).
- **AI Schema Types**: [@google/genai](https://github.com/google/generative-ai-js)
    - _Why Shared AI Schemas?_ Centralizing enums, constants, and structured AI response schemas (like `generationTripSchema`) ensures that the frontend form controls, the API command handlers, and the database entities are perfectly aligned. By using `@google/genai` type definitions, these schemas can be passed directly to Gemini API requests to mathematically guarantee the AI generates JSON matching our database schemas, preventing runtime parser errors.
- **Date Utilities**: `date-fns` for date math and interval calculations.

---

## 📁 Package Modules

### 1. Enums (`src/enums/`)

Standardized business enums ensuring uniform data persistence and display:

- **`BudgetCategory`**: `Economy` | `Standard` | `Luxury`
- **`CompanionType`**: `Solo` | `Couple` | `Family` | `Friends`
- **`HotelCategory`**: `Budget` | `MidRange` | `Luxury` | `Resort` | `Boutique`
- **`ActivityType`**: `Sightseeing` | `Dining` | `Adventure` | `Transit` | `Shopping` | `Relaxation` | `Entertainment` | `Cultural` | `Nature`

### 2. AI Structured Schemas (`src/generation/`)

Official schema definitions leveraging `@google/genai` types, which are fed into Gemini during structured AI execution to ensure the returned responses comply with specific JSON structures:

- `generationTripSchema`: Combines days, hotels list, and budget estimations.
- `generationActivitySchema` & `generationDaySchema`: Defines day-by-day activities.
- `generationBudgetSchema`: Standardizes budget breakdowns (flights, accommodation, food, activities).
- `generationHotelSchema`: Dictates hotel recommendation models.

### 3. Builder Utility (`src/utils/builder.ts`)

A proxy-based class builder function (`Builder`) supporting class and interface creation. Enables writing fluent builder chains for tests and mock generation:

```typescript
const trip = Builder(TripCommand).destination('Paris').budget(BudgetCategory.Standard).build()
```

### 4. Types (`src/types/`)

Contains authentication JWT payload models, shared response interface wrappers, and base objects.

---

## 🚀 Building the Library

Compile the shared package:

```bash
yarn workspace @travix/shared build
```

Any modifications to the enums, AI schemas, or types require building this package before building or running dependant applications.
