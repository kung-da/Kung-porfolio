import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Petal = ({ left, delay, duration, size, scrollY }: any) => {
  // scroll gravity: petals fall faster & drift as user scrolls
  const y = useTransform(scrollY, [0, 3000], [0, 600]);
  const rotate = useTransform(scrollY, [0, 3000], [0, 720]);
  const x = useTransform(scrollY, [0, 3000], [0, Math.random() * 200 - 100]);

  return (
    <motion.div
      className="absolute animate-fall"
      style={{
        left: `${left}%`,
        top: -30,
        width: size,
        height: size * 1.5,
        background: "linear-gradient(135deg, #FF1493, #FF69B4)",
        boxShadow: "0 0 8px rgba(255,20,147,0.6)",
        opacity: 0.7,
        borderRadius: "60% 40% 50% 50%",
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        y,
        x,
        rotate,
      }}
    />
  );
};

export const SakuraPetals = () => {
  const { scrollY } = useScroll();
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: i * 1.2 + Math.random() * 2,
        duration: 10 + Math.random() * 10,
        size: 8 + Math.random() * 8,
      })),
    []
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {petals.map((p, i) => (
        <Petal key={i} {...p} scrollY={scrollY} />
      ))}
    </div>
  );
};
