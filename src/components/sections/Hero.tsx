import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import profilePicture from "@/assets/profile-picture.jpg";

export const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <img
              src={profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto shadow-large object-cover"
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl font-bold text-gray-900"
          >
            Hi, i'm Kung
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-xl md:text-2xl text-text-subtle mb-4">
              Data Engineering Student & Freelancer
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-primary-soft text-primary rounded-full text-sm font-medium">
                Data Engineering
              </span>
              <span className="px-4 py-2 bg-primary-soft text-primary rounded-full text-sm font-medium">
                Gamer
              </span>
              <span className="px-4 py-2 bg-primary-soft text-primary rounded-full text-sm font-medium">
                Freelancer
              </span>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 text-lg text-gray-700"
          >
            My full name is Hà Sinh Cung and I am currently a third-year student at Ho Chi Minh City University of Technology and Education (UTE).
             After more than two years of studying and training, I have built a solid foundation of specialized knowledge, combined with essential soft skills for both academic and professional environments.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToAbout}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            Learn More About Me
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToAbout}
            className="text-text-subtle hover:text-primary transition-colors duration-300"
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};