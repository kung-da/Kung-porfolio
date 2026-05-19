// api/notion-projects.ts
// ═══════════════════════════════════════════════════════════════════
// Vercel Serverless Function — Notion API proxy
// TASK 4B: Mở rộng thêm endpoint GET ?slug=xxx cho detail page
//
// Endpoints:
//   GET /api/notion-projects          → danh sách tất cả (ProjectCard[])
//   GET /api/notion-projects?slug=xxx → 1 project theo slug (ProjectDetail)
// ═══════════════════════════════════════════════════════════════════

import type { VercelRequest, VercelResponse } from "@vercel/node";
import type {
  NotionProjectRaw,
  ProjectCard,
  ProjectDetail,
} from "../src/types/project";
import {
  mapToProjectCard,
  mapToProjectDetail,
} from "../src/types/project";

// ─── Notion API config ───────────────────────────────────────────
const NOTION_API_KEY     = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_VERSION     = "2022-06-28";
const NOTION_BASE        = "https://api.notion.com/v1";

// ─── Notion fetch helper ──────────────────────────────────────────
async function notionFetch(path: string, body?: object): Promise<Response> {
  return fetch(`${NOTION_BASE}${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization:    `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type":   "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

// ─── Query published projects from Notion ────────────────────────
async function queryPublishedProjects(): Promise<NotionProjectRaw[]> {
  const res = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [
      { property: "Featured", direction: "descending" },
      { timestamp: "created_time", direction: "descending" },
    ],
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.results as NotionProjectRaw[];
}

// ─── Demo fallback data ───────────────────────────────────────────
// Hiển thị khi Notion không kết nối được
const DEMO_PROJECTS: ProjectCard[] = [
  {
    id:          "demo-1",
    name:        "ETL Pipeline · Apache Airflow",
    description: "Automated data pipeline ingesting 10M+ rows/day from multiple sources into BigQuery. Includes data quality checks and alerting.",
    category:    "Pipeline",
    techStack:   ["Python", "Airflow", "BigQuery", "dbt", "Docker"],
    coverImage:  null,
    githubLink:  null,
    demoLink:    null,
    featured:    true,
    slug:        "etl-pipeline-airflow",
  },
  {
    id:          "demo-2",
    name:        "Analytics Dashboard · Real-time",
    description: "Executive dashboard tracking KPIs across 5 business units. Built with Metabase + custom Python backend.",
    category:    "Dashboard",
    techStack:   ["Metabase", "Python", "PostgreSQL", "FastAPI"],
    coverImage:  null,
    githubLink:  null,
    demoLink:    null,
    featured:    false,
    slug:        "analytics-dashboard",
  },
  {
    id:          "demo-3",
    name:        "ML Feature Store",
    description: "Centralized feature engineering platform serving 12 ML models in production with sub-50ms latency.",
    category:    "Analytics",
    techStack:   ["Python", "Redis", "Kafka", "Feast"],
    coverImage:  null,
    githubLink:  null,
    demoLink:    null,
    featured:    false,
    slug:        "ml-feature-store",
  },
];

const DEMO_DETAIL: ProjectDetail = {
  ...DEMO_PROJECTS[0],
  longDescription: "<p>A fully automated ETL pipeline built on Apache Airflow, processing over 10 million rows daily from PostgreSQL, REST APIs, and S3 sources into Google BigQuery.</p><br/><p>Key challenges included handling schema drift, implementing idempotent loads, and building robust retry logic with exponential backoff.</p>",
  highlights:      "<ul><li><strong>10M+ rows/day</strong> processed reliably</li><li><strong>99.7% uptime</strong> over 6 months</li><li><strong>Sub-5 minute</strong> end-to-end latency</li><li>Automated <strong>data quality checks</strong> at every stage</li></ul>",
  timeline:        "3 months · Q1 2025",
  status:          "Completed",
  tags:            ["Data Engineering", "ETL", "Cloud", "Automation"],
  youtubeEmbed:    null,
};

// ─── Main handler ─────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const slug = req.query.slug as string | undefined;

  // ── Notion not configured: return fallback ──────────────────────
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.warn("[notion-projects] API key or DB ID missing — using demo data");

    if (slug) {
      const demo = slug === DEMO_PROJECTS[0].slug
        ? DEMO_DETAIL
        : null;
      return res.status(200).json({ project: demo, fromCache: true });
    }

    return res.status(200).json({
      projects:  DEMO_PROJECTS,
      total:     DEMO_PROJECTS.length,
      fromCache: true,
    });
  }

  try {
    const raws = await queryPublishedProjects();

    // ── Single project by slug ─────────────────────────────────────
    if (slug) {
      const raw = raws.find((item) => mapToProjectCard(item).slug === slug);

      if (!raw) {
        return res.status(200).json({ project: null, fromCache: false });
      }

      const detail: ProjectDetail = mapToProjectDetail(raw);
      return res.status(200).json({ project: detail, fromCache: false });
    }

    // ── All projects list ─────────────────────────────────────────
    const projects: ProjectCard[] = raws.map(mapToProjectCard);
    return res.status(200).json({
      projects,
      total:     projects.length,
      fromCache: false,
    });

  } catch (err) {
    console.error("[notion-projects] Notion fetch failed:", err);

    // Fallback to demo data on error
    if (slug) {
      const demo = slug === DEMO_PROJECTS[0].slug ? DEMO_DETAIL : null;
      return res.status(200).json({ project: demo, fromCache: true });
    }

    return res.status(200).json({
      projects:  DEMO_PROJECTS,
      total:     DEMO_PROJECTS.length,
      fromCache: true,
    });
  }
}
