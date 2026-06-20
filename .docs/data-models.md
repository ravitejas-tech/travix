# Travix — Data Models

## Overview

This document describes the database schema for the Travix multi-user trip planner. All entities extend `BaseEntity` which provides a ULID primary key, `createdAt`, `updatedAt`, and `deletedAt` (soft delete) columns.

---

## Entity Relationship Diagram

```
users (1) ──────────────────── (N) trips
                                     │
                    ┌────────────────┼────────────────────┐
                    │                │                     │
             (1) itineraries  (1) budget_estimations  (N) hotel_suggestions
                    │
             (N) itinerary_days
                    │
             (N) activities
```

### Cardinalities

| Parent            | Child                | Type       |
|-------------------|----------------------|------------|
| `users`           | `trips`              | One-to-Many |
| `trips`           | `itineraries`        | One-to-One  |
| `trips`           | `budget_estimations` | One-to-One  |
| `trips`           | `hotel_suggestions`  | One-to-Many |
| `itineraries`     | `itinerary_days`     | One-to-Many |
| `itinerary_days`  | `activities`         | One-to-Many |

---

## Enums

### `BudgetType`
| Value    | Description                         |
|----------|-------------------------------------|
| `LOW`    | Budget travel, hostels, street food |
| `MEDIUM` | Mid-range hotels, casual dining     |
| `HIGH`   | Luxury hotels, fine dining          |

### `TripStatus`
| Value        | Description                                      |
|--------------|--------------------------------------------------|
| `DRAFT`      | Created but not yet submitted for AI generation  |
| `GENERATING` | AI is currently generating the itinerary         |
| `ACTIVE`     | Itinerary generated and visible to the user      |
| `ARCHIVED`   | Trip marked as completed or dismissed            |

### `ActivityType`
| Value         | Description                      |
|---------------|----------------------------------|
| `FOOD`        | Restaurants, cafes, street food  |
| `CULTURE`     | Museums, temples, historical sites |
| `ADVENTURE`   | Outdoor, sports, hiking          |
| `SHOPPING`    | Markets, malls, boutiques        |
| `SIGHTSEEING` | Landmarks, viewpoints            |
| `OTHER`       | Anything that doesn't fit above  |

### `HotelCategory`
| Value       | Description                          |
|-------------|--------------------------------------|
| `BUDGET`    | Hostels, guesthouses, budget hotels  |
| `MID_RANGE` | 3–4 star hotels                      |
| `LUXURY`    | 5 star hotels, boutique resorts      |

---

## Entities

### `users` — UserEntity

> Already exists. Stores authenticated user accounts.

| Column        | Type         | Nullable | Notes               |
|---------------|--------------|----------|---------------------|
| `id`          | varchar(26)  | No       | ULID primary key    |
| `firstName`   | varchar      | Yes      |                     |
| `lastName`    | varchar      | Yes      |                     |
| `phone`       | varchar      | Yes      |                     |
| `email`       | varchar      | No       | Unique              |
| `password`    | varchar      | Yes      | Hashed              |
| `dateOfBirth` | date         | Yes      |                     |
| `createdAt`   | datetime     | No       | Auto-managed        |
| `updatedAt`   | datetime     | No       | Auto-managed        |
| `deletedAt`   | datetime     | Yes      | Soft delete         |

---

### `trips` — TripEntity

> Core record for a single user's trip. Owns the itinerary, budget, and hotel suggestions.

| Column        | Type         | Nullable | Notes                                |
|---------------|--------------|----------|--------------------------------------|
| `id`          | varchar(26)  | No       | ULID primary key                     |
| `userId`      | varchar(26)  | No       | FK → `users.id`, indexed             |
| `destination` | varchar      | No       | Free-text city/country               |
| `numberOfDays`| int          | No       | 1–30                                 |
| `budgetType`  | enum         | No       | `LOW \| MEDIUM \| HIGH`              |
| `interests`   | json         | No       | `string[]` e.g. `["Food","Culture"]` |
| `status`      | enum         | No       | `DRAFT \| GENERATING \| ACTIVE \| ARCHIVED`, default `DRAFT` |
| `createdAt`   | datetime     | No       | Auto-managed                         |
| `updatedAt`   | datetime     | No       | Auto-managed                         |
| `deletedAt`   | datetime     | Yes      | Soft delete                          |

**Relations:**
- `@ManyToOne` → `UserEntity` (via `userId`)
- `@OneToOne` → `ItineraryEntity`
- `@OneToOne` → `BudgetEstimationEntity`
- `@OneToMany` → `HotelSuggestionEntity`

---

### `itineraries` — ItineraryEntity

> Container for a trip's day-by-day plan. Created once per trip when AI generation completes.

