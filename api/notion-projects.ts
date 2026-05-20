// api/notion-projects.ts
// ═══════════════════════════════════════════════════════════════════
// Vercel Serverless Function — Notion API proxy
// TASK 4B: Mở rộng thêm endpoint GET ?slug=xxx cho detail page
//
// Endpoints:
//   GET /api/notion-projects          → danh sách tất cả (ProjectCard[])
//   GET /api/notion-projects?slug=xxx → 1 project theo slug (ProjectDetail)
// ═══════════════════════════════════════════════════════════════════

type VercelRequest = {
  method?: string;
  query: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): {
    end(): void;
    json(body: unknown): void;
  };
};

type NotionRichText = Array<{
  plain_text?: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  };
  href?: string | null;
}>;

type ProjectCard = {
  id: string;
  name: string;
  description: string;
  category: string;
  techStack: string[];
  coverImage: string | null;
  githubLink: string | null;
  demoLink: string | null;
  featured: boolean;
  slug: string;
};

type ProjectDetail = ProjectCard & {
  longDescription: string;
  highlights: string;
  timeline: string | null;
  status: string;
  tags: string[];
  youtubeEmbed: string | null;
};

type NotionProjectRaw = {
  id: string;
  properties: Record<string, any>;
};

// ─── Notion API config ───────────────────────────────────────────
const NOTION_API_KEY     = process.env.NOTION_API_KEY ?? process.env.VITE_NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID ?? process.env.VITE_NOTION_DATABASE_ID;
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

function plain(richText?: NotionRichText): string {
  return richText?.map((item) => item.plain_text ?? "").join("") ?? "";
}

function html(richText?: NotionRichText): string {
  return richText
    ?.map((item) => {
      let text = (item.plain_text ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      if (item.annotations?.bold) text = `<strong>${text}</strong>`;
      if (item.annotations?.italic) text = `<em>${text}</em>`;
      if (item.annotations?.code) text = `<code>${text}</code>`;
      if (item.annotations?.strikethrough) text = `<del>${text}</del>`;
      if (item.href) text = `<a href="${item.href}" target="_blank" rel="noopener">${text}</a>`;
      return text;
    })
    .join("")
    .replace(/\n/g, "<br />") ?? "";
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapToProjectCard(raw: NotionProjectRaw): ProjectCard {
  const props = raw.properties;
  const name = plain(props.Name?.title);

  return {
    id: raw.id,
    name,
    description: plain(props.Description?.rich_text),
    category: props.Category?.select?.name ?? "Other",
    techStack: props.TechStack?.multi_select?.map((item: { name: string }) => item.name) ?? [],
    coverImage: props.CoverImage?.url ?? null,
    githubLink: props.GithubLink?.url ?? null,
    demoLink: props.DemoLink?.url ?? null,
    featured: props.Featured?.checkbox ?? false,
    slug: plain(props.Slug?.rich_text) || slugify(name) || raw.id,
  };
}

function mapToProjectDetail(raw: NotionProjectRaw): ProjectDetail {
  const props = raw.properties;

  return {
    ...mapToProjectCard(raw),
    longDescription: html(props.LongDescription?.rich_text),
    highlights: html(props.Highlights?.rich_text),
    timeline: plain(props.Timeline?.rich_text) || null,
    status: props.Status?.select?.name ?? "Completed",
    tags: props.Tags?.multi_select?.map((item: { name: string }) => item.name) ?? [],
    youtubeEmbed: props.YoutubeEmbed?.url ?? null,
  };
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
