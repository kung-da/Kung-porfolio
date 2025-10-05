import { Project } from "@/types/project";

const STORAGE_KEY = "portfolio_projects";
const PASSWORD_KEY = "portfolio_admin_password";

// Default projects
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

export const projectStorage = {
  // Get all projects
  getProjects(): Project[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Initialize with default projects
        this.setProjects(DEFAULT_PROJECTS);
        return DEFAULT_PROJECTS;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error loading projects:", error);
      return DEFAULT_PROJECTS;
    }
  },

  // Set all projects
  setProjects(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error("Error saving projects:", error);
    }
  },

  // Add a new project
  addProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.unshift(newProject);
    this.setProjects(projects);
    return newProject;
  },

  // Update a project
  updateProject(id: string, updates: Partial<Omit<Project, "id" | "createdAt">>): Project | null {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedProject = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    projects[index] = updatedProject;
    this.setProjects(projects);
    return updatedProject;
  },

  // Delete a project
  deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length === projects.length) return false;
    this.setProjects(filtered);
    return true;
  },

  // Password management
  setPassword(password: string): void {
    try {
      localStorage.setItem(PASSWORD_KEY, btoa(password)); // Simple encoding
    } catch (error) {
      console.error("Error saving password:", error);
    }
  },

  verifyPassword(password: string): boolean {
    try {
      const stored = localStorage.getItem(PASSWORD_KEY);
      if (!stored) {
        // No password set, set default
        this.setPassword("admin123");
        return password === "admin123";
      }
      return btoa(password) === stored;
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  },

  hasPassword(): boolean {
    return !!localStorage.getItem(PASSWORD_KEY);
  },
};
