import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollReveal(options?: {
  once?: boolean;
  margin?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: options?.once ?? true,
    margin: (options?.margin ?? "-10%") as Parameters<typeof useInView>[1] extends { margin?: infer M } ? M : never,
  });

  return { ref, inView };
}

// Framer Motion animation variants for staggered reveal
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const slideLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 350,
      damping: 18,
    },
  }),
};
