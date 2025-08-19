import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Database, Calculator, Users } from "lucide-react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = [
    {
      category: "Programming",
      icon: <Code size={24} />,
      items: ["Python", "JavaScript", "TypeScript", "SQL", "R"]
    },
    {
      category: "Data Engineering",
      icon: <Database size={24} />,
      items: ["Apache Spark", "Pandas", "NumPy", "ETL Pipelines", "Data Warehousing"]
    },
    {
      category: "Mathematics",
      icon: <Calculator size={24} />,
      items: ["Calculus", "Statistics", "Linear Algebra", "Discrete Mathematics"]
    },
    {
      category: "Soft Skills",
      icon: <Users size={24} />,
      items: ["Teaching", "Communication", "Problem Solving", "Team Collaboration"]
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              My Journey
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As a dedicated Data Engineering student, I'm passionate about the intersection 
                of mathematics, technology, and real-world problem solving. My journey began 
                with a love for numbers and has evolved into building scalable data solutions.
              </p>
              <p>
                When I'm not coding or studying, I enjoy sharing my knowledge as a math tutor, 
                helping students overcome challenges and discover the beauty of mathematics. 
                This teaching experience has enhanced my communication skills and ability to 
                break down complex concepts.
              </p>
              <p>
                As a freelancer, I work on diverse projects ranging from data analysis to 
                web development, constantly learning new technologies and methodologies to 
                deliver innovative solutions for my clients.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-surface-elevated rounded-2xl p-8 shadow-card"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Quick Facts
            </h3>
            <div className="space-y-4">
              <div>
                <span className="font-medium text-foreground">🎓 Education:</span>
                <span className="text-muted-foreground ml-2">Data Engineering Student</span>
              </div>
              <div>
                <span className="font-medium text-foreground">💼 Experience:</span>
                <span className="text-muted-foreground ml-2">0 Years Freelancing</span>
              </div>
              <div>
                <span className="font-medium text-foreground">🌍 Location:</span>
                <span className="text-muted-foreground ml-2">Viet Nam</span>
              </div>
              <div>
                <span className="font-medium text-foreground">🎯 Focus:</span>
                <span className="text-muted-foreground ml-2">Data Engineering & Education</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-foreground text-center mb-12">
            Skills & Expertise
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillCategory, index) => (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-primary mr-3">
                    {skillCategory.icon}
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {skillCategory.category}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};