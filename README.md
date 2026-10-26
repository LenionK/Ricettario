# Ricettario

![CI](https://github.com/LenionK/Ricettario/actions/workflows/ci.yml/badge.svg)

Full-stack web app to save recipes, plan the week's meals and generate a shopping list with matching ingredients summed up.

> 🚧 Work in progress — **Sprint 1**: recipe list done, recipe creation and editing next. See [BACKLOG.md](BACKLOG.md) for the roadmap.

## Tech stack

| Layer    | Technology                                   |
|----------|----------------------------------------------|
| Frontend | React 19, TypeScript, Vite, Oxlint           |
| Backend  | ASP.NET Core Web API (.NET 10), EF Core      |
| Database | PostgreSQL 17 (Npgsql provider)              |
| Tooling  | Docker Compose, GitHub Actions               |

## Project structure

```
Ricettario/
├── Api/                  # ASP.NET Core Web API
├── client/               # React + TypeScript (Vite)
├── .github/workflows/    # CI pipeline
├── db/seed/              # Sample data (SQL)
├── docs/                 # Notes (command cheat sheet, in Italian)
├── docker-compose.yml    # PostgreSQL service
├── .env.example          # Database credentials template
└── BACKLOG.md            # Vision, Definition of Done, user stories
```

## Getting started

### Prerequisites

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js 24](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Configure the database credentials

Copy `.env.example` to `.env` and choose a password:

```powershell
Copy-Item .env.example .env
```

### 2. Start the database

From the repository root:

```powershell
docker compose up -d db
docker compose ps        # wait for "(healthy)"
```

### 3. Configure the API and the database schema

Store the connection string in [User Secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets) (once), using the same password as in `.env`:

```powershell
dotnet user-secrets set "ConnectionStrings:Default" "Host=localhost;Port=5432;Database=ricettario;Username=ricettario;Password=YOUR_PASSWORD" --project Api
```

Create the tables with the EF Core migrations (the `dotnet-ef` tool is pinned in `dotnet-tools.json`):

```powershell
dotnet tool restore
dotnet ef database update --project Api
```

Optionally load 20 sample recipes:

```powershell
docker compose cp db/seed/recipes.sql db:/tmp/recipes.sql
docker compose exec db psql -U ricettario -d ricettario -f /tmp/recipes.sql
```

### 4. Start the API

From the repository root:

```powershell
dotnet run --project Api
```

The API listens on http://localhost:5062.

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | API and database status |
| `GET /api/recipes` | All recipes, ordered by title |

Interactive API docs (development only): http://localhost:5062/scalar

### 5. Start the client

In a second terminal:

```powershell
cd client
npm install    # first time only
npm run dev
```

Open http://localhost:5173. Requests to `/api` are proxied to the API by Vite.

### Stopping

- `Ctrl+C` in the API and client terminals
- `docker compose stop db` to stop the database (data is kept in the `pgdata` volume)

## Checks

The same checks run in CI on every pull request.

| What                    | Command                                   | Run from    |
|-------------------------|-------------------------------------------|-------------|
| Client lint             | `npm run lint`                            | `client/`   |
| Client type check       | `npx tsc -b`                              | `client/`   |
| Client build            | `npm run build`                           | `client/`   |
| API build               | `dotnet build Api`                        | repo root   |
| API formatting          | `dotnet format Api --verify-no-changes`   | repo root   |

## Workflow

- One branch per change (`feat/...`, `fix/...`, `chore/...`, `docs/...`)
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
- Pull request → green CI → **squash and merge** into `main`
