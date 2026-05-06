export interface Project {
  id: string;
  name: string;
  description: string;
  category: "Pipeline" | "Dashboard" | "Analytics" | "Other";
  techStack: string[];
  coverImage?: string;
  githubLink?: string;
  demoLink?: string;
  featured: boolean;
}
