"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { SoundMark } from "./SoundMark";

const LANGUAGES = [
  { code: "ig", name: "Igbo" },
  { code: "yo", name: "Yoruba" },
  { code: "ha", name: "Hausa" },
  { code: "pi", name: "Pidgin" },
];

export default function Nav() {
  const { selectedLang, setSelectedLang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-zilla text-xl font-bold text-ink">
          <SoundMark className="h-8 w-8" />
          nuji
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <Link href="/contribute" className="text-sm font-medium text-ink/70 transition hover:text-forest">
            Contribute
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium text-ink/70 transition hover:text-forest">
            Leaderboard
          </Link>
        </div>

        <div className="hidden items-center gap-1 rounded-full border border-line bg-white p-1 shadow-sm md:flex">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => setSelectedLang(l.code)}
              className={`rounded-full px-3 py-1.5 font-plex text-xs font-medium tracking-wide transition ${
                selectedLang === l.code
                  ? "bg-forest text-paper"
                  : "text-ink/50 hover:bg-forest-light hover:text-forest-dark"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white text-ink md:hidden"
        >
          {open ? <X className="h-[1.125rem] w-[1.125rem]" /> : <Menu className="h-[1.125rem] w-[1.125rem]" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper px-6 py-5 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/contribute" onClick={() => setOpen(false)} className="text-sm font-semibold text-ink">
              Contribute
            </Link>
            <Link href="/leaderboard" onClick={() => setOpen(false)} className="text-sm font-semibold text-ink">
              Leaderboard
            </Link>
          </div>
          <p className="mt-5 mb-2 font-plex text-[11px] font-semibold uppercase tracking-wider text-ink/40">
            Select language
          </p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setSelectedLang(l.code); setOpen(false); }}
                className={`rounded-full border px-3.5 py-1.5 font-plex text-xs font-medium ${
                  selectedLang === l.code
                    ? "border-forest bg-forest text-paper"
                    : "border-line bg-white text-ink/60"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
