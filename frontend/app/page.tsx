"use client";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Mic, Type, ArrowRight, Users, AudioLines, Globe2 } from "lucide-react";

const STATS = [
  { icon: Globe2, value: 4, label: "Languages" },
  { icon: Users, value: 0, label: "Contributors" },
  { icon: AudioLines, value: 0, suffix: "hrs", label: "Audio Recorded" },
];

export default function LandingPage() {
  const { setSelectedLang } = useLanguage();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-slate-900 py-28 sm:py-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-500 opacity-90" />
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1599256871679-5d0d6976e3c0?q=80&w=2070&auto=format&fit=crop')] opacity-10 mix-blend-overlay" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-zilla text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Technology that speaks your language
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-purple-100">
            Not textbook Igbo. Not formal Yoruba. The way you actually talk — at the market, with friends, on the street. Every word you contribute helps build AI for 200M+ Nigerians.
          </p>
          
          <div className="mt-10 flex justify-center">
            <Link 
              href="/contribute" 
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-purple-700 shadow-lg transition hover:bg-purple-50"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Band */}
      <section className="border-b border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-zilla text-3xl font-bold text-slate-900 sm:text-4xl">
            A free, open platform for community-led data creation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Voice assistants today support fewer than 1% of the world's languages. We're here to change that by making it easy for people like you to share your voice.
          </p>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto mb-3 h-8 w-8 text-purple-600" />
              <div className="font-zilla text-4xl font-bold text-slate-900">{s.value}{s.suffix || ""}</div>
              <div className="mt-1 text-sm font-medium uppercase tracking-wider text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contribution Modes (Mozilla Style Cards) */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-zilla text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Ways to contribute</h2>
            <p className="mt-4 text-lg text-slate-600">Pick whichever fits you. Every clip and every sentence makes the dataset richer.</p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Speak Card */}
            <Link href="/contribute" className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-purple-400 hover:shadow-xl">
              <span className="inline-flex w-fit items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">Speak</span>
              <h3 className="font-zilla mt-4 text-2xl font-bold text-slate-900">Read sentences aloud</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">Contribute to the most diverse public speech dataset by reading curated prompts in your language.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-700">
                Start speaking <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Type Card */}
            <Link href="/contribute" className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-pink-400 hover:shadow-xl">
              <span className="inline-flex w-fit items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">Type</span>
              <h3 className="font-zilla mt-4 text-2xl font-bold text-slate-900">Answer prompts</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">Respond to open prompts to build datasets for organic, colloquial contexts. Perfect for code-switching.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pink-700">
                Start typing <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
