import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  profile,
  projects,
  seasons,
  skillGroups,
  achievements,
  extras,
  type Project,
} from "./data";

const links = [
  ["Originals", "#originals"],
  ["Seasons", "#seasons"],
  ["Top picks", "#skills"],
  ["Awards", "#awards"],
  ["Contact", "#contact"],
];

function Navbar() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 transition-colors"
      style={{ background: solid ? "rgba(11,11,12,0.94)" : "linear-gradient(#000c,#0000)" }}
    >
      <nav className="wrap flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" className="display text-3xl text-red" aria-label="Monish, home">
          MONISH
        </a>
        <ul className="hidden items-center gap-6 text-sm text-muted md:flex">
          {links.map(([l, h]) => (
            <li key={h}>
              <a className="transition-colors hover:text-ink" href={h}>
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn btn-solid !min-h-10 !px-4 text-sm" href={profile.resume} target="_blank" rel="noreferrer">
          Resume
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <img
        src="/assets/hero.webp"
        alt="Chaparla Monish in a yellow shirt at the Andhra University gate at night"
        className="absolute inset-x-0 top-0 h-[56svh] w-full object-cover object-[70%_20%] md:inset-0 md:h-full md:object-[72%_30%]"
      />
      <div className="absolute inset-x-0 top-0 h-[56svh] bg-[linear-gradient(0deg,#0b0b0c_0%,#0b0b0c00_45%)] md:hidden" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#0b0b0cf2_0%,#0b0b0c99_45%,#0b0b0c00_75%),linear-gradient(0deg,#0b0b0c_0%,#0b0b0c00_35%)] md:block" />
      <div className="wrap relative pb-16 pt-[52svh] md:pb-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red">A portfolio series</p>
          <h1 className="display text-[clamp(64px,13vw,160px)]">{profile.name}</h1>
          <p className="mt-4 text-xl font-medium text-ink md:text-2xl">{profile.tagline}</p>
          <p className="mt-3 max-w-xl text-base text-muted md:text-lg">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-solid" href="#originals">
              ▶ Watch the projects
            </a>
            <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer">
              View resume
            </a>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[
              ["8.7", "CGPA"],
              ["99.6%", "Recall, Amazon ML 2026"],
              ["0.98", "F0.5, Amazon ML 2026"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="display text-4xl">{v}</dt>
                <dd className="text-sm text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red">{kicker}</p>
      <h2 className="display mt-1 text-5xl md:text-6xl">{title}</h2>
    </div>
  );
}

function Originals({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section id="originals" className="py-20">
      <div className="wrap">
        <SectionHead kicker="Monish Originals" title="Projects" />
        <div className="rail" role="list">
          {projects.map((p, i) => (
            <button
              key={p.id}
              role="listitem"
              className="poster"
              style={{ background: p.hue }}
              onClick={() => onOpen(p)}
              aria-label={`Open ${p.title}`}
            >
              <span className="display absolute left-4 top-3 text-5xl text-white/25">{String(i + 1).padStart(2, "0")}</span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 pt-16">
                <span className="block text-xs font-semibold uppercase tracking-widest text-white/70">{p.tag}</span>
                <span className="display mt-1 block text-4xl text-white">{p.title}</span>
                <span className="mt-1 block text-sm text-white/70">{p.year}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Seasons() {
  return (
    <section id="seasons" className="bg-panel py-20">
      <div className="wrap">
        <SectionHead kicker="My journey" title="Seasons" />
        <ol className="grid gap-4 md:grid-cols-3">
          {seasons.map((s) => (
            <li key={s.season} className="rounded-lg border border-line bg-bg p-6 transition-transform hover:-translate-y-0.5">
              <p className="text-sm font-semibold uppercase tracking-widest text-red">{s.season}</p>
              <h3 className="display mt-2 text-3xl">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {s.years} · {s.place}
              </p>
              <p className="mt-4 text-ink">{s.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="wrap">
        <SectionHead kicker="What I work with" title="Top picks" />
        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.name}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">{g.name}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-panel px-4 py-1.5 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section id="awards" className="bg-panel py-20">
      <div className="wrap">
        <SectionHead kicker="Highlights" title="Awards & results" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <li key={a.big} className="rounded-lg border border-line bg-bg p-6">
              <p className="display text-6xl text-red">{a.big}</p>
              <p className="mt-2 text-sm text-muted">{a.label}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-8 grid gap-2 text-muted md:grid-cols-2">
          {extras.map((e) => (
            <li key={e} className="before:mr-2 before:text-red before:content-['•']">
              {e}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    ["Email", profile.email, `mailto:${profile.email}`],
    ["GitHub", "monishchaparla", profile.github],
    ["LinkedIn", "Chaparla Monish", profile.linkedin],
  ];
  return (
    <section id="contact" className="py-24">
      <div className="wrap text-center">
        <h2 className="display text-[clamp(48px,9vw,110px)]">Ready for the next season?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          I'm looking for software development and machine learning internships. Send a message or grab my resume.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a className="btn btn-solid" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer">
            Download resume
          </a>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          {items.map(([l, t, h]) => (
            <li key={l}>
              <a className="text-muted underline-offset-4 transition-colors hover:text-ink hover:underline" href={h} target="_blank" rel="noreferrer">
                {l}: {t}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-panel"
        initial={{ y: 30, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-44 p-6" style={{ background: p.hue }}>
          <button className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-xl" onClick={onClose} aria-label="Close">
            ×
          </button>
          <p className="absolute bottom-6 left-6 right-6">
            <span className="block text-xs font-semibold uppercase tracking-widest text-white/80">{p.tag} · {p.year}</span>
            <span className="display block text-5xl text-white">{p.title}</span>
          </p>
        </div>
        <div className="space-y-5 p-6">
          <p className="text-lg">{p.blurb}</p>
          {p.metrics && (
            <ul className="flex gap-8">
              {p.metrics.map((m) => (
                <li key={m.label}>
                  <p className="display text-5xl text-red">{m.value}</p>
                  <p className="text-sm text-muted">{m.label}</p>
                </li>
              ))}
            </ul>
          )}
          <ul className="space-y-2 text-muted">
            {p.bullets.map((b) => (
              <li key={b} className="before:mr-2 before:text-red before:content-['•']">
                {b}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">
                {s}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            {p.links.map((l) => (
              <a key={l.href} className="btn btn-solid" href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
            {p.note && <span className="text-sm text-muted">{p.note}</span>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <>
      <a href="#originals" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3 focus:text-black">
        Skip to projects
      </a>
      <Navbar />
      <main>
        <Hero />
        <Originals onOpen={setOpen} />
        <Seasons />
        <Skills />
        <Awards />
        <Contact />
      </main>
      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}. A personal portfolio, not affiliated with any streaming service.
      </footer>
      <AnimatePresence>{open && <Modal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
}
