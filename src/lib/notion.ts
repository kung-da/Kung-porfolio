import { Client } from "@notionhq/client";

// Notion client (used server-side in /api/notion-projects)
export const notion = new Client({
  auth: process.env.NOTION_API_KEY || import.meta.env?.VITE_NOTION_API_KEY,
});

export const NOTION_DATABASE_ID =
  process.env.NOTION_DATABASE_ID || import.meta.env?.VITE_NOTION_DATABASE_ID || "";
