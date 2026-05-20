// Contact section
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Radio } from "lucide-react";

const CONTACTS = [
  { label: "GitHub", href: "https://github.com/kung-da", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/h%C3%A0-sinh-cung-22480637b/", icon: Linkedin },
  { label: "Email", href: "mailto:cungpro2@gmail.com", icon: Mail },
];

export const ContactTerminal = () => {
  const ref = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-10%" as any });

  return (
    <section
      id="contact"
      ref={ref}
      className="content-section relative isolate overflow-hidden px-5 text-zinc-100 sm:px-8 lg:px-12 xl:px-16"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_50%,rgba(214,58,74,0.06),transparent_28%),radial-gradient(circle_at_92%_50%,rgba(143,239,255,0.055),transparent_30%)]" />
      <div className="absolute inset-0 section-vignette pointer-events-none" />

      <div className="container relative z-10 mx-auto w-full max-w-[760px]">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-7 text-center"
        >
          <div className="mx-auto flex max-w-[380px] items-center justify-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-crimson/50 to-crimson/20" />
            <Radio size={17} className="text-crimson" strokeWidth={1.6} />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-crimson sm:text-xs">
              Contact
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-wez-cyan/45 to-wez-cyan/15" />
          </div>

          <h2
            className="section-title mt-4 font-display text-3xl font-bold uppercase leading-none tracking-[0.04em] text-zinc-50 drop-shadow-[0_0_16px_rgba(214,58,74,0.28)] sm:text-4xl"
            data-text="CONTACT"
          >
            Contact
          </h2>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto grid max-w-[520px] grid-cols-3 gap-3 sm:gap-4"
        >
          {CONTACTS.map((contact, index) => {
            const Icon = contact.icon;
            const isExternal = !contact.href.startsWith("mailto:");

            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.07, duration: 0.35 }}
                className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-[8px] border border-white/[0.08] bg-black/45 p-3 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_24px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-wez-cyan/35 hover:bg-black/70 hover:shadow-[0_0_18px_rgba(143,239,255,0.09),0_14px_30px_rgba(0,0,0,0.28)] sm:p-4"
                aria-label={`Open ${contact.label}`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wez-cyan/60 to-transparent" />
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-wez-cyan/25 bg-wez-cyan/[0.045] text-wez-cyan transition-colors group-hover:border-wez-cyan group-hover:bg-wez-cyan/10 sm:h-12 sm:w-12">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <span className="relative z-10 mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-300 transition-colors group-hover:text-wez-cyan sm:text-xs">
                  {contact.label}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
