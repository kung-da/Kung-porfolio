export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  gradient: string;
  createdAt: string;
  updatedAt: string;
}

export const GRADIENTS = [
  "from-blue-500 to-purple-600",
  "from-green-500 to-blue-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-blue-500",
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-teal-500 to-green-500",
  "from-yellow-500 to-orange-500",
  "from-red-500 to-pink-500",
];
