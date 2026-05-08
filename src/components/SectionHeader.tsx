import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  chapter: string;
  title: string;
  jp?: ReactNode;
}

export const SectionHeader = ({ chapter, title, jp }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.5 }}
    className="mb-10"
  >
    <p className="chapter-label mb-2">
      CHAPTER {chapter} {jp && <span className="font-jp ml-2 text-ink">{jp}</span>}
    </p>
    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] text-[#0A0A0A]">
      [{title}]
    </h2>
    <div className="manga-rule mt-4" />
  </motion.div>
);
