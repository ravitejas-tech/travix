# `@travix/seeders` (Database Seeder Library) 📦🌱

This internal library provides seeding engines and script definitions to populate lookup tables and default database states. It is imported and executed by the **CLI application** via the `db seed` commands.

---

## 🛠️ Tech Stack & Source Data

- **Framework**: [`typeorm-extension`](https://github.com/jorgebodega/typeorm-extension) seeder architecture.
- **Geographic Data Source**: `@countrystatecity/countries`
    - _Why_: Provides comprehensive, structured geographical databases (Countries, States, and Cities) out-of-the-box, saving the effort of manually harvesting lookup arrays.
- **Database entities**: Imports and inserts records into models defined in `@travix/db`.

---

## 📁 Seeder Registry

The library exposes the following seeding scripts:

1.  **`RoleSeeder`** (`src/role.seeder.ts`)
    - Creates standard user and administrator roles (`User`, `Admin`).
2.  **`CurrencySeeder`** (`src/currency.seeder.ts`)
    - Seeds universal currencies with code, name, and symbols (USD, EUR, GBP, INR, etc.).
3.  **`CountryStateCitySeeder`** (`src/country-state-city.seeder.ts`)
    - Iterates through world geographical data, inserting countries, linking them to their currencies, and creating child state and city trees.

---

## 🚀 Building & Invoking

### Compile the Library

```bash
yarn workspace @travix/seeders build
```

### Run Seeders

Run the seeders using the command-line utility from the monorepo root:

```bash
# Runs default seeding tasks (role, currency, locations)
yarn cli db seed
```
