# CLAUDE.md — Elephant Campaign Platform

## Project Overview

Full-stack monorepo for **"The Chain Free Project"** — a volunteer-driven campaign to stop elephant riding. The app collects volunteer sign-ups via a Next.js frontend and persists them through a Laravel REST API backed by MySQL.

---

## Repository Structure

```
elephant-campaign/                  # Monorepo root
├── elephant-campaign-frontend/     # Next.js 16 · React 19 · TypeScript · Tailwind CSS 4
├── elephant-campaign-backend/      # Laravel 13 · PHP 8.3 · MySQL
└── README.md
```

---

## Tech Stack

| Layer    | Technology                                         |
| -------- | -------------------------------------------------- |
| Frontend | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 |
| Icons    | lucide-react                                       |
| Backend  | Laravel 13 (PHP 8.3)                               |
| Database | MySQL (via XAMPP)                                   |
| Fonts    | Geist, Geist Mono (via `next/font/google`)         |

---

## Development Setup

### Prerequisites

- **Node.js** (for the frontend)
- **PHP 8.3+** & **Composer** (for the backend)
- **XAMPP** (Apache + MySQL)

### Database

1. Start Apache and MySQL from XAMPP Control Panel.
2. Open phpMyAdmin (`http://localhost/phpmyadmin`).
3. Create database: `elephant_campaign_db`.

### Backend

```bash
cd elephant-campaign-backend
composer install
cp .env.example .env        # Then set DB_CONNECTION=mysql, DB_DATABASE=elephant_campaign_db
php artisan key:generate
php artisan migrate
php artisan serve            # → http://127.0.0.1:8000
```

### Frontend

```bash
cd elephant-campaign-frontend
npm install
npm run dev                  # → http://localhost:3000
```

---

## Common Commands

### Frontend (`elephant-campaign-frontend/`)

| Command          | Description              |
| ---------------- | ------------------------ |
| `npm run dev`    | Start Next.js dev server |
| `npm run build`  | Production build         |
| `npm run start`  | Serve production build   |
| `npm run lint`   | Run ESLint               |

### Backend (`elephant-campaign-backend/`)

| Command                    | Description                  |
| -------------------------- | ---------------------------- |
| `php artisan serve`        | Start Laravel dev server     |
| `php artisan migrate`      | Run database migrations      |
| `php artisan test`         | Run PHPUnit tests            |
| `composer run dev`         | Concurrent dev (serve + vite + queue + pail) |

---

## Architecture

### Frontend

- **Single-page app**: All UI lives in `app/page.tsx` (client component with `'use client'`).
- **Sections**: Header/Nav → Hero → Mission Cards (3) → Media Gallery (6 images) → Volunteer Form → Footer → Floating WhatsApp widget.
- **Form submission**: `fetch()` POST to `http://127.0.0.1:8000/api/volunteer` with JSON body `{ name, email, message }`.
- **Layout**: `app/layout.tsx` sets up Geist fonts and Tailwind.
- **Styling**: Tailwind CSS 4 via PostCSS plugin (`@tailwindcss/postcss`). Global CSS vars defined in `app/globals.css`.
- **Assets**: `public/elephant-1.jpg` through `public/elephant-6.jpg` for the gallery.

### Backend

- **API routes**: Defined in `routes/api.php` using route closures (no controllers).
- **Key endpoint**: `POST /api/volunteer` — inserts directly into `volunteers` table via `DB::table()`.
- **No Eloquent model** for volunteers — uses raw query builder.
- **No request validation** on the volunteer endpoint.
- **No dedicated CORS config** — relies on Laravel 13 built-in handling.
- **Database migrations** (in `database/migrations/`):
  - `create_users_table` (default Laravel)
  - `create_cache_table`
  - `create_jobs_table`
  - `create_volunteers_table` — columns: `id`, `name`, `email`, `message`, `timestamps`

### Testing

- **PHPUnit** with SQLite `:memory:` for test database.
- Test suites: `tests/Unit/` and `tests/Feature/`.
- Run: `php artisan test` from the backend directory.

---

## Key Files

### Frontend

| File                | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `app/page.tsx`      | Main campaign page (all sections + form logic) |
| `app/layout.tsx`    | Root layout with fonts and global CSS          |
| `app/globals.css`   | Tailwind import + CSS custom properties        |
| `next.config.ts`    | Next.js configuration (currently empty)        |
| `tsconfig.json`     | TypeScript config (`@/*` path alias → `./*`)   |
| `eslint.config.mjs` | ESLint with Next.js core-web-vitals + TS rules |

### Backend

| File                                                   | Purpose                          |
| ------------------------------------------------------ | -------------------------------- |
| `routes/api.php`                                       | API route definitions            |
| `routes/web.php`                                       | Web routes (serves welcome view) |
| `database/migrations/2026_06_16_*_create_volunteers_table.php` | Volunteers table schema  |
| `app/Models/User.php`                                  | User Eloquent model              |
| `bootstrap/app.php`                                    | App bootstrap + routing config   |
| `.env`                                                 | Environment config (MySQL)       |
| `phpunit.xml`                                          | Test configuration               |

---

## Code Conventions

- **Frontend**: TypeScript strict mode, ESM modules, React functional components.
- **Backend**: PSR-4 autoloading, Laravel conventions. Editor config enforces 4-space indent, LF line endings, UTF-8.
- **Styling**: Tailwind CSS utility classes (emerald/stone color palette). No custom component library.
- **State management**: React `useState` only (no external state library).

---

## Environment Variables

### Backend (`.env`)

| Variable        | Default (`.env.example`) | Actual (`.env`)          |
| --------------- | ------------------------ | ------------------------ |
| `DB_CONNECTION` | `sqlite`                 | `mysql`                  |
| `DB_HOST`       | `127.0.0.1`              | `127.0.0.1`              |
| `DB_PORT`       | `3306`                   | `3306`                   |
| `DB_DATABASE`   | `laravel`                | `elephant_campaign_db`   |
| `DB_USERNAME`   | `root`                   | `root`                   |
| `DB_PASSWORD`   | (empty)                  | (empty)                  |

### Frontend

No `.env` files — API URL is **hardcoded** in `app/page.tsx` as `http://127.0.0.1:8000/api/volunteer`.

---

## Known Issues & Improvement Areas

1. **No input validation** on `POST /api/volunteer` — should add Laravel Form Request or inline validation.
2. **No Volunteer Eloquent model** — route uses raw `DB::table()` instead of a model.
3. **No dedicated controllers** — all API logic lives in route closures.
4. **Hardcoded API URL** — frontend should use an environment variable (`NEXT_PUBLIC_API_URL`).
5. **No CORS configuration** — cross-origin requests from `localhost:3000` to `127.0.0.1:8000` depend on Laravel 13 defaults.
6. **Client-only rendering** — `page.tsx` is entirely a client component; could benefit from SSR/SSG for SEO.
7. **Default metadata** — `layout.tsx` still has "Create Next App" as the title/description.

---

## Important Notes for AI Assistants

- **Read `node_modules/next/dist/docs/`** before modifying Next.js code — this is Next.js 16 with potentially breaking changes from earlier versions (see `AGENTS.md`).
- **Tailwind CSS 4** uses `@import "tailwindcss"` syntax (not `@tailwind` directives) and `@theme inline` blocks.
- **Laravel 13** may differ from training data — check the installed version's conventions.
- **Dev servers run on separate ports**: Frontend `:3000`, Backend `:8000`.
- **WhatsApp integration** links to number `9779865345753`.
