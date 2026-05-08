import { Client } from "@notionhq/client";

export default async function handler(req: any, res: any) {
  try {
    const apiKey = process.env.NOTION_API_KEY || process.env.VITE_NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID || process.env.VITE_NOTION_DATABASE_ID;

    if (!apiKey || !databaseId) {
      return res.status(500).json({ error: "Notion env vars not configured" });
    }

    const notion = new Client({ auth: apiKey });
    const queryPayload = {
      filter: { property: "Published", checkbox: { equals: true } },
    } as const;

    let response;
    if (typeof (notion as any).databases?.query === "function") {
      response = await (notion as any).databases.query({
        database_id: databaseId,
        ...queryPayload,
      });
    } else if (typeof (notion as any).dataSources?.query === "function") {
      response = await (notion as any).dataSources.query({
        data_source_id: databaseId,
        ...queryPayload,
      });
    } else {
      throw new Error("Notion client does not support database queries");
    }

    const projects = response.results.map((page: any) => {
      const p = page.properties;
      return {
        id: page.id,
        name: p.Name?.title?.[0]?.plain_text ?? "Untitled",
        description: p.Description?.rich_text?.[0]?.plain_text ?? "",
        category: p.Category?.select?.name ?? "Other",
        techStack: p.TechStack?.multi_select?.map((t: any) => t.name) ?? [],
        coverImage: p.CoverImage?.url ?? null,
        githubLink: p.GithubLink?.url ?? null,
        demoLink: p.DemoLink?.url ?? null,
        featured: p.Featured?.checkbox ?? false,
      };
    });

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.status(200).json({ projects });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
