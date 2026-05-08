import { useEffect, useState } from "react";
import type { Project } from "@/types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch("/api/notion-projects");
        if (!res.ok) throw new Error("not ok");
        const data = await res.json();
        if (!cancel) setProjects(data.projects ?? []);
      } catch {
        if (!cancel) {
          setProjects([]);
          setError("Notion connection failed. Check /api/notion-projects.");
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  return { projects, loading, error };
}
