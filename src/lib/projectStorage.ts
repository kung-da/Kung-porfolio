import { Project } from "@/types/project";
import { supabase, isSupabaseConfigured } from "./supabase";

const STORAGE_KEY = "portfolio_projects";
const PASSWORD_KEY = "portfolio_admin_password";

// Default projects for fallback
const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Real-Time Data Pipeline",
    description: "Built a scalable ETL pipeline using Apache Spark and Kafka to process streaming data from multiple sources, resulting in 40% faster data processing.",
    tags: ["Python", "Apache Spark", "Kafka", "PostgreSQL"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    gradient: "from-blue-500 to-purple-600",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Student Performance Analytics",
    description: "Developed a comprehensive dashboard to analyze student performance patterns and predict academic outcomes using machine learning algorithms.",
    tags: ["Python", "React", "Machine Learning", "MongoDB"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    gradient: "from-green-500 to-blue-500",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "IoT Sensor Data Platform",
    description: "Created an IoT platform for collecting and analyzing sensor data from smart devices, featuring real-time monitoring and alerting systems.",
    tags: ["IoT", "Python", "InfluxDB", "Grafana"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    gradient: "from-purple-500 to-pink-500",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Math Tutoring App",
    description: "Designed and built a progressive web app to help students practice mathematics with personalized exercises and progress tracking.",
    tags: ["React", "TypeScript", "Node.js", "AI"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    gradient: "from-orange-500 to-red-500",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "E-commerce Analytics Suite",
    description: "Developed a comprehensive analytics platform for e-commerce businesses to track KPIs, customer behavior, and sales performance.",
    tags: ["Python", "React", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    gradient: "from-cyan-500 to-blue-500",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Automated Trading Bot",
    description: "Built an intelligent trading bot using reinforcement learning algorithms to analyze market trends and execute trades automatically.",
    tags: ["Python", "AI", "TensorFlow", "API"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    gradient: "from-indigo-500 to-purple-500",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper to convert Supabase data to Project
const fromSupabase = (data: any): Project => ({
  id: data.id,
  title: data.title,
  description: data.description,
  tags: data.tags,
  githubUrl: data.github_url || "",
  demoUrl: data.demo_url || "",
  gradient: data.gradient,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

// Helper to convert Project to Supabase format
const toSupabase = (project: Partial<Project>) => ({
  title: project.title,
  description: project.description,
  tags: project.tags,
  github_url: project.githubUrl,
  demo_url: project.demoUrl,
  gradient: project.gradient,
});

export const projectStorage = {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    // Try Supabase first
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          return data.map(fromSupabase);
        }
      } catch (error) {
        console.error("Error loading from Supabase:", error);
      }
    }

    // Fallback to localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        this.setProjectsLocal(DEFAULT_PROJECTS);
        return DEFAULT_PROJECTS;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error loading projects:", error);
      return DEFAULT_PROJECTS;
    }
  },

  // Set projects to localStorage (fallback)
  setProjectsLocal(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error("Error saving projects:", error);
    }
  },

  // Add a new project
  async addProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
    // Try Supabase first
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("projects")
          .insert([toSupabase(project)])
          .select()
          .single();

        if (error) throw error;
        if (data) return fromSupabase(data);
      } catch (error) {
        console.error("Error adding to Supabase:", error);
      }
    }

    // Fallback to localStorage
    const projects = await this.getProjects();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.unshift(newProject);
    this.setProjectsLocal(projects);
    return newProject;
  },

  // Update a project
  async updateProject(
    id: string,
    updates: Partial<Omit<Project, "id" | "createdAt">>
  ): Promise<Project | null> {
    // Try Supabase first
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("projects")
          .update({
            ...toSupabase(updates),
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        if (data) return fromSupabase(data);
      } catch (error) {
        console.error("Error updating in Supabase:", error);
      }
    }

    // Fallback to localStorage
    const projects = await this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedProject = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    projects[index] = updatedProject;
    this.setProjectsLocal(projects);
    return updatedProject;
  },

  // Delete a project
  async deleteProject(id: string): Promise<boolean> {
    // Try Supabase first
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from("projects").delete().eq("id", id);

        if (error) throw error;
        return true;
      } catch (error) {
        console.error("Error deleting from Supabase:", error);
      }
    }

    // Fallback to localStorage
    const projects = await this.getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length === projects.length) return false;
    this.setProjectsLocal(filtered);
    return true;
  },

  // Password management
  async verifyPassword(password: string): Promise<boolean> {
    // Try Supabase first
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("admin_config")
          .select("password_hash")
          .limit(1)
          .single();

        if (error) throw error;
        if (data) {
          return btoa(password) === data.password_hash;
        }
      } catch (error) {
        console.error("Error verifying password from Supabase:", error);
      }
    }

    // Fallback to localStorage
    try {
      const stored = localStorage.getItem(PASSWORD_KEY);
      if (!stored) {
        localStorage.setItem(PASSWORD_KEY, btoa("admin123"));
        return password === "admin123";
      }
      return btoa(password) === stored;
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  },

  // Check if using Supabase or localStorage
  isUsingSupabase(): boolean {
    return isSupabaseConfigured();
  },
};
