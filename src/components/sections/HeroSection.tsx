import { motion } from "framer-motion";
import wazaemonImg from "@/assets/wazaemon.png";
import SakuraBackground from "@/components/SakuraBackground";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden bg-[#050505]"
    >
      {/* Colored Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${wazaemonImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Sakura Particle System - rendered at z-index 10 via wrapper if needed, but since it's fixed with z:-1 in its own file, we force a stacking context here */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
         <SakuraBackground />
      </div>

      {/* Mystical Overlays: Darker at bottom for blending, slight shadow in center for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505]/20 via-transparent to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.6)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-20 flex flex-col items-center text-center mt-10">
        {/* WEZAEMON • TOMBGUARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4"
        >
          <h3 className="font-display text-xs md:text-sm tracking-[0.4em] text-[#8FEFFF] uppercase drop-shadow-[0_0_8px_rgba(143,239,255,0.6)]">
            WEZAEMON • TOMBGUARD
          </h3>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase tracking-tighter leading-none mb-4 text-[#E0E0E0] relative"
          style={{ fontSize: "clamp(5rem, 15vw, 12rem)", textShadow: "0 0 50px rgba(139, 0, 0, 0.5)" }}
        >
          <span className="relative inline-block hover:animate-pulse transition-all">
            KUNG
            {/* Katana slash line through text */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "circOut" }}
              className="absolute top-1/2 left-[-15%] right-[-15%] h-[5px] bg-[#8B0000] origin-left z-20"
              style={{ transform: "translateY(-50%) rotate(-4deg)", boxShadow: "0 0 20px #8B0000" }}
            />
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-mono text-sm md:text-lg tracking-[0.3em] text-[#D4AF37] mb-8 px-6 py-2 border-b border-t border-[#D4AF37]/30 bg-[#0a0a0a]/40 backdrop-blur-sm uppercase"
        >
          Warden of the Digital Grave
        </motion.h2>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-mono text-sm md:text-base text-[#C0C0C0] max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide"
        >
          Full-stack Developer <span className="text-[#8B0000] mx-2">|</span> Data Engineer <span className="text-[#8B0000] mx-2">|</span> Anime Soul
          <br />
          <span className="block mt-4 italic text-[#888888] font-serif text-base">
            "Forging systems beyond mortal limits, where code meets the blade."
          </span>
        </motion.p>

        
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-[#888888] uppercase">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#8B0000] to-transparent" />
      </motion.div>
    </section>
  );
};
