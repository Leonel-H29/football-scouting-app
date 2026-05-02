# Football Scouting App

A full-stack football scouting platform to search players, compare performance metrics, and manage user profiles.

The project is split into:

- `frontend/` — React + Vite + TypeScript client
- `backend/` — Express + TypeScript + Prisma + PostgreSQL API

---

## Tech Stack

### Frontend

- React 19
- Vite
- TypeScript
- React Router
- Zustand
- React Hook Form + Zod

### Backend

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- Swagger UI

---

## Prerequisites

- Node.js `>= 18` (required by backend)
- npm (or yarn, but examples below use npm)
- PostgreSQL 16+ (if running DB locally without Docker)
- Optional: Docker + Docker Compose

---

## Environment Variables

### Frontend (`frontend/.env`)

```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK_API=false
```

- `VITE_API_BASE_URL`: backend base URL
- `VITE_USE_MOCK_API`:
  - `false` => use backend first, fallback to mock data on network failure
  - `true` => force mock repositories only

### Backend (`backend/.env`)

You can copy from `backend/.env.example`:

```bash
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/scout_panel?schema=public
NODE_ENV=development
JWT_SECRET=your-super-secret-key-at-least-32-characters
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=12
WEB_URL=http://localhost:5173
```

Important notes:

- `JWT_SECRET` must be at least 32 characters.
- `WEB_URL` is used by backend CORS (set your frontend URL here).
- If you run DB with Docker Compose in this repo, so your `DATABASE_URL` should usually be:
  `postgresql://postgres:postgres@db:5432/scout_panel?schema=public`

---

## Run Locally (Without Docker)

### 1) Start backend

```bash
cd backend
npm install
npm run prisma:generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Backend runs on `http://localhost:3000`.

### 2) Start frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on Vite default (usually `http://localhost:5173`).

---

## Run with Docker (Backend + DB)

From `backend/`:

```bash
docker compose up --build
```

This starts:

- API server on `http://localhost:3000`
- PostgreSQL on `localhost:5433`
- pgAdmin on `http://localhost:5050`

Frontend still runs locally via `frontend/npm run dev`.

---

## Application Flows

### 1) Authentication Flow

1. User registers via `POST /api/auth/register`.
2. User logs in via `POST /api/auth/login`.
3. Backend returns a JWT access token.
4. Frontend stores session/user data in `localStorage`.
5. Protected routes (`/dashboard`, `/players`, `/profile`, etc.) require a valid session.
<img width="1828" height="880" alt="Screenshot from 2026-05-02 18-52-40" src="https://github.com/user-attachments/assets/691c477c-36b7-4fc9-8411-8e8ab366e1f0" />

### 2) Authorization Flow (Protected API)

1. Frontend sends `Authorization: Bearer <token>`.
2. Backend JWT middleware validates token.
3. Access is granted to `/api/users`, `/api/players`, `/api/teams`, `/api/seasons`.
4. Missing/invalid token returns `401 Unauthorized`.

### 3) Player Search Flow

1. Frontend sends query filters (`name`, `position`, `nationality`, `minAge`, `maxAge`, `page`, `limit`) to `GET /api/players`.
2. Backend validates query DTO.
3. Service queries Prisma repository and applies pagination.
4. Response includes `data` + `pagination`.

<img width="1828" height="880" alt="Screenshot from 2026-05-02 18-49-40" src="https://github.com/user-attachments/assets/6ec50cc1-bd94-43be-b1e6-675e23536dbd" />

// Favorite players

<img width="1828" height="880" alt="Screenshot from 2026-05-02 18-50-34" src="https://github.com/user-attachments/assets/e85f75f6-3e19-4d1b-a859-cf334c2ba5df" />

### 4) Player Comparison Flow

1. User selects 2–3 players.
2. Frontend sends `POST /api/players/compare` with `playerIds` and optional `seasonId`.
3. Backend aggregates stats and returns side-by-side comparison rows.
4. Frontend renders comparison table/charts.


<img width="1828" height="880" alt="Screenshot from 2026-05-02 18-50-05" src="https://github.com/user-attachments/assets/3d62712d-21fb-472d-956b-e64366e3347d" />


### 5) Profile Management Flow

1. Frontend fetches user details by id/email.
2. User updates profile through `PUT /api/users/:id`.
3. Backend ensures users can only update their own account.
4. Password update requires `password` + `confirmPassword`.

### 6) Resilience / Mock Fallback Flow

- Frontend repositories first call backend HTTP APIs.
- If backend is unreachable (`Unable to reach the backend service.`), app automatically falls back to local mock repositories (unless explicitly forced by environment flag).

---

## Testing

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

---

## API Documentation

- Interactive Swagger UI: `http://localhost:3000/docs`
- Backend API README: [`backend/README.md`](./backend/README.md)

---

## Project Structure

```text
football-scouting-app/
  frontend/
  backend/
```

For module-level API details, request/response schemas, and endpoint behavior, see [`backend/README.md`](./backend/README.md).
