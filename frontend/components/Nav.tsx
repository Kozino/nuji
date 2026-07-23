"use client";
import Link from "next/link";
import { Mic, Globe2 } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-zilla text-xl font-bold text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-purple-600 text-white">
            <Mic className="h-4 w-4" />
          </span>
          nuji
        </Link>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/contribute" className="text-sm font-medium text-slate-600 hover:text-purple-700">Contribute</Link>
          <Link href="/leaderboard" className="text-sm font-medium text-slate-600 hover:text-purple-700">Leaderboard</Link>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 p-1">
          <Globe2 className="h-4 w-4 text-slate-400" />
          <select 
            value={selectedLang || ""}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
          >
            <option value="" disabled>Select Language</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>
      </nav>
    </header>
  );
}
