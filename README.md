# Ledger — Job Application Tracker

A calmer way to keep your job search in order. Ledger brings applications, current statuses, and status history together in one focused workspace.

**Live app:** [jobtracker.yashgaurkar.me](https://jobtracker.yashgaurkar.me)

## What you can do

- Create an account and sign in with JWT authentication.
- Add applications with a company, role, application date, and optional job posting link.
- Review applications in a dashboard with status totals and quick filters.
- Update an application’s status, review its timestamped history, or remove it.
- Use a responsive interface designed for desktop and mobile screens.

### Application statuses

**Applied · Phone screen · Interview · Offer · Rejected**

## Screens and routes

| Route | Screen | Access |
|---|---|---|
| `/` | Product landing page | Public |
| `/signup` | Create an account | Public |
| `/login` | Sign in | Public |
| `/dashboard` | Application overview and status filters | Signed in |
| `/applications/new` | Add an application | Signed in |
| `/applications/:id` | Application details, status updates, and history | Signed in |

Signed-in routes redirect to `/login` when there is no saved access token. An unauthorized API response clears saved tokens and returns the user to the login screen.

## Built with

| Area | Technology |
|---|---|
| UI | React 19 |
| Language | JavaScript (ES modules) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| API requests | Axios |
| Package manager | [Bun](https://bun.sh) |
| Linting | oxlint |

## Run locally

### Requirements

- [Bun](https://bun.sh)
- The [Django REST API](https://github.com/yashG0/full-stack-job-application-tracker) running locally at `http://localhost:8000`

### Start the frontend

```bash
bun install
bun run dev
```

Open [http://localhost:5173](http://localhost:5173). The backend runs separately; see its [setup instructions](https://github.com/yashG0/full-stack-job-application-tracker#run-locally).

### Quality checks

```bash
bun run lint
bun run build
```

## Frontend structure

```text
src/
├── api/axios.js                 # Shared Axios client and auth interceptors
├── components/
│   ├── Brand.jsx                # Ledger logo and wordmark
│   ├── Layout.jsx               # Signed-in application shell
│   └── ProtectedRoute.jsx       # Signed-in route guard
├── context/AuthContext.jsx      # Login state and logout actions
├── lib/status.js                # Application status labels and styles
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── NewApplication.jsx
│   └── ApplicationDetail.jsx
├── App.jsx                      # Route definitions and lazy page loading
└── index.css                    # Tailwind entry point and shared styles
```

The shared Axios client attaches the access token from browser `localStorage` to API requests. The authentication context handles sign-in and sign-out, and the protected-route component guards the dashboard and application screens.

## API configuration

The API base URL is read from `VITE_API_URL` at build time. If it is not set, the frontend falls back to `http://localhost:8000/api`.

For a deployed API, configure the frontend environment with its base URL, for example:

```env
VITE_API_URL=https://api.yashgaurkar.me/api
```

The frontend and backend are separate applications and both must be available for sign-in and application data to work.

## Current scope

- The backend supports recruiter and referral contacts, but the frontend does not yet have a contacts screen.
- Access-token refresh is not implemented in the frontend. When an access token expires, the user is asked to sign in again.
- Authentication tokens are stored in browser `localStorage`.
