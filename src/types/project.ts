// src/types/project.ts
// ═══════════════════════════════════════════════════════════════════
// Project types — mirrors Notion database schema exactly.
// Notion field names are the source of truth (KHÔNG đổi tên).
// ═══════════════════════════════════════════════════════════════════

// ─── Notion API raw types ────────────────────────────────────────
export type NotionRichText = Array<{
  type: "text";
  text: { content: string; link: null | { url: string } };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: null | string;
}>;

// ─── Category & Status enums ────────────────────────────────────
export type ProjectCategory = "Pipeline" | "Dashboard" | "Analytics" | "Other";
export type ProjectStatus   = "Completed" | "In Progress" | "Archived";

// ─── Base project (fields dùng ở CARD LIST) ─────────────────────
export interface ProjectCard {
  id:          string;           // Notion page ID
  name:        string;           // Name (Title)
  description: string;           // Description — plain text
  category:    ProjectCategory;  // Category (Select)
  techStack:   string[];         // TechStack (Multi-select)
  coverImage:  string | null;    // CoverImage (URL)
  githubLink:  string | null;    // GithubLink (URL)
  demoLink:    string | null;    // DemoLink (URL)
  featured:    boolean;          // Featured (Checkbox)
  slug:        string;           // Slug (Text) — URL identifier
}

// ─── Full project (extends card, adds DETAIL PAGE fields) ────────
export interface ProjectDetail extends ProjectCard {
  longDescription: string;        // LongDescription (Rich text) — HTML
  highlights:      string;        // Highlights (Rich text) — HTML
  timeline:        string | null; // Timeline (Rich text) — plain text
  status:          ProjectStatus; // Status (Select)
  tags:            string[];      // Tags (Multi-select)
  youtubeEmbed:    string | null; // YoutubeEmbed (URL)
}

// ─── Full Notion raw record (returned by API before mapping) ─────
export interface NotionProjectRaw {
  id: string;
  properties: {
    Name:            { title: NotionRichText };
    Description:     { rich_text: NotionRichText };
    Category:        { select: { name: ProjectCategory } | null };
    TechStack:       { multi_select: Array<{ name: string }> };
    CoverImage:      { url: string | null };
    GithubLink:      { url: string | null };
    DemoLink:        { url: string | null };
    Featured:        { checkbox: boolean };
    Published:       { checkbox: boolean };
    // Detail page fields (thêm vào Notion — xem Block 3 trong master prompt)
    Slug:            { rich_text: NotionRichText };
    LongDescription: { rich_text: NotionRichText };
    Highlights:      { rich_text: NotionRichText };
    Timeline:        { rich_text: NotionRichText };
    Status:          { select: { name: ProjectStatus } | null };
    Tags:            { multi_select: Array<{ name: string }> };
    YoutubeEmbed:    { url: string | null };
  };
}

// ─── API response wrappers ───────────────────────────────────────
export interface ProjectsResponse {
  projects:  ProjectCard[];
  total:     number;
  fromCache: boolean; // true nếu dùng fallback/demo data
}

export interface ProjectDetailResponse {
  project:   ProjectDetail | null;
  fromCache: boolean;
}

// ─── Helper: Notion rich text → plain string ─────────────────────
export function richTextToPlain(richText: NotionRichText): string {
  return richText.map((block) => block.plain_text).join("");
}

// ─── Helper: Notion rich text → basic HTML ───────────────────────
// Chuyển bold/italic/code sang HTML tags để render trong detail page.
export function richTextToHTML(richText: NotionRichText): string {
  return richText
    .map((block) => {
      let text = block.plain_text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      if (block.annotations.bold)          text = `<strong>${text}</strong>`;
      if (block.annotations.italic)        text = `<em>${text}</em>`;
      if (block.annotations.code)          text = `<code>${text}</code>`;
      if (block.annotations.strikethrough) text = `<del>${text}</del>`;
      if (block.href)                      text = `<a href="${block.href}" target="_blank" rel="noopener">${text}</a>`;
      return text;
    })
    .join("")
    .replace(/\n/g, "<br />");
}

// ─── Mapper: NotionProjectRaw → ProjectCard ──────────────────────
export function mapToProjectCard(raw: NotionProjectRaw): ProjectCard {
  const props = raw.properties;
  return {
    id:          raw.id,
    name:        richTextToPlain(props.Name.title),
    description: richTextToPlain(props.Description.rich_text),
    category:    props.Category.select?.name ?? "Other",
    techStack:   props.TechStack.multi_select.map((t) => t.name),
    coverImage:  props.CoverImage.url,
    githubLink:  props.GithubLink.url,
    demoLink:    props.DemoLink.url,
    featured:    props.Featured.checkbox,
    slug:        richTextToPlain(props.Slug.rich_text),
  };
}

// ─── Mapper: NotionProjectRaw → ProjectDetail ────────────────────
export function mapToProjectDetail(raw: NotionProjectRaw): ProjectDetail {
  const props = raw.properties;
  return {
    ...mapToProjectCard(raw),
    longDescription: richTextToHTML(props.LongDescription.rich_text),
    highlights:      richTextToHTML(props.Highlights.rich_text),
    timeline:        richTextToPlain(props.Timeline.rich_text) || null,
    status:          props.Status.select?.name ?? "Completed",
    tags:            props.Tags.multi_select.map((t) => t.name),
    youtubeEmbed:    props.YoutubeEmbed.url,
  };
}
