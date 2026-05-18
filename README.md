#  Kung · Portfolio

> A dark-themed personal portfolio blending **Data Engineering** aesthetics, anime/Japanese style, and scenic photography — powered by Notion as a headless CMS.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![Notion](https://img.shields.io/badge/Notion-CMS-000000?logo=notion&logoColor=white&style=flat-square)](https://www.notion.so)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white&style=flat-square)](https://vercel.com)

**[→ View Live Demo](https://sparkle-showcase-94.vercel.app)**

---

## Overview

Kung Portfolio is a fully responsive, dark-themed personal site built for data engineers and analytics professionals who want to showcase their work with style. Project cards are managed entirely through a **Notion database** — no code changes needed to add or update projects. If Notion is unreachable or not yet configured, the site gracefully falls back to static demo data so the layout always renders.

---

## Features

-  **Dark theme** with Data Engineering / anime-inspired design language
-  **Notion as a headless CMS** — manage project cards from a Notion database
-  **Serverless API proxy** — Vercel function masks the Notion API key and handles CORS
-  **Framer Motion animations** — smooth page transitions and micro-interactions
-  **Fully responsive** — optimized for mobile, tablet, and desktop
-  **Fallback demo data** — site never breaks, even without a Notion connection
-  **Vite + SWC** — near-instant dev server and fast production builds
-  **shadcn/ui components** — accessible, composable UI primitives via Radix UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 (SWC plugin) |
| Styling | Tailwind CSS 3 + shadcn/ui (Radix UI) |
| Animations | Framer Motion |
| Routing | React Router DOM v6 |
| Data fetching | TanStack Query v5 |
| CMS | Notion API (`@notionhq/client`) |
| API proxy | Vercel Serverless Function |
| Database | Supabase (optional / secondary) |
| Deployment | Vercel |
| Package manager | Bun (npm compatible) |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.0 (or Node.js ≥ 18 with npm)
- A [Notion account](https://www.notion.so) (required for live project data)
- A [Vercel account](https://vercel.com) (for deployment)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/kung-da/Kung-porfolio.git
cd Kung-porfolio

# 2. Install dependencies
bun install        # or: npm install

# 3. Copy the environment variable template
cp .env.example .env

# 4. Fill in your Notion credentials (see setup below)
# Then start the dev server
bun run dev        # or: npm run dev
```

The dev server starts at `http://localhost:5173`. If `.env` is not configured, the site loads with built-in demo projects automatically.

---

## Environment Variables

Create a `.env` file at the project root based on `.env.example`:

```env
VITE_NOTION_API_KEY=secret_xxx
VITE_NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

| Variable | Description | Where to get it |
|---|---|---|
| `VITE_NOTION_API_KEY` | Internal Integration Token from Notion | [notion.so/my-integrations](https://www.notion.so/my-integrations) |
| `VITE_NOTION_DATABASE_ID` | 32-character ID from your Notion database URL | Copy from the database page URL |

> **Note:** On Vercel, these can also be set as `NOTION_API_KEY` and `NOTION_DATABASE_ID` (without the `VITE_` prefix) — the serverless function supports both.

---

## Notion CMS Setup

### Step 1 — Create an Integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations).
2. Click **New integration**, give it a name (e.g. `kung-portfolio`), and submit.
3. Copy the **Internal Integration Token** — this is your `VITE_NOTION_API_KEY`.

### Step 2 — Create the Database

Create a new full-page database in Notion with the following properties:

| Property | Type |
|---|---|
| `Name` | Title |
| `Description` | Rich text |
| `Category` | Select: `Pipeline` / `Dashboard` / `Analytics` / `Other` |
| `TechStack` | Multi-select |
| `CoverImage` | URL |
| `GithubLink` | URL |
| `DemoLink` | URL |
| `Featured` | Checkbox |
| `Published` | Checkbox |

### Step 3 — Connect the Integration

Open the database page → click `···` (top-right) → **Connections** → search for and add your integration.

### Step 4 — Copy the Database ID

From the database URL, extract the 32-character hash:

```
https://www.notion.so/your-workspace/THIS-IS-THE-DATABASE-ID?v=...
```

Set this as `VITE_NOTION_DATABASE_ID` in your `.env`.

### Step 5 — Add Projects

Add rows to the database. Only rows with **Published = ✓** will appear on the site. Rows with **Featured = ✓** are highlighted in the featured section.

---

## Project Structure

```
Kung-porfolio/
├── api/
│   └── notion-projects.ts    # Vercel serverless function — proxies Notion API
├── public/                   # Static assets (favicon, images, fonts)
├── src/
│   ├── components/           # Reusable UI components
│   ├── pages/                # Route-level page components
│   ├── hooks/                # Custom React hooks (data fetching, etc.)
│   ├── lib/                  # Utilities and config
│   └── main.tsx              # App entry point
├── supabase/                 # Supabase migrations and config (optional)
├── .env.example              # Environment variable template
├── components.json           # shadcn/ui component registry config
├── tailwind.config.ts        # Tailwind theme configuration
├── vercel.json               # Vercel routing and function config
└── vite.config.ts            # Vite build configuration
```

---

## Deployment on Vercel

### Why the serverless proxy?

The Notion API does not allow direct browser requests due to CORS restrictions and to protect your API key. The `/api/notion-projects.ts` serverless function runs server-side on Vercel, fetches data from Notion securely, and returns it to the frontend at `/api/notion-projects`.

### Steps

1. Push the repo to GitHub.
2. Import the project in [vercel.com/new](https://vercel.com/new).
3. In **Project Settings → Environment Variables**, add:
   - `NOTION_API_KEY` — your integration token
   - `NOTION_DATABASE_ID` — your database ID
4. Deploy. Vercel automatically detects the `/api` folder and deploys the function alongside the static frontend.

> The frontend and function both read these variables, so you only need to set them once on Vercel.

---

## Contributing

Issues and pull requests are welcome! If you find a bug, have a feature idea, or want to improve the docs, feel free to open an issue first to discuss what you'd like to change. Please keep PRs focused and include a short description of what was changed and why.

---

## License

[MIT](./LICENSE) — feel free to use this as a template for your own portfolio.