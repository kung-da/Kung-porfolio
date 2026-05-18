// About section
import profileImageAsset from "@/assets/profile-picture.jpg";
import { ProfileSystemFrame } from "@/components/sections/ProfileSystemFrame";

import "./AboutSection.css";

const profileImage = profileImageAsset;

const introParts = [
  "I'm Kung, a builder who loves turning ideas into impactful digital experiences. I focus on ",
  { text: "Data Engineering" },
  ", ",
  { text: "Frontend" },
  " development, and ",
  { text: "AI-assisted" },
  " projects to solve real-world problems.",
];

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="about-dossier-section content-section relative overflow-hidden px-6 md:px-10 xl:px-16"
      aria-labelledby="about-kung-title"
    >
      <div className="absolute inset-0 z-[2] section-vignette pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 z-[2] section-floor pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 z-[2] atmospheric-noise pointer-events-none" aria-hidden="true" />
      <div className="about-circuit-line about-circuit-line--top" aria-hidden="true" />
      <div className="about-circuit-line about-circuit-line--bottom" aria-hidden="true" />

      <div className="container relative z-10 mx-auto w-full max-w-[1440px] pb-16 pt-4 md:pb-20 lg:pb-12">
        <div className="about-dossier-shell grid min-h-[min(760px,calc(100svh-9rem))] grid-cols-1 items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-20">
          <div className="flex justify-center lg:justify-start">
            <ProfileSystemFrame imageSrc={profileImage} imageAlt="Kung profile portrait" />
          </div>

          <div className="about-dossier-copy relative max-w-[760px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="about-folder-icon" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-red-300/80">
                Personal Dossier
              </p>
              <span className="h-px min-w-10 flex-1 bg-gradient-to-r from-red-500/60 via-red-500/18 to-transparent" aria-hidden="true" />
              <span className="about-eyebrow-chevrons hidden md:inline-block" aria-hidden="true" />
            </div>

            <h2
              id="about-kung-title"
              data-text="ABOUT KUNG"
              className="about-title-scan font-display text-[44px] font-black uppercase leading-[0.98] tracking-[0.03em] sm:text-[58px] md:text-[68px] lg:text-[78px] xl:text-[92px]"
            >
              About Kung
            </h2>

            <div className="about-title-marks mt-7" aria-hidden="true" />

            <p className="mt-6 max-w-[700px] font-sans text-base leading-8 text-slate-300 md:text-lg md:leading-9">
              {introParts.map((part, index) =>
                typeof part === "string" ? (
                  part
                ) : (
                  <span key={`${part.text}-${index}`} className="font-semibold text-red-300">
                    {part.text}
                  </span>
                )
              )}
            </p>

            <div className="about-hud-divider mt-9" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="about-next-divider" aria-hidden="true">
        <div className="relative flex items-center justify-center">
          <div className="relative flex items-center gap-3 bg-[#06070a]/85 px-5">
            <span className="h-1.5 w-1.5 bg-red-400/70" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em]">Work Highlights</span>
            <span className="h-1.5 w-1.5 bg-red-400/45" />
          </div>
        </div>
        <div className="mt-2 text-center font-mono text-[12px] text-red-300/55">v</div>
      </div>
    </section>
  );
};
