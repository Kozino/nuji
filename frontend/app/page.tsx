"use client";
import Link from "next/link";
import { ArrowRight, Mic, Type as TypeIcon, Users, AudioLines, Globe2 } from "lucide-react";
import { SoundMark, WaveformDivider } from "@/components/SoundMark";
import { LANGUAGES, PROMPTS } from "@/lib/languages";

const STATS = [
  { icon: Globe2, value: "4", label: "Languages" },
  { icon: Users, value: "0", label: "Contributors" },
  { icon: AudioLines, value: "0", suffix: "hrs", label: "Audio recorded" },
];

export default function LandingPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="adire-pattern absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left: copy */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {LANGUAGES.map((l) => (
                <span
                  key={l.code}
                  className="rounded-full border border-line bg-white px-3 py-1 font-plex text-xs font-medium text-ink/60"
                >
                  {l.name}
                </span>
              ))}
            </div>

            <h1 className="font-zilla mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Technology that speaks your language.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/65">
              Not textbook Igbo. Not formal Yoruba. The way you actually talk &mdash; at the market, with friends,
              on the street. Every word you contribute helps build AI for 200M+ Nigerians.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contribute"
                className="inline-flex items-center gap-2 rounded-xl bg-forest px-7 py-3.5 text-base font-semibold text-paper shadow-lg shadow-forest/20 transition hover:bg-forest-dark"
              >
                Get Started <ArrowRight className="h-[1.125rem] w-[1.125rem]" />
              </Link>
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-7 py-3.5 text-base font-semibold text-ink transition hover:border-forest/40"
              >
                See the leaderboard
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-line pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-plex text-2xl font-semibold text-ink">
                    {s.value}
                    <span className="text-gold">{s.suffix || ""}</span>
                  </div>
                  <div className="mt-0.5 text-xs font-medium uppercase tracking-wider text-ink/45">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1734255026082-82fdc81991f0?w=1200&auto=format&fit=crop&q=80"
                alt="A tomato and pepper seller arranging fresh produce at Bodija Market in Ibadan, Nigeria"
                className="h-[26rem] w-full object-cover sm:h-[30rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-forest/10" />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-paper">
                    <Mic className="h-[1.125rem] w-[1.125rem]" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-plex text-xs font-semibold text-ink">Recording &middot; Igbo</p>
                    <p className="truncate text-xs text-ink/50">&ldquo;Kedu ka ị dị taa?&rdquo;</p>
                  </div>
                  <div className="ml-auto flex h-5 items-end gap-0.5">
                    {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
                      <span
                        key={i}
                        className="wave-bar w-1 rounded-full bg-gold"
                        style={{ height: `${h * 20}px`, animationDelay: `${i * 0.12}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <span className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gold/25 blur-2xl" />
            <span className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-forest/15 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Mission band */}
      <section className="border-b border-line bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-zilla text-2xl font-bold text-ink sm:text-3xl">
            A free, open platform for community-led data creation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ink/60">
            Voice assistants today support fewer than 1% of the world&rsquo;s languages. We&rsquo;re here to change
            that by making it easy for people like you to share your voice &mdash; in the language you actually
            grew up speaking.
          </p>
        </div>
      </section>

      {/* Language showcase */}
      <section className="border-b border-line bg-paper py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-plex text-xs font-semibold uppercase tracking-wider text-forest">Four languages, one dataset</p>
              <h2 className="font-zilla mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Hear what people are already saying
              </h2>
            </div>
            <WaveformDivider className="hidden h-5 w-28 text-gold sm:block" />
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LANGUAGES.map((l) => (
              <div
                key={l.code}
                className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-1 w-10 rounded-full bg-gold" />
                <p className="font-zilla mt-5 text-xl font-bold text-ink">{l.name}</p>
                <p className="mt-0.5 font-plex text-xs text-ink/40">{l.native}</p>
                <p className="mt-5 flex-1 border-t border-line pt-4 text-sm italic leading-6 text-ink/60">
                  &ldquo;{PROMPTS[l.code][0]}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to contribute */}
      <section className="border-b border-line bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-zilla text-3xl font-bold tracking-tight text-ink sm:text-4xl">Ways to contribute</h2>
            <p className="mt-4 text-lg text-ink/60">
              Pick whichever fits you. Every clip and every sentence makes the dataset richer.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <Link
              href="/contribute"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper p-8 transition hover:border-forest/50 hover:shadow-xl"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-forest-light px-3 py-1 text-xs font-semibold text-forest-dark">
                <Mic className="h-3.5 w-3.5" /> Speak
              </span>
              <h3 className="font-zilla mt-4 text-2xl font-bold text-ink">Read sentences aloud</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink/60">
                Contribute to the most diverse public speech dataset by reading curated prompts in your language.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                Start speaking <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
              <div className="pointer-events-none absolute -right-6 -bottom-6 flex h-24 items-end gap-1 opacity-10">
                {[0.3, 0.6, 0.9, 0.5, 0.8, 0.4, 0.7].map((h, i) => (
                  <span key={i} className="w-2.5 rounded-full bg-forest" style={{ height: `${h * 96}px` }} />
                ))}
              </div>
            </Link>

            <Link
              href="/contribute"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper p-8 transition hover:border-gold/60 hover:shadow-xl"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-light px-3 py-1 text-xs font-semibold text-gold-dark">
                <TypeIcon className="h-3.5 w-3.5" /> Type
              </span>
              <h3 className="font-zilla mt-4 text-2xl font-bold text-ink">Answer prompts</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink/60">
                Respond to open prompts to build datasets for organic, colloquial contexts. Perfect for code-switching.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark">
                Start typing <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
              <div className="pointer-events-none absolute -right-4 -bottom-4 font-plex text-7xl font-bold text-gold/10">
                Aa
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-ink py-24 text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="font-plex text-xs font-semibold uppercase tracking-wider text-gold">Why this matters</p>
            <h2 className="font-zilla mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Big tech trains on formal text. Nobody actually talks that way.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-paper/65">
              Igbo, Yoruba, Hausa and Pidgin are spoken every day by hundreds of millions of people, yet almost
              none of that everyday speech ever reaches the datasets that train modern AI. Nuji exists to close
              that gap &mdash; sentence by sentence, voice note by voice note, contributed by the community that
              actually speaks these languages.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <p className="font-plex text-xl font-semibold text-paper">&lt;1%</p>
                <p className="text-xs text-paper/50">of languages supported by voice AI today</p>
              </div>
              <div>
                <p className="font-plex text-xl font-semibold text-paper">200M+</p>
                <p className="text-xs text-paper/50">Nigerian speakers this dataset is built for</p>
              </div>
              <div>
                <p className="font-plex text-xl font-semibold text-paper">100%</p>
                <p className="text-xs text-paper/50">community-contributed, openly licensed</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-paper/10">
              <img
                src="https://images.unsplash.com/photo-1531299983330-093763e1d963?w=900&auto=format&fit=crop&q=80"
                alt="Portrait study of a man in Lagos, Nigeria"
                className="h-[26rem] w-full object-cover grayscale contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-forest mix-blend-color opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SoundMark className="mx-auto h-12 w-12" animated />
          <h2 className="font-zilla mt-6 text-3xl font-bold text-ink sm:text-4xl">Your voice is missing from the dataset.</h2>
          <p className="mt-4 text-base text-ink/60">It takes less than a minute to add the first sentence.</p>
          <Link
            href="/contribute"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-forest px-8 py-4 text-base font-semibold text-paper shadow-lg shadow-forest/20 transition hover:bg-forest-dark"
          >
            Contribute now <ArrowRight className="h-[1.125rem] w-[1.125rem]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
