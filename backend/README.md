# Football Scout Backend API

Production-oriented backend API for a football scouting application.

## Stack

- Express
- TypeScript
- PostgreSQL
- Prisma
- Hexagonal / Clean-style modular architecture
- class-validator + class-transformer
- JWT authentication
- Swagger UI documentation
- Jest tests

---

## Features

- User registration and login
- JWT-protected routes
- User profile lookup and update
- Search players by multiple filters
- Compare 2 or 3 players side by side
- List teams and seasons
- Validation and centralized error handling
- Prisma migrations + seed support
- Dockerized services

---

## Prerequisites

- Node.js `>= 18`
- npm
- PostgreSQL (local or Docker)

---

## Environment Variables

Create `backend/.env` (you can copy from `.env.example`):

```bash
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/scout_panel?schema=public
NODE_ENV=development
JWT_SECRET=your-super-secret-key-at-least-32-characters
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=12
WEB_URL=http://localhost:5173
```

Notes:

- `JWT_SECRET` minimum length is enforced.
- `WEB_URL` supports CORS origins (comma-separated if needed).
- If using this repo Docker Compose DB, PostgreSQL is exposed at `5433`.

---

## Local Setup

```bash
npm install
npm run prisma:generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Backend URL: `http://localhost:3000`  
Health check: `GET /health`  
Swagger docs: `GET /docs`

---

## Docker

From `backend/`:

```bash
docker compose up --build
```

Services:

- API: `http://localhost:3000`
- PostgreSQL: `localhost:5433`
- pgAdmin: `http://localhost:5050`

---

## Authentication and Security

### Public routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /health`
- `GET /docs`

### Protected routes (require Bearer JWT)

- `/api/users/*`
- `/api/players/*`
- `/api/teams/*`
- `/api/seasons/*`

Header format:

```http
Authorization: Bearer <access_token>
```

---

## API Conventions

- Responses use an envelope pattern:
  - success: `{ "success": true, "data": ... }`
  - error: `{ "success": false, "error": { "code": "...", "message": "..." } }`
- Validation errors return `400`.
- Auth failures return `401`.
- Not found returns `404`.
- Conflicts (e.g., duplicate email/username) return `409`.

---

## Endpoints

## Health

- `GET /health` — service status check.

## Auth

- `POST /api/auth/register` — create user account.
- `POST /api/auth/login` — authenticate and return access token.

## Users (JWT required)

- `GET /api/users/:id` — get public user profile by id.
- `GET /api/users/by-email?email=...` — get public user profile by email.
- `GET /api/users/password/by-email?email=...` — get password hash for authenticated user email flow.
- `PUT /api/users/:id` — update current authenticated user profile.

## Players (JWT required)

- `GET /api/players` — search players with filters:
  - `name`
  - `position` (`GOALKEEPER | DEFENDER | MIDFIELDER | FORWARD`)
  - `nationality`
  - `minAge`
  - `maxAge`
  - `page` (default `1`)
  - `limit` (default `20`, max `100`)
- `POST /api/players/compare` — compare players:
  - body: `playerIds` (2..3 ids), optional `seasonId`

## Teams (JWT required)

- `GET /api/teams` — optional filters: `name`, `country`.

## Seasons (JWT required)

- `GET /api/seasons` — optional filters: `year`, `name`.

---

## Request Examples

### Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Lionel",
    "surname":"Messi",
    "email":"leo@example.com",
    "username":"lmessi",
    "password":"strongPassword123",
    "confirmPassword":"strongPassword123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username":"lmessi",
    "password":"strongPassword123"
  }'
```

### Search Players

```bash
curl "http://localhost:3000/api/players?name=lautaro&position=FORWARD&page=1&limit=20" \
  -H "Authorization: Bearer <token>"
```

### Compare Players

```bash
curl -X POST http://localhost:3000/api/players/compare \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "playerIds":["player-id-1","player-id-2"],
    "seasonId":"season-id-2024"
  }'
```

---

## Domain Model (Prisma)

Main entities:

- `User`
- `Team`
- `Season`
- `Player`
- `PlayerStats` (unique by `playerId + seasonId`)

Position enum:

- `GOALKEEPER`
- `DEFENDER`
- `MIDFIELDER`
- `FORWARD`

---

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm test
npm run test:watch
npm run test:coverage
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
npm run prisma:studio
```

---

## Testing

Run all backend tests:

```bash
npm test
```

Test suite includes auth, users, players, teams, and seasons modules.

---

## API Documentation

Interactive API docs (Swagger UI):  
`http://localhost:3000/docs`
