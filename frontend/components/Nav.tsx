"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const LANGUAGES = [
  { code: "ig", name: "Igbo" },
  { code: "yo", name: "Yoruba" },
  { code: "ha", name: "Hausa" },
  { code: "pi", name: "Pidgin" },
];

export default function Nav() {
  const { selectedLang, setSelectedLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled || open
          ? "border-b border-line bg-paper/95 shadow-[0_1px_8px_rgba(0,0,0,0.06)] backdrop-blur-md"
          : "border-b border-transparent bg-paper/40 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2.5">
        <Link href="/" className="flex shrink-0 items-center">
          <Image src="/brand/nuji-logo-compact.png" alt="Nuji" width={680} height={780} className="h-16 w-auto sm:h-[4.5rem]" priority />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <Link href="/about" className="text-sm font-medium text-ink/70 transition hover:text-forest">
            About
          </Link>
          <Link href="/contribute" className="text-sm font-medium text-ink/70 transition hover:text-forest">
            Speak
          </Link>
          <Link href="/listen" className="text-sm font-medium text-ink/70 transition hover:text-forest">
            Listen
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium text-ink/70 transition hover:text-forest">
            Leaderboard
          </Link>
           <Link href="/admin/login" className="text-sm font-medium text-ink/70 transition hover:text-forest">
            Admin
          </Link>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1 shadow-sm">
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
          <div className="flex items-center gap-2">
            <button className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-ink/70 transition hover:text-forest">
              Log In
            </button>
            <button className="rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-paper transition hover:bg-ink/85">
              Sign Up
            </button>
          </div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white text-ink md:hidden"
        >
          {open ? <X className="h-[1.125rem] w-[1.125rem]" /> : <Menu className="h-[1.125rem] w-[1.125rem]" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper px-6 py-5 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/about" onClick={() => setOpen(false)} className="text-sm font-semibold text-ink">
              About
            </Link>
            <Link href="/contribute" onClick={() => setOpen(false)} className="text-sm font-semibold text-ink">
              Speak
            </Link>
            <Link href="/listen" onClick={() => setOpen(false)} className="text-sm font-semibold text-ink">
              Listen
            </Link>
            <Link href="/leaderboard" onClick={() => setOpen(false)} className="text-sm font-semibold text-ink">
              Leaderboard
            </Link>
          </div>

          <div className="mt-5 flex gap-2 border-t border-line pt-5">
            <button className="flex-1 rounded-full border border-line py-2 text-sm font-semibold text-ink/70">
              Log In
            </button>
            <button className="flex-1 rounded-full bg-ink py-2 text-sm font-semibold text-paper">
              Sign Up
            </button>
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
