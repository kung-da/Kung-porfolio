import { useEffect, useState } from "react";
import type { Project } from "@/types/project";

const FALLBACK: Project[] = [
  {
    id: "1",
    name: "Realtime Sales Pipeline",
    description: "Kafka → Spark Streaming → BigQuery pipeline processing 5M events/day with sub-minute latency.",
    category: "Pipeline",
    techStack: ["Kafka", "Spark", "GCP", "Python"],
    coverImage: "https://picsum.photos/seed/pipeline/600/400",
    githubLink: "https://github.com",
    demoLink: "",
    featured: true,
  },
  {
    id: "2",
    name: "Travel Analytics Dashboard",
    description: "Interactive dashboard tracking flight prices and travel trends across Asia.",
    category: "Dashboard",
    techStack: ["PowerBI", "SQL", "dbt"],
    coverImage: "https://picsum.photos/seed/dash/600/400",
    githubLink: "https://github.com",
    demoLink: "https://demo.com",
    featured: true,
  },
  {
    id: "3",
    name: "Anime Recommendation Engine",
    description: "Collaborative filtering model trained on MyAnimeList dataset with 300k users.",
    category: "Analytics",
    techStack: ["Python", "Pandas", "scikit-learn"],
    coverImage: "https://picsum.photos/seed/anime/600/400",
    githubLink: "https://github.com",
    demoLink: "",
    featured: false,
  },
  {
    id: "4",
    name: "Airflow DAG Library",
    description: "Reusable Airflow operators for common ETL patterns used across 20+ pipelines.",
    category: "Pipeline",
    techStack: ["Airflow", "Python", "Docker"],
    coverImage: "https://picsum.photos/seed/airflow/600/400",
    githubLink: "https://github.com",
    demoLink: "",
    featured: false,
  },
  {
    id: "5",
    name: "Customer Churn Insights",
    description: "End-to-end churn prediction with feature store, model serving, and Metabase reports.",
    category: "Analytics",
    techStack: ["Python", "dbt", "Metabase"],
    coverImage: "https://picsum.photos/seed/churn/600/400",
    githubLink: "https://github.com",
    demoLink: "",
    featured: false,
  },
  {
    id: "6",
    name: "IoT Weather Logger",
    description: "ESP32 sensors streaming weather data into a time-series database with live charts.",
    category: "Other",
    techStack: ["IoT", "InfluxDB", "Grafana"],
    coverImage: "https://picsum.photos/seed/iot/600/400",
    githubLink: "https://github.com",
    demoLink: "",
    featured: false,
  },
];

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
        if (!cancel) setProjects(data.projects?.length ? data.projects : FALLBACK);
      } catch {
        if (!cancel) {
          setProjects(FALLBACK);
          setError("Using demo data — connect Notion to load real projects.");
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  return { projects, loading, error };
}
