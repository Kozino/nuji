import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mic, Users, Sparkles, ShieldCheck, Lock, UserX, MapPin, Globe2 } from "lucide-react";
import { LANGUAGES } from "@/lib/languages";
import { WaveformDivider } from "@/components/SoundMark";

const DATA_POINTS = [
  { icon: ShieldCheck, text: "Your voice recordings are used only to train Nigerian language AI models" },
  { icon: Lock, text: "We never sell your data to third parties" },
  { icon: UserX, text: "You can choose to contribute anonymously \u2014 no real name required" },
  { icon: MapPin, text: "Only your state and age range are collected \u2014 no personal details" },
  { icon: Globe2, text: "The resulting AI models will be open and accessible to all Nigerians" },
];

export default function AboutPage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="adire-pattern absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center">
          <Image src="/brand/nuji-logo-full.png" alt="Nuji" width={680} height={900} className="mx-auto h-32 w-auto sm:h-40" />
          <h1 className="font-zilla mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Technology that speaks your language
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-ink/60">
            Why should AI only work for a few of the world&rsquo;s languages? Our language is our story, our
            community, our culture. Nuji is building the datasets we want to see in the world.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="border-b border-line bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-center font-plex text-xs font-semibold uppercase tracking-wider text-clay">The problem</p>
          <h2 className="font-zilla mt-3 text-center text-3xl font-bold text-ink">
            200 million voices, missing from the data
          </h2>
          <p className="mt-8 leading-7 text-ink/65">
            Over 200 million Nigerians speak Igbo, Yoruba, Hausa, and Pidgin every single day. Yet when they try
            to use AI assistants, those tools barely understand them &mdash; because they were trained almost
            entirely on English and a handful of other languages.
          </p>
          <p className="mt-5 leading-7 text-ink/65">
            The data used by big AI companies doesn&rsquo;t include the way Nigerians actually speak &mdash; the
            code-switching, the street talk, the market language, the informal everyday conversations that make
            our languages alive. That&rsquo;s the gap Nuji is filling.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-line bg-paper py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="font-zilla text-3xl font-bold text-ink">How it works</h2>
            <WaveformDivider className="mx-auto mt-4 h-4 w-24 text-gold" />
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              { icon: Mic, step: "01", title: "You contribute", copy: "You respond to everyday prompts in your natural language \u2014 Igbo, Yoruba, Hausa, Pidgin, or any mix. Speak, type, or both." },
              { icon: Users, step: "02", title: "Community verifies", copy: "Other contributors listen and verify your recording sounds natural. This peer review ensures high quality data." },
              { icon: Sparkles, step: "03", title: "Data trains AI", copy: "Verified contributions are used to fine-tune language models that understand real Nigerian speech \u2014 not textbook language." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-line bg-white p-7">
                <span className="font-plex text-xs font-semibold text-gold">{s.step}</span>
                <s.icon className="mt-3 h-6 w-6 text-forest" />
                <h3 className="font-zilla mt-3 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/55">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The languages */}
      <section className="border-b border-line bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="font-plex text-xs font-semibold uppercase tracking-wider text-forest">The languages</p>
            <h2 className="font-zilla mt-2 text-3xl font-bold text-ink">
              We&rsquo;re starting with four &mdash; and expanding from there
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink/55">
              Nigeria&rsquo;s four most widely spoken languages come first. More are on the way.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LANGUAGES.map((l) => (
              <div key={l.code} className="rounded-2xl border border-line bg-paper p-6 text-center">
                <p className="font-zilla text-xl font-bold text-ink">{l.name}</p>
                <p className="mt-1 font-plex text-xs text-forest">
                  {{ ig: "44M+", yo: "45M+", ha: "63M+", pi: "75M+" }[l.code]} speakers
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data responsibility */}
      <section className="border-b border-line bg-ink py-20 text-paper">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-center font-plex text-xs font-semibold uppercase tracking-wider text-gold">Your data, used responsibly</p>
          <h2 className="font-zilla mt-3 text-center text-3xl font-bold">Built with trust at the core</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {DATA_POINTS.map((d) => (
              <div key={d.text} className="flex items-start gap-3.5 rounded-xl border border-paper/10 bg-white/[0.03] p-5">
                <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="text-sm leading-6 text-paper/75">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-b border-line bg-white py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1531299983330-093763e1d963?w=900&auto=format&fit=crop&q=80"
              alt="Portrait study in Lagos, Nigeria"
              className="h-[24rem] w-full object-cover grayscale contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-forest mix-blend-color opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </div>
          <div>
            <p className="font-plex text-xs font-semibold uppercase tracking-wider text-forest">Who is building Nuji?</p>
            <h2 className="font-zilla mt-3 text-3xl font-bold leading-tight text-ink">
              A Nigerian founder. Building what should exist.
            </h2>
            <p className="mt-5 leading-7 text-ink/65">
              Nuji is built by a Nigerian who speaks Igbo, Yoruba, Pidgin and French &mdash; and understands
              firsthand what it means to be left out of the AI revolution. This is not an academic project. This
              is infrastructure for 200 million people who deserve AI that speaks their language.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper py-20 text-center">
        <h2 className="font-zilla text-3xl font-bold text-ink">Ready to contribute?</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/60">
          Every sentence you speak or type brings Nigerian language AI one step closer to reality.
        </p>
        <Link
          href="/contribute"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-forest px-8 py-4 text-base font-semibold text-paper shadow-lg shadow-forest/20 transition hover:bg-forest-dark"
        >
          Start Contributing <ArrowRight className="h-[1.125rem] w-[1.125rem]" />
        </Link>
      </section>
    </div>
  );
}
