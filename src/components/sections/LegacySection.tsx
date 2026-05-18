import { motion } from "framer-motion";
import experienceImage from "@/assets/cleanest.jpeg";

const ExperienceContentSlot = () => (
  <div className="relative flex min-h-[320px] h-full items-center justify-center overflow-hidden border border-wez-cyan/15 bg-[rgba(10,10,18,0.62)] p-6 shadow-[inset_0_1px_0_rgba(143,239,255,0.04),0_14px_34px_rgba(0,0,0,0.28)]">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wez-cyan/50 to-transparent" />
    <div className="text-center">
      <p className="font-display text-xl font-semibold tracking-wide text-foreground md:text-2xl">
        Experience details
      </p>
      <div className="mx-auto mt-4 h-px w-24 bg-wez-cyan/30" />
    </div>
  </div>
);

export const LegacySection = () => {
  return (
    <section
      id="experience"
      className="content-section relative flex items-center overflow-hidden px-6 md:px-10 xl:px-16"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 section-vignette pointer-events-none" />
      <div className="absolute inset-0 section-floor pointer-events-none" />

      <div className="container relative z-10 mx-auto w-full max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 xl:mb-10"
        >
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Experience
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr] xl:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[360px] overflow-hidden border border-crimson/25 bg-[rgba(10,10,18,0.62)] shadow-[inset_0_1px_0_rgba(214,58,74,0.08),0_14px_34px_rgba(0,0,0,0.3)] md:min-h-[440px]"
          >
            <img
              src={experienceImage}
              alt="Experience visual"
              loading="lazy"
              className="h-full min-h-[360px] w-full object-cover opacity-90 md:min-h-[440px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            <ExperienceContentSlot />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
