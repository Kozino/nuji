"use client";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Sparkles, Mic, Type, ArrowRight, Users, AudioLines, Globe2 } from "lucide-react";

const STATS = [
  { icon: Sparkles, value: 0, label: "Contributions" },
  { icon: Users, value: 0, label: "Contributors" },
  { icon: AudioLines, value: 0, suffix: "hrs", label: "Audio Recorded" },
];

export default function LandingPage() {
  const { setSelectedLang } = useLanguage();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-50 via-white to-white" />
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
        
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Technology that speaks{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              your language
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Not textbook Igbo. Not formal Yoruba. The way you actually talk — at
            the market, with friends, on the street. Every word you contribute
            helps build AI for 200M+ Nigerians.
          </p>
          
          <div className="mt-10 flex justify-center">
            <Link 
              href="/contribute" 
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-700"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Band */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900">A free, open platform for community-led data creation</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Voice assistants today support fewer than 1% of the world's languages. We're here to change that by making it easy for people like you to share your voice.
          </p>
        </div>
      </section>

      {/* Stats Band */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto mb-3 h-6 w-6 text-violet-600" />
              <div className="text-4xl font-bold text-slate-900">{s.value}{s.suffix || ""}</div>
              <div className="mt-1 text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contribution Modes (Mozilla Style Cards) */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold text-slate-900">Ways to contribute</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            
            <Link href="/contribute" className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="inline-flex w-fit items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">Speak</span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">Read sentences aloud</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">Contribute to the most diverse public speech dataset by reading curated prompts in your language.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
                Start speaking <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>

            <Link href="/contribute" className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="inline-flex w-fit items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Type</span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">Answer prompts</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">Respond to open prompts to build datasets for organic, colloquial contexts. Perfect for code-switching.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                Start typing <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