| Column      | Type        | Nullable | Notes                        |
|-------------|-------------|----------|------------------------------|
| `id`        | varchar(26) | No       | ULID primary key             |
| `tripId`    | varchar(26) | No       | FK → `trips.id`, unique      |
| `createdAt` | datetime    | No       | Auto-managed                 |
| `updatedAt` | datetime    | No       | Auto-managed                 |
| `deletedAt` | datetime    | Yes      | Soft delete                  |

**Relations:**
- `@OneToOne` → `TripEntity` (via `tripId`)
- `@OneToMany` → `ItineraryDayEntity`

---

### `itinerary_days` — ItineraryDayEntity

> Represents a single day within an itinerary.

| Column         | Type        | Nullable | Notes                              |
|----------------|-------------|----------|------------------------------------|
| `id`           | varchar(26) | No       | ULID primary key                   |
| `itineraryId`  | varchar(26) | No       | FK → `itineraries.id`, indexed     |
| `dayNumber`    | int         | No       | 1-based index                      |
| `summary`      | varchar     | Yes      | AI-generated one-line day summary  |
| `createdAt`    | datetime    | No       | Auto-managed                       |
| `updatedAt`    | datetime    | No       | Auto-managed                       |
| `deletedAt`    | datetime    | Yes      | Soft delete                        |

**Relations:**
- `@ManyToOne` → `ItineraryEntity` (via `itineraryId`)
- `@OneToMany` → `ActivityEntity`

---

### `activities` — ActivityEntity

> A single activity within a day. Can be AI-generated or manually added by the user.

| Column            | Type        | Nullable | Notes                                                   |
|-------------------|-------------|----------|---------------------------------------------------------|
| `id`              | varchar(26) | No       | ULID primary key                                        |
| `itineraryDayId`  | varchar(26) | No       | FK → `itinerary_days.id`, indexed                       |
| `name`            | varchar     | No       | Activity name                                           |
| `description`     | text        | Yes      | Additional detail                                       |
| `type`            | enum        | No       | `FOOD \| CULTURE \| ADVENTURE \| SHOPPING \| SIGHTSEEING \| OTHER` |
| `sortOrder`       | int         | No       | Display order within the day                            |
| `isCustom`        | boolean     | No       | `false` = AI-generated, `true` = user-added, default `false` |
| `createdAt`       | datetime    | No       | Auto-managed                                            |
| `updatedAt`       | datetime    | No       | Auto-managed                                            |
| `deletedAt`       | datetime    | Yes      | Soft delete                                             |

**Relations:**
- `@ManyToOne` → `ItineraryDayEntity` (via `itineraryDayId`)

---

### `budget_estimations` — BudgetEstimationEntity

> AI-estimated cost breakdown for a trip. One record per trip.

| Column          | Type          | Nullable | Notes                         |
|-----------------|---------------|----------|-------------------------------|
| `id`            | varchar(26)   | No       | ULID primary key              |
| `tripId`        | varchar(26)   | No       | FK → `trips.id`, unique       |
| `flights`       | decimal(10,2) | Yes      | Estimated flight cost         |
| `accommodation` | decimal(10,2) | Yes      | Estimated accommodation cost  |
| `food`          | decimal(10,2) | Yes      | Estimated food cost           |
| `activities`    | decimal(10,2) | Yes      | Estimated activities cost     |
| `total`         | decimal(10,2) | No       | Sum of all categories         |
| `currency`      | varchar(3)    | No       | ISO 4217 code, default `USD`  |
| `createdAt`     | datetime      | No       | Auto-managed                  |
| `updatedAt`     | datetime      | No       | Auto-managed                  |
| `deletedAt`     | datetime      | Yes      | Soft delete                   |

**Relations:**
- `@OneToOne` → `TripEntity` (via `tripId`)

---

### `hotel_suggestions` — HotelSuggestionEntity

> AI-suggested hotels for a trip's destination. Multiple records per trip.

| Column       | Type          | Nullable | Notes                                   |
|--------------|---------------|----------|-----------------------------------------|
| `id`         | varchar(26)   | No       | ULID primary key                        |
| `tripId`     | varchar(26)   | No       | FK → `trips.id`, indexed                |
| `name`       | varchar       | No       | Hotel name                              |
| `category`   | enum          | No       | `BUDGET \| MID_RANGE \| LUXURY`         |
| `rating`     | decimal(2,1)  | Yes      | e.g. `4.5`                              |
| `description`| text          | Yes      | Short description or highlights         |
| `sortOrder`  | int           | No       | Display order                           |
| `createdAt`  | datetime      | No       | Auto-managed                            |
| `updatedAt`  | datetime      | No       | Auto-managed                            |
| `deletedAt`  | datetime      | Yes      | Soft delete                             |

**Relations:**
- `@ManyToOne` → `TripEntity` (via `tripId`)

---

## Data Isolation

Every `trip` is scoped to a `userId`. All downstream entities (itinerary, budget, hotels, activities) are reachable only through a trip. API queries must always filter by the authenticated user's `userId` — no cross-user data access is possible through this model.
