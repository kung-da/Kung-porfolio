# Data Wanderer · Portfolio

A dark-themed portfolio blending Data Engineering aesthetics, anime/Japanese style, and scenic photography. Built with React + Vite + Tailwind, with project content managed in **Notion**.

## Quick start

```bash
bun install
bun run dev
```

## Notion CMS setup

1. Create a Notion integration: https://www.notion.so/my-integrations — copy the **Internal Integration Token**.
2. Create a Notion database with the following properties:
   - `Name` (Title)
   - `Description` (Rich text)
   - `Category` (Select: Pipeline / Dashboard / Analytics / Other)
   - `TechStack` (Multi-select)
   - `CoverImage` (URL)
   - `GithubLink` (URL)
   - `DemoLink` (URL)
   - `Featured` (Checkbox)
   - `Published` (Checkbox)
3. Share the database with your integration (top-right `···` → Connections).
4. Copy the database ID from its URL (the 32-char hash).
5. Create `.env` (see `.env.example`):

```
VITE_NOTION_API_KEY=secret_xxx
VITE_NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Deployment (Vercel)

The `/api/notion-projects.ts` serverless function proxies the Notion API to avoid CORS. On Vercel, set the same env vars in **Project Settings → Environment Variables** (you can also rename them to `NOTION_API_KEY` / `NOTION_DATABASE_ID` — both are supported). The frontend fetches `/api/notion-projects`.

If Notion is unreachable or unconfigured, the site falls back to demo project data so the layout always renders.
