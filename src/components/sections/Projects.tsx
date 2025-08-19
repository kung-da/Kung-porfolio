import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: "Real-Time Data Pipeline",
      description: "Built a scalable ETL pipeline using Apache Spark and Kafka to process streaming data from multiple sources, resulting in 40% faster data processing.",
      tags: ["Python", "Apache Spark", "Kafka", "PostgreSQL"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Student Performance Analytics",
      description: "Developed a comprehensive dashboard to analyze student performance patterns and predict academic outcomes using machine learning algorithms.",
      tags: ["Python", "React", "Machine Learning", "MongoDB"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      gradient: "from-green-500 to-blue-500"
    },
    {
      title: "IoT Sensor Data Platform",
      description: "Created an IoT platform for collecting and analyzing sensor data from smart devices, featuring real-time monitoring and alerting systems.",
      tags: ["IoT", "Python", "InfluxDB", "Grafana"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Math Tutoring App",
      description: "Designed and built a progressive web app to help students practice mathematics with personalized exercises and progress tracking.",
      tags: ["React", "TypeScript", "Node.js", "AI"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "E-commerce Analytics Suite",
      description: "Developed a comprehensive analytics platform for e-commerce businesses to track KPIs, customer behavior, and sales performance.",
      tags: ["Python", "React", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "Automated Trading Bot",
      description: "Built an intelligent trading bot using reinforcement learning algorithms to analyze market trends and execute trades automatically.",
      tags: ["Python", "AI", "TensorFlow", "API"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.com",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-secondary">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A showcase of my work in data engineering, web development, and educational technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Project Header with Gradient */}
              <div className={`h-32 bg-gradient-to-r ${project.gradient} p-6 flex items-end`}>
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-primary-soft text-primary px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Github size={16} />
                    <span className="text-sm font-medium">Code</span>
                  </motion.a>
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-primary hover:text-accent-blue transition-colors duration-200"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm font-medium">Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};