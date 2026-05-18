// About section
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import profileImageAsset from "@/assets/profile-picture.jpg";
import { ProfileSystemFrame } from "@/components/sections/ProfileSystemFrame";

import "./AboutSection.css";

const profileImage = profileImageAsset;

export const AboutSection = () => {
  const ref = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-12%" as any });

  return (
    <section id="about" ref={ref} className="about-kung-section" aria-labelledby="about-kung-title">
      <div className="about-kung-glow" aria-hidden="true" />
      <span className="about-kung-plus about-kung-plus--top" aria-hidden="true">+</span>
      <span className="about-kung-plus about-kung-plus--bottom" aria-hidden="true">+</span>

      <div className="about-kung-inner">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProfileSystemFrame imageSrc={profileImage} imageAlt="Kung profile portrait" />
        </motion.div>

        <div className="about-kung-content">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="about-kung-dossier-row"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span>Personal Dossier</span>
            <div aria-hidden="true" />
            <strong aria-hidden="true">&gt;&gt;</strong>
          </motion.div>

          <motion.h2
            id="about-kung-title"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="about-kung-heading"
          >
            About Kung
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="about-kung-red-dashes"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
            <span />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="about-kung-bio"
          >
            I'm Kung, a builder who loves turning ideas into impactful digital experiences. I focus on{" "}
            <span>Data Engineering, Frontend</span> development, and <span>AI-assisted</span> projects to solve
            real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="about-kung-bottom-rule"
            aria-hidden="true"
          >
            <div />
            <span>
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
