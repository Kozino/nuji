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
      {/* Hero Section with Background Image */}
      <section className="relative isolate overflow-hidden bg-slate-900 py-32 sm:py-48">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1599256871679-5d0d6976e3c0?q=80&w=2070&auto=format&fit=crop"
            alt="People communicating"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-4 py-1.5 text-xs font-semibold text-violet-300 ring-1 ring-inset ring-violet-400/30 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            No account required • Takes less than 1 minute
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Technology that speaks{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              your language
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Not textbook Igbo. Not formal Yoruba. The way you actually talk — at
            the market, with friends, on the street. Every word you contribute
            helps build AI for 200M+ Nigerians.
          </p>
          
          <div className="mt-10 flex justify-center">
            <Link 
              href="/contribute" 
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/50 transition hover:bg-violet-500 hover:shadow-violet-400/50"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Band with Split Image */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A free, open platform for community-led data creation
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Voice assistants today support fewer than 1% of the world's languages. They regularly under-represent people of colour and marginalised accents. We're here to change that by making it easy for people like you to share your voice.
            </p>
            <div className="mt-8 flex gap-8">
              <div>
                <div className="text-3xl font-bold text-violet-600">4</div>
                <div className="text-sm text-slate-500">Nigerian Languages</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-violet-600">200M+</div>
                <div className="text-sm text-slate-500">People Represented</div>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1738&auto=format&fit=crop" 
              alt="Woman recording audio" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <s.icon className="mx-auto mb-3 h-8 w-8 text-violet-600" />
              <div className="text-4xl font-bold text-slate-900">{s.value}{s.suffix || ""}</div>
              <div className="mt-1 text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contribution Modes with Image Overlays */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Ways to contribute</h2>
            <p className="mt-4 text-lg text-slate-600">Pick whichever fits you. Every clip and every sentence makes the dataset richer.</p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Speak Card */}
            <Link href="/contribute" className="group relative flex h-96 flex-col justify-end overflow-hidden rounded-2xl shadow-xl transition hover:shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1974&auto=format&fit=crop" 
                alt="Microphone" 
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
              <div className="relative p-8">
                <span className="inline-flex w-fit items-center rounded-full bg-violet-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">Speak</span>
                <h3 className="mt-4 text-2xl font-bold text-white">Read sentences aloud</h3>
                <p className="mt-2 text-sm text-slate-200">Contribute to the most diverse public speech dataset by reading curated prompts in your language.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-300">
                  Start speaking <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Type Card */}
            <Link href="/contribute" className="group relative flex h-96 flex-col justify-end overflow-hidden rounded-2xl shadow-xl transition hover:shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1974&auto=format&fit=crop" 
                alt="Keyboard typing" 
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
              <div className="relative p-8">
                <span className="inline-flex w-fit items-center rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">Type</span>
                <h3 className="mt-4 text-2xl font-bold text-white">Answer prompts</h3>
                <p className="mt-2 text-sm text-slate-200">Respond to open prompts to build datasets for organic, colloquial contexts. Perfect for code-switching.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
                  Start typing <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
