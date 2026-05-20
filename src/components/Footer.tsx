import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Footer = () => {
  const [text, setText] = useState("");
  const fullText = `> SESSION TERMINATED · © ${new Date().getFullYear()} CUNG-MASTER · ALL SYSTEMS OFFLINE`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative pt-16 pb-8 bg-black overflow-hidden flex flex-col items-center">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D63A4A33]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#D63A4A] opacity-40 shadow-[0_0_8px_#D63A4A44]" />

      {/* Logo */}
      <div className="text-center mb-10 mt-4">
        <h2
          className="font-display text-[24px] md:text-[28px] tracking-[0.3em] leading-none glitch-hover"
          data-text="HÀ SINH CUNG"
          style={{ color: "#D63A4A" }}
        >
          HÀ SINH CUNG
        </h2>
        <div className="font-mono-ui text-[10px] tracking-[0.5em] mt-2 text-dim uppercase">
          DATA ENGINEER
        </div>
      </div>

      {/* Link Chips */}
      <div className="flex gap-4 mb-10">
        {[
          { label: "GITHUB", href: "https://github.com/kung-da" },
          { label: "LINKEDIN", href: "https://www.linkedin.com/in/h%C3%A0-sinh-cung-22480637b/" },
          { label: "EMAIL", href: "mailto:cungpro2@gmail.com" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="border border-[#1a1a2e] text-muted-ui font-mono-ui text-[10px] px-3 py-1.5 transition-all duration-100 hover:border-[#D63A4A] hover:text-crimson hover:shadow-[0_0_10px_rgba(214,58,74,0.22)]"
            style={{ clipPath: "polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)" }}
          >
            [ {l.label} ]
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full flex items-center justify-center mb-8 px-12">
        <div className="flex-1 h-[1px] bg-[#1a1a2e]" />
        <div className="text-[#1a1a2e] text-[8px] mx-4 rotate-45">◆</div>
        <div className="flex-1 h-[1px] bg-[#1a1a2e]" />
      </div>

      {/* Typewriter Credits */}
      <div className="font-mono-ui text-[10px] text-[#333] mb-12 text-center h-5">
        {text}
        <span className="animate-pulse ml-1">█</span>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="font-mono-ui text-[10px] text-crimson border border-[#D63A4A33] px-5 py-2 transition-all duration-100 hover:border-[#D63A4A] hover:shadow-[0_0_15px_rgba(214,58,74,0.3)]"
        style={{ clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)" }}
      >
        [ ↑ REINITIALIZE ]
      </motion.button>
    </footer>
  );
};
