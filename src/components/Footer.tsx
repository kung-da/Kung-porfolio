import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [text, setText] = useState("");
  const fullText = `> SESSION TERMINATED · © ${new Date().getFullYear()} CUNG-MASTER · ALL SYSTEMS OFFLINE`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative pt-16 pb-8 bg-[#030308] overflow-hidden flex flex-col items-center">
      {/* Top Border with Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00D4FF22]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00D4FF] opacity-50 shadow-[0_0_6px_#00D4FF44]" />

      {/* Top Row - Logo */}
      <div className="text-center mb-10 mt-4">
        <h2 className="text-[#00D4FF] text-[28px] md:text-[32px] m-0 leading-none" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          WEZAEMON
        </h2>
        <div className="text-[#CC000088] font-mono text-[11px] tracking-[0.4em] mt-2">
          THE TOMBGUARD
        </div>
      </div>

      {/* Middle Row - Command Chips */}
      <div className="flex gap-4 mb-10">
        <a href="https://github.com/kung-da" target="_blank" rel="noreferrer" className="border border-[#1a1a2e] text-[#444455] font-mono text-[11px] px-3.5 py-1.5 rounded-[2px] hover:border-[#00D4FF44] hover:text-[#00D4FF] transition-all">
          [ GITHUB ]
        </a>
        <a href="https://linkedin.com/in/cung" target="_blank" rel="noreferrer" className="border border-[#1a1a2e] text-[#444455] font-mono text-[11px] px-3.5 py-1.5 rounded-[2px] hover:border-[#00D4FF44] hover:text-[#00D4FF] transition-all">
          [ LINKEDIN ]
        </a>
        <a href="mailto:hello@cung-master.dev" className="border border-[#1a1a2e] text-[#444455] font-mono text-[11px] px-3.5 py-1.5 rounded-[2px] hover:border-[#00D4FF44] hover:text-[#00D4FF] transition-all">
          [ EMAIL ]
        </a>
      </div>

      {/* Divider */}
      <div className="w-full flex items-center justify-center mb-8 px-12">
        <div className="flex-1 h-[1px] bg-[#0D0D20]" />
        <div className="text-[#1a1a2e] text-[10px] mx-4">◆</div>
        <div className="flex-1 h-[1px] bg-[#0D0D20]" />
      </div>

      {/* Bottom Row - Credits */}
      <div className="font-mono text-[11px] text-[#222] mb-12 text-center h-[20px]">
        {text}
      </div>

      {/* Scroll to Top */}
      <button 
        onClick={scrollToTop}
        className="font-mono text-[10px] text-[#CC000066] border border-[#CC000033] px-4 py-2 hover:text-[#CC0000] hover:border-[#CC0000] transition-colors"
      >
        [ ↑ REINITIALIZE ]
      </button>
    </footer>
  );
};
