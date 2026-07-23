"use client";
import Link from "next/link";
import { Mic } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const LANGUAGES = [
  { code: "ig", name: "Igbo" },
  { code: "yo", name: "Yoruba" },
  { code: "ha", name: "Hausa" },
  { code: "pi", name: "Pidgin" },
];

export default function Nav() {
  const { selectedLang, setSelectedLang } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 text-white">
            <Mic className="h-5 w-5" />
          </span>
          nuji
        </Link>
        
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/contribute" className="text-sm font-medium text-slate-600 hover:text-slate-900">Contribute</Link>
          <Link href="/leaderboard" className="text-sm font-medium text-slate-600 hover:text-slate-900">Leaderboard</Link>
        </div>

        <div className="flex items-center gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => setSelectedLang(l.code)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                selectedLang === l.code ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
