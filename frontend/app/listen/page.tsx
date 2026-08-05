"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Play, Pause, ThumbsUp, ThumbsDown, SkipForward, ArrowLeft, Headphones, Loader2 } from "lucide-react";
import { PROMPTS } from "@/lib/languages";

export default function ListenPage() {
  const { selectedLang } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState<"idle" | "submitting" | "done">("idle");
  const [reviewed, setReviewed] = useState(0);
  const [clipText, setClipText] = useState(
    selectedLang ? PROMPTS[selectedLang][Math.floor(Math.random() * PROMPTS[selectedLang].length)] : ""
  );

  const nextClip = () => {
    if (!selectedLang) return;
    const prompts = PROMPTS[selectedLang];
    let next = prompts[Math.floor(Math.random() * prompts.length)];
    while (next === clipText && prompts.length > 1) next = prompts[Math.floor(Math.random() * prompts.length)];
    setClipText(next);
    setPlaying(false);
    setPhase("idle");
  };

  const vote = async (_verdict: "yes" | "no") => {
    setPhase("submitting");
    setTimeout(() => {
      setReviewed((n) => n + 1);
      setPhase("done");
      setTimeout(nextClip, 500);
    }, 500);
  };

  if (!selectedLang) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center bg-paper px-6 text-center">
        <h1 className="font-zilla text-2xl font-bold text-ink">No language selected</h1>
        <p className="mt-2 text-ink/50">Please go back and select a language.</p>
        <Link href="/" className="mt-6 flex items-center gap-2 rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-paper hover:bg-forest-dark">
          <ArrowLeft className="h-4 w-4" /> Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-paper py-12">
      <div className="mx-auto max-w-2xl px-6">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm font-medium text-ink/50 hover:text-forest">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5">
            <Headphones className="h-3.5 w-3.5 text-forest" />
            <span className="font-plex text-xs font-medium text-ink/60">{reviewed} clips reviewed this session</span>
          </div>
        </div>

        <div className="text-center">
          <p className="font-plex text-xs font-semibold uppercase tracking-wider text-forest">Listen &amp; validate</p>
          <h1 className="font-zilla mt-2 text-3xl font-bold text-ink">Does this sound right?</h1>
          <p className="mt-2 text-ink/55">Play the clip, then tell us if it matches the sentence below.</p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-line bg-white p-10 shadow-sm">
          <div className="adire-pattern absolute inset-0 opacity-30" />

          <div className="relative flex flex-col items-center">
            <button
              onClick={() => setPlaying((v) => !v)}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-forest text-paper shadow-lg shadow-forest/25 transition hover:scale-105 hover:bg-forest-dark"
            >
              {playing ? <Pause className="h-8 w-8" /> : <Play className="ml-1 h-8 w-8" />}
            </button>

            <div className="mt-6 flex h-6 items-end gap-1">
              {[0.3, 0.7, 1, 0.5, 0.9, 0.4, 0.65, 0.35].map((h, i) => (
                <span
                  key={i}
                  className={`w-1.5 rounded-full bg-gold ${playing ? "wave-bar" : ""}`}
                  style={{ height: `${h * 24}px`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            <p className="font-zilla mt-8 max-w-md text-center text-2xl font-medium leading-relaxed text-ink">
              {clipText}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-5">
          {phase === "submitting" && (
            <div className="flex items-center gap-2 text-sm text-ink/40">
              <Loader2 className="h-4 w-4 animate-spin" /> Recording your review&hellip;
            </div>
          )}
          {phase === "done" && (
            <div className="text-sm font-medium text-forest">Thanks! Loading the next clip&hellip;</div>
          )}

          {phase === "idle" && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => vote("no")}
                className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-clay/30 bg-white text-clay transition hover:border-clay hover:bg-clay/5"
                aria-label="Doesn't match"
              >
                <ThumbsDown className="h-6 w-6" />
              </button>
              <button
                onClick={() => vote("yes")}
                className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-forest/30 bg-white text-forest transition hover:border-forest hover:bg-forest/5"
                aria-label="Sounds right"
              >
                <ThumbsUp className="h-6 w-6" />
              </button>
            </div>
          )}

          {phase === "idle" && (
            <button onClick={nextClip} className="flex items-center gap-1 text-sm font-medium text-ink/40 hover:text-forest">
              <SkipForward className="h-4 w-4" /> Skip this clip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
