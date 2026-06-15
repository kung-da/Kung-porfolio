import { ArrowUp, Github, Linkedin, Mail, Radio } from "lucide-react";
import { motion } from "framer-motion";

const LINKS = [
  {
    label: "GITHUB",
    detail: "kung-da",
    href: "https://github.com/kung-da",
    icon: Github,
  },
  {
    label: "LINKEDIN",
    detail: "Professional network",
    href: "https://www.linkedin.com/in/h%C3%A0-sinh-cung-22480637b/",
    icon: Linkedin,
  },
  {
    label: "EMAIL",
    detail: "cungpro2@gmail.com",
    href: "mailto:cungpro2@gmail.com",
    icon: Mail,
  },
];

const STATUS_BARS = Array.from({ length: 24 });

export const Footer = () => {
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="footer"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black px-5 py-24 text-zinc-100 [scroll-snap-align:start] sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(214,58,74,0.1),transparent_30rem),radial-gradient(circle_at_82%_70%,rgba(143,239,255,0.06),transparent_26rem)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson to-transparent shadow-[0_0_14px_rgba(214,58,74,0.6)]" />

      <div className="container relative z-10 mx-auto w-full max-w-[1040px]">
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-crimson/45" />
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-crimson sm:text-xs">
            <Radio size={15} strokeWidth={1.6} />
            Transmission complete
          </div>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-wez-cyan/40" />
        </div>

        <div
          className="relative overflow-hidden border border-white/[0.1] bg-[#080a0b]/90 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-9"
          style={{
            clipPath:
              "polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)",
          }}
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-wez-cyan/65 to-transparent" />
          <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-crimson/70" />
          <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-wez-cyan/70" />

          <div className="grid items-end gap-7 border-b border-white/[0.08] pb-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                Data Engineer // Portfolio
              </p>
              <h2
                className="glitch-hover font-display text-3xl font-bold uppercase leading-none tracking-[0.12em] text-zinc-50 sm:text-4xl md:text-5xl"
                data-text="HA SINH CUNG"
              >
                Ha Sinh Cung
              </h2>
              <p className="mt-4 max-w-xl font-mono text-xs leading-6 text-zinc-400 sm:text-sm">
                Building reliable data pipelines, analytics systems, and interfaces that turn raw information into useful decisions.
              </p>
            </div>

            <div className="flex items-center gap-3 border border-status-active/20 bg-status-active/[0.035] px-4 py-3">
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-status-active shadow-[0_0_10px_rgba(0,255,136,0.75)]"
              />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">Channel status</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-status-active">Open to connect</p>
              </div>
            </div>
          </div>

          <div className="my-7 grid gap-3 sm:grid-cols-3">
            {LINKS.map((link, index) => {
              const Icon = link.icon;
              const external = !link.href.startsWith("mailto:");

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="group relative flex min-h-[96px] items-center gap-4 overflow-hidden border border-white/[0.09] bg-white/[0.025] px-4 py-4 transition-colors hover:border-wez-cyan/40 hover:bg-wez-cyan/[0.045]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-wez-cyan/25 bg-wez-cyan/[0.04] text-wez-cyan transition-colors group-hover:border-wez-cyan/65 group-hover:bg-wez-cyan/10">
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-title text-sm font-semibold tracking-[0.13em] text-zinc-100 group-hover:text-wez-cyan">
                      {link.label}
                    </span>
                    <span className="mt-1 block truncate font-mono text-[10px] text-zinc-500 group-hover:text-zinc-300">
                      {link.detail}
                    </span>
                  </span>
                  <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-wez-cyan/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.a>
              );
            })}
          </div>

          <div className="flex flex-col gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex h-4 items-end gap-[3px]">
                {STATUS_BARS.map((_, index) => (
                  <span
                    key={index}
                    className="w-[2px] bg-crimson/55"
                    style={{ height: `${4 + ((index * 7) % 12)}px` }}
                  />
                ))}
              </div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                Session complete / Copyright {year} Ha Sinh Cung
              </p>
            </div>

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center gap-3 border border-crimson/40 bg-crimson/[0.055] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.17em] text-crimson transition-colors hover:border-crimson hover:bg-crimson/10 hover:text-zinc-50"
            >
              Return to top
              <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
