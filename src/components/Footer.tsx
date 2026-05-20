import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "GITHUB", href: "https://github.com/kung-da" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/h%C3%A0-sinh-cung-22480637b/" },
  { label: "EMAIL", href: "mailto:cungpro2@gmail.com" },
];

export const Footer = () => {
  const [text, setText] = useState("");
  const fullText = useMemo(
    () => `> SESSION TERMINATED · © ${new Date().getFullYear()} CUNG-MASTER · ALL SYSTEMS OFFLINE`,
    []
  );

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index += 1;
      if (index > fullText.length) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [fullText]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative flex flex-col items-center overflow-hidden bg-black pb-8 pt-16">
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-[#D63A4A33]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-[#D63A4A] opacity-40 shadow-[0_0_8px_#D63A4A44]" />

      <div className="mb-10 mt-4 text-center">
        <h2
          className="glitch-hover font-display text-[24px] leading-none tracking-[0.3em] md:text-[28px]"
          data-text="HA SINH CUNG"
          style={{ color: "#D63A4A" }}
        >
          HA SINH CUNG
        </h2>
        <div className="font-mono-ui mt-2 text-[10px] uppercase tracking-[0.5em] text-dim">
          DATA ENGINEER
        </div>
      </div>

      <div className="mb-10 flex gap-4">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="font-mono-ui border border-[#1a1a2e] px-3 py-1.5 text-[10px] text-muted-ui transition-all duration-100 hover:border-[#D63A4A] hover:text-crimson hover:shadow-[0_0_10px_rgba(214,58,74,0.22)]"
            style={{ clipPath: "polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)" }}
          >
            [ {link.label} ]
          </a>
        ))}
      </div>

      <div className="mb-8 flex w-full items-center justify-center px-12">
        <div className="h-px flex-1 bg-[#1a1a2e]" />
        <div className="mx-4 rotate-45 text-[8px] text-[#1a1a2e]">◆</div>
        <div className="h-px flex-1 bg-[#1a1a2e]" />
      </div>

      <div className="font-mono-ui mb-12 h-5 text-center text-[10px] text-[#333]">
        {text}
        <span className="ml-1 animate-pulse">█</span>
      </div>

      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="font-mono-ui border border-[#D63A4A33] px-5 py-2 text-[10px] text-crimson transition-all duration-100 hover:border-[#D63A4A] hover:shadow-[0_0_15px_rgba(214,58,74,0.3)]"
        style={{ clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)" }}
      >
        RETURN TO TOP
      </motion.button>
    </footer>
  );
};
