# Job Application Tracker — Frontend

A React single-page app for tracking job applications, consuming the
[Django REST API backend](../backend). Built with Vite, Tailwind CSS, and
`react-router-dom`.

## Features

- **JWT-based auth** — signup and login, with the access token persisted in
  `localStorage` and attached automatically to every API request via an
  Axios interceptor
- **Protected routes** — the dashboard and application pages redirect to
  `/login` if the user isn't authenticated
- **Application dashboard** — view all of your applications at a glance,
  with company, role, and current status
- **Application detail view** — update an application's status and see its
  full status-change history, timestamped

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Styling | Tailwind CSS v4 |
| Routing | `react-router-dom` |
| HTTP client | Axios |
| Package management | [Bun](https://bun.sh) |
| Linting | oxlint |

## Pages

| Route | Description | Protected |
|---|---|---|
| `/signup` | Create a new account | No |
| `/login` | Log in, receive JWT | No |
| `/dashboard` | List of the logged-in user's applications | Yes |
| `/applications/new` | Form to add a new application | Yes |
| `/applications/:id` | Application detail — status update + history | Yes |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh)
- The backend API running locally at `http://localhost:8000` (see the
  [backend README](../backend/README.md))

### Setup

1. Install dependencies
   ```bash
   bun install
   ```

2. Start the dev server
   ```bash
   bun run dev
   ```

3. Open `http://localhost:5173`

The API base URL is currently hardcoded to `http://localhost:8000/api` in
`src/api/axios.js` — update this if pointing at a deployed backend.

## Architecture Notes

- **`src/api/axios.js`** — a shared Axios instance with a request
  interceptor that automatically attaches the JWT from `localStorage` to
  every outgoing request, so individual components never handle auth
  headers manually.
- **`src/context/AuthContext.jsx`** — holds login state and exposes
  `login()`/`logout()` via React Context, avoiding prop-drilling auth state
  through every component.
- **`src/components/ProtectedRoute.jsx`** — wraps any route that requires
  authentication; redirects to `/login` if no valid session exists.

## Known Limitations

- No UI for the backend's Contact endpoints yet — the API supports
  attaching recruiter/referral contacts to an application, but this
  frontend doesn't expose that yet.
- No token refresh handling — when the access token expires, the user is
  simply logged out rather than silently refreshed via the refresh token.
- State management is intentionally simple (`useState` + Context) given the
  app's scope — no Redux or similar, by design.

## License

MIT