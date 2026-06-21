# Travix CLI Tool (Nest Commander) 🛠️

This is the command-line utility for the Travix application. It is built as a **NestJS** console application using **`nest-commander`**, interfacing with **TypeORM** (`typeorm-extension`), `@travix/db`, and `@travix/seeders` to provide tools for database lifecycle, migrations, and lookup data seeding.

---

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (Console Mode)
- **CLI Commands**: [`nest-commander`](https://jmcdo29.github.io/nest-commander/) for declaring type-safe commands, options, and arguments using decorators.
- **ORM & Seeders**: [TypeORM](https://typeorm.io/) and [`typeorm-extension`](https://github.com/jorgebodega/typeorm-extension) for schema configuration, connection, and data seeding.
- **Formatting**: `chalk` (console colors) and `change-case-all`.

---

## 📁 Project Directory Structure

```text
apps/cli/src/
├── cli.module.ts             # Root CLI module registering connection configurations and commands
├── main.ts                   # Bootstrapping script using CommandFactory from nest-commander
├── config/                   # CLI Database configuration loader
└── commands/
    ├── index.ts
    └── db/                   # Database namespace commands
        ├── root.cmd.ts       # Master "db" command registry
        ├── init.cmd.ts       # "db init" command (drops/creates schema)
        ├── seed.cmd.ts       # "db seed" command (runs lookup/dummy seeders)
        └── migrations/       # Migrations sub-namespace
            ├── create.cmd.ts   # "db migrations create" (scaffolds new migration)
            ├── generate.cmd.ts # "db migrations generate" (diffs DB and generates migration)
            ├── revert.cmd.ts   # "db migrations revert" (undoes last migration)
            ├── run.cmd.ts      # "db migrations run" (applies pending migrations)
            └── show.cmd.ts     # "db migrations show" (displays migration history status)
```

---

## 🚀 Available Commands

Run commands via the root monorepo script wrapper:

### ⚙️ Database Initialization

Initialize the database schema from scratch. This drops existing tables (if any) and synchronizes entities:

```bash
# Executed from root monorepo
yarn cli db init
```

### 🌱 Database Seeding

Seed default master/lookup records (roles, countries, states, cities, currencies) and optional developer dummy test-data:

```bash
# Seed default lookup data
yarn cli db seed

# Seed with specific seeders (default: InitialSeeder)
yarn cli db seed --seeder DummySeeder
```

### 📦 Migrations Management

TypeORM migrations are managed via commander wrappers:

- **Generate an Automatic Migration** (diffs entities against the current database schema):
  ```bash
  yarn cli db migrations generate <migration_name>
  ```
- **Create a Blank Manual Migration**:
  ```bash
  yarn cli db migrations create <migration_name>
  ```
- **Run Pending Migrations**:
  ```bash
  yarn cli db migrations run
  ```
- **Revert the Last Run Migration**:
  ```bash
  yarn cli db migrations revert
  ```
- **Show Migrations Status**:
  ```bash
  yarn cli db migrations show
  ```

---

## ⚙️ Configuration

Ensure you have a `.env` configured inside `apps/cli/.env` or configured globally:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_DATABASE=travix
```
