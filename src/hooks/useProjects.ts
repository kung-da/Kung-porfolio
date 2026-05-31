import { useEffect, useState } from "react";
import type { ProjectCard } from "@/types/project";

const PROJECTS_ENDPOINT = "/api/notion-projects";

export function useProjects() {
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(PROJECTS_ENDPOINT, { signal: controller.signal });
        if (!res.ok) throw new Error("not ok");
        const data = await res.json();
        setProjects(data.projects ?? []);
        setError(null);
      } catch (error) {
        if (controller.signal.aborted) return;

        setProjects([]);
        setError("Notion connection failed. Check /api/notion-projects.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return { projects, loading, error };
}
