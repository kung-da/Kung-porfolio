import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const NOTION_VERSION = "2022-06-28";

type NotionRichText = Array<{
  plain_text?: string;
  annotations?: Record<string, boolean>;
  href?: string | null;
}>;

type NotionProperty = {
  title?: NotionRichText;
  rich_text?: NotionRichText;
  select?: { name?: string } | null;
  multi_select?: Array<{ name: string }>;
  url?: string | null;
  checkbox?: boolean;
};

type NotionProjectRaw = {
  id: string;
  properties: Record<string, NotionProperty | undefined>;
};

function plain(richText: Array<{ plain_text?: string }> | undefined): string {
  return richText?.map((item) => item.plain_text ?? "").join("") ?? "";
}

function html(richText: Array<{ plain_text?: string; annotations?: Record<string, boolean>; href?: string | null }> | undefined): string {
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

function mapProject(raw: NotionProjectRaw, detail = false) {
  const props = raw.properties;
  const name = plain(props.Name?.title);
  const base = {
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

  if (!detail) return base;

  return {
    ...base,
    longDescription: html(props.LongDescription?.rich_text),
    highlights: html(props.Highlights?.rich_text),
    timeline: plain(props.Timeline?.rich_text) || null,
    status: props.Status?.select?.name ?? "Completed",
    tags: props.Tags?.multi_select?.map((item: { name: string }) => item.name) ?? [],
    youtubeEmbed: props.YoutubeEmbed?.url ?? null,
  };
}

function notionProjectsDevApi(env: Record<string, string>): Plugin {
  return {
    name: "notion-projects-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/notion-projects", async (req, res) => {
        const apiKey = env.NOTION_API_KEY;
        const databaseId = env.NOTION_DATABASE_ID;

        if (!apiKey || !databaseId) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Missing NOTION_API_KEY or NOTION_DATABASE_ID" }));
          return;
        }

        try {
          const url = new URL(req.url ?? "", "http://localhost");
          const slug = url.searchParams.get("slug");

          const notionRes = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Notion-Version": NOTION_VERSION,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filter: { property: "Published", checkbox: { equals: true } },
              sorts: [
                { property: "Featured", direction: "descending" },
                { timestamp: "created_time", direction: "descending" },
              ],
            }),
          });

          if (!notionRes.ok) {
            throw new Error(`Notion API error ${notionRes.status}: ${await notionRes.text()}`);
          }

          const data = (await notionRes.json()) as { results: NotionProjectRaw[] };
          res.setHeader("Content-Type", "application/json");

          if (slug) {
            const exact = data.results.find((item) => plain(item.properties.Slug?.rich_text) === slug);
            const fallback = data.results.find((item) => slugify(plain(item.properties.Name?.title)) === slug);
            res.end(JSON.stringify({ project: exact || fallback ? mapProject(exact || fallback, true) : null, fromCache: false }));
            return;
          }

          const projects = data.results.map((item) => mapProject(item));
          res.end(JSON.stringify({ projects, total: projects.length, fromCache: false }));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : "Notion request failed" }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: '/',
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && notionProjectsDevApi(env),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-tabs'],
            'animation-vendor': ['framer-motion'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
