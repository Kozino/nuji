"use client";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Sparkles, ArrowRight, Languages, Users, AudioLines } from "lucide-react";

const LANGUAGES = [
  { code: "ig", name: "Igbo", speakers: "44M+" },
  { code: "yo", name: "Yoruba", speakers: "45M+" },
  { code: "ha", name: "Hausa", speakers: "63M+" },
  { code: "pi", name: "Pidgin", speakers: "75M+" },
];

const HOW_STEPS = [
  { n: "01", title: "Pick your language", desc: "Choose Igbo, Yoruba, Hausa or Pidgin — or switch between them anytime." },
  { n: "02", title: "Speak or type naturally", desc: "Respond to simple everyday prompts. Mix languages freely — that's the point." },
  { n: "03", title: "Earn points", desc: "Every contribution earns points. Climb the leaderboard and represent your state." },
];

export default function LandingPage() {
  const { selectedLang, setSelectedLang } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white" />
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            No account required • Takes less than 1 minute
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Teach AI to speak{" "}
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
              your language
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Not textbook Igbo. Not formal Yoruba. The way you actually talk — at
            the market, with friends, on the street. Every word you contribute
            helps build AI for 200M+ Nigerians.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setSelectedLang(l.code)}
                  className={`rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                    selectedLang === l.code
                      ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
            
            <Link 
              href="/contribute" 
              className={`mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-white shadow-lg transition ${
                selectedLang ? "bg-slate-900 hover:bg-slate-700" : "bg-slate-400 cursor-not-allowed"
              }`}
            >
              Start Contributing <ArrowRight className="h-4 w-4" />
            </Link>
            {!selectedLang && <p className="text-xs text-slate-500">Select a language above to begin</p>}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-slate-900">How it works</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {HOW_STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-8">
              <span className="text-3xl font-bold text-emerald-500">{s.n}</span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Four Languages */}
      <section className="border-y border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900">Four languages. One mission.</h2>
            <p className="mt-3 text-slate-600">
              We're building AI that understands how Nigerians actually speak —
              including code-switching between languages mid-sentence.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setSelectedLang(l.code);
                  window.location.href = "/contribute";
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                <Languages className="h-6 w-6 text-emerald-600" />
                <h3 className="mt-3 text-xl font-bold text-slate-900">{l.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{l.speakers} speakers</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                  Contribute <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
