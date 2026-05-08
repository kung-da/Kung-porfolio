import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* Mystical Background Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(200,16,46,0.1)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,245,255,0.05)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-l-4 border-[#C8102E] pl-6"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#C8102E] uppercase mb-2">
            // IDENTITY OVERRIDE
          </p>
          <h2 className="font-black text-4xl md:text-5xl uppercase tracking-widest text-[#E0E0E0] drop-shadow-[0_0_10px_rgba(200,16,46,0.3)]">
            Warden of the Digital Grave
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 font-mono text-[#C0C0C0] leading-relaxed text-sm md:text-base"
          >
            <p>
              I am a guardian of the hidden field. With a blade forged in modern web technologies and a soul etched in legacy systems, I build digital experiences that are resilient, scalable, and visually absolute.
            </p>
            <p>
              My journey began as a solitary swordsman in the realm of Data Engineering, where I learned to tame massive streams of information. Soon, I ascended to the frontend, mastering React and WebGL to bring raw data into the light.
            </p>
            <p className="text-[#888888] italic font-serif text-lg">
              "A true master does not just write code; he breathes life into the machine, ensuring its spirit remains unbroken."
            </p>
            
            <div className="pt-8 flex gap-6">
              <div className="flex flex-col gap-2 border-l border-[#333333] pl-4">
                <span className="text-3xl font-display text-[#00f5ff] font-bold">5+</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#888888]">Years<br/>Guarding</span>
              </div>
              <div className="flex flex-col gap-2 border-l border-[#333333] pl-4">
                <span className="text-3xl font-display text-[#C8102E] font-bold">50+</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#888888]">Raids<br/>Completed</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Element (Wezaemon Emblem / Tree placeholder) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-square relative w-full max-w-md mx-auto border border-[#333333] bg-[#0A0A0A] p-4 group">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#C8102E]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f5ff]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00f5ff]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#C8102E]" />
              
              <div className="w-full h-full bg-[#050505] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.2)_0%,transparent_70%)] group-hover:scale-110 transition-transform duration-700" />
                <span className="font-display text-8xl text-[#C8102E] opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  墓
                </span>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  {/* Subtle glowing lines representing a katana or cross */}
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent absolute top-1/2 -translate-y-1/2" />
                  <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#C8102E]/50 to-transparent absolute left-1/2 -translate-x-1/2" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
