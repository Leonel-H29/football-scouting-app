# Football Scout Backend

A production-oriented backend for a football scout panel challenge.

## Stack

- Express
- TypeScript
- PostgreSQL
- Prisma
- Hexagonal Architecture
- class-validator for DTO validation
- Swagger UI for API documentation
- Jest for unit tests

## Features

- Search players by name
- Filter players by position, nationality, and age range
- Compare 2 or 3 players side by side
- Separate modules for players, teams, and seasons
- Centralized validation and error handling
- Dockerized PostgreSQL and server
- Seed data with realistic football entities and stats
- OpenAPI documentation at `/docs`

## Environment variables

Create a `.env` file with:

```bash
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/scout_panel?schema=public
NODE_ENV=development
```

## Local setup

```bash
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Testing

```bash
npm test
```

## Docker

Start the database and server:

```bash
docker compose up --build
```

## API

### Players

- `GET /api/players`
- `POST /api/players/compare`

### Teams

- `GET /api/teams`

### Seasons

- `GET /api/seasons`

### Documentation

- `GET /docs`

## Architectural decisions

- Hexagonal Architecture keeps business rules isolated from Express and Prisma.
- Repository interfaces live in the domain layer and concrete Prisma repositories live in infrastructure.
- DTO validation is handled at the boundary with `class-validator` and `class-transformer`.
- Prisma is wrapped by a singleton client to avoid duplicate connections during development.
- Comparison logic is implemented as a dedicated application service to keep the controller thin.
- Swagger decorators are applied to controllers and DTOs, while the runtime OpenAPI document is served through Swagger UI.

## Trade-offs and improvements

- The current implementation prioritizes clarity and extensibility over a fully generic query engine.
- A future step could add pagination, caching, and indexed search optimization.
- Another useful extension would be auth and shortlist management.
- Integration tests against PostgreSQL could be added in addition to the unit suite.
