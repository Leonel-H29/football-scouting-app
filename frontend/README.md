# Scouting Lab Frontend

React + Vite + TypeScript frontend for player search, comparison, authentication, and profile management.

## Run locally

```bash
npm install
npm run dev
```

## Environment variables

- `VITE_API_BASE_URL` — backend base URL, defaults to `http://localhost:3000`
- `VITE_USE_MOCK_API` — set to `true` to force local mock repositories

## Architecture notes

- Domain logic is isolated from React and infrastructure code.
- UI talks to use cases and repositories through typed ports.
- HTTP adapters are wrapped with mock fallbacks so the app remains usable without a live backend.
- Search and filters are controlled through URL parameters.
- Favorites and auth session are persisted in `localStorage`.
- Basic unit tests cover utility and UI behavior.
