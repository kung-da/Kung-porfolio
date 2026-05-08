import { motion } from "framer-motion";
const slideLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } };
const slideRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } };

export const AboutSection = () => {
  return (
    <section id="about" className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#050510] overflow-hidden text-[#7899aa]">
      {/* Circuit Board Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 100% 50%, transparent 20%, #050510 21%, #050510 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, #050510 21%, #050510 34%, transparent 35%, transparent)",
          backgroundSize: "40px 40px"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050510_100%)] pointer-events-none z-0" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="mb-16">
          <p className="font-mono text-[11px] text-[#00D4FF] mb-2 tracking-wider">
            // DOSSIER.EXE
          </p>
          <div className="w-full h-[1px] bg-[#00D4FF] mb-4" />
          <h2 className="font-bold text-3xl md:text-5xl tracking-widest text-[#E0E0E0]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            SUBJECT: WEZAEMON THE TOMBGUARD
          </h2>
        </div>

        <div className="grid md:grid-cols-[4fr_6fr] gap-12 md:gap-16 items-start">
          {/* Left Column - Portrait */}
          <motion.div 
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="relative"
          >
            {/* Double Border Frame */}
            <div className="relative p-1 border border-[#00D4FF44] bg-[#050510]">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00D4FF] -translate-x-[1px] -translate-y-[1px]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00D4FF] translate-x-[1px] -translate-y-[1px]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00D4FF] -translate-x-[1px] translate-y-[1px]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00D4FF] translate-x-[1px] translate-y-[1px]" />
              
              <div className="relative border border-[#CC000022] aspect-[3/4] overflow-hidden bg-[#0a0a14] flex items-center justify-center">
                {/* Scan line animation */}
                <motion.div 
                  className="absolute left-0 right-0 h-[1px] bg-[#00D4FF] shadow-[0_0_8px_#00D4FF] opacity-50 z-20"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <span className="font-black text-[120px] text-[#111122]" style={{ fontFamily: "'Orbitron', sans-serif" }}>?</span>
              </div>
            </div>

            {/* Clearance Bar */}
            <div className="mt-4 bg-[#0a0a14] border border-[#1a1a2e] px-4 py-2 text-center">
              <span className="font-mono text-[11px] text-[#CC0000] tracking-widest uppercase">
                CLEARANCE: SENIOR DATA OPS
              </span>
            </div>
          </motion.div>

          {/* Right Column - Data Fields */}
          <motion.div 
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="flex flex-col gap-6"
          >
            <div className="font-mono text-[13px] text-[#7899aa] space-y-4">
              <div className="flex justify-between border-b border-dotted border-[#333] pb-1">
                <span className="text-[#00D4FF] uppercase">DESIGNATION</span>
                <span className="text-[#E0E0E0]">Cung Master</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-[#333] pb-1">
                <span className="text-[#00D4FF] uppercase">CLASS</span>
                <span className="text-[#E0E0E0]">Data Engineer · AI Developer</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-[#333] pb-1">
                <span className="text-[#00D4FF] uppercase">FACTION</span>
                <span className="text-[#E0E0E0]">Pipeline · Intelligence · Systems</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-[#333] pb-1">
                <span className="text-[#00D4FF] uppercase">BASE OF OPS</span>
                <span className="text-[#E0E0E0]">Ho Chi Minh City, VN</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-[#333] pb-1">
                <span className="text-[#00D4FF] uppercase">STATUS</span>
                <span className="text-[#00FF88]">ACTIVE — AVAILABLE</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-[#333] pb-1 items-center">
                <span className="text-[#CC0000] uppercase">THREAT LEVEL</span>
                <span className="text-[#CC0000] tracking-widest text-[10px]">████████░░ CRITICAL</span>
              </div>
            </div>

            {/* Bio Box */}
            <div className="mt-6 border border-[#1a1a2e] border-l-2 border-l-[#00D4FF] bg-[#070710] p-4 pl-4 shadow-[-4px_0_12px_#00D4FF11]">
              <p className="font-mono text-[13px] text-[#7899aa] leading-[1.9]">
                Specialized in forging unyielding data pipelines and embedding intelligence into legacy systems. Known for rapid deployment, zero-downtime architecture, and an unbreakable defensive stance in backend infrastructure. When the digital grave shifts, the Tombguard answers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
