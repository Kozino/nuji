"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Mic, Square, Type, CheckCircle2, SkipForward, Loader2, ArrowLeft, Send } from "lucide-react";
import { PROMPTS, NIGERIAN_STATES } from "@/lib/languages";

export default function ContributePage() {
  const { selectedLang } = useLanguage();
  const [mode, setMode] = useState<"speak" | "type">("speak");
  const [prompt, setPrompt] = useState<string>("");
  const [phase, setPhase] = useState<"idle" | "recording" | "recorded" | "submitting" | "done">("idle");
  const [typed, setTyped] = useState("");
  const [userState, setUserState] = useState("Lagos");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!selectedLang) return;
    const prompts = PROMPTS[selectedLang];
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, [selectedLang]);

  const nextPrompt = () => {
    if (!selectedLang) return;
    const prompts = PROMPTS[selectedLang];
    let next = prompts[Math.floor(Math.random() * prompts.length)];
    while (next === prompt && prompts.length > 1) next = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(next);
    setPhase("idle");
    setTyped("");
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
      recorder.onstop = () => setPhase("recorded");
      recorder.start();
      mediaRecorderRef.current = recorder;
      setPhase("recording");
    } catch {
      alert("Microphone access denied. Please allow mic permissions.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

  const submit = async () => {
    setPhase("submitting");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contributions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: selectedLang, state: userState, type: mode }),
      });
      setPhase("done");
      setTimeout(() => { setPhase("idle"); nextPrompt(); }, 1200);
    } catch {
      alert("Failed to submit. Is the backend running?");
      setPhase("idle");
    }
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
      <div className="mx-auto max-w-3xl px-6">

        {/* Top bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm font-medium text-ink/50 hover:text-forest">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full bg-white p-1 shadow-sm border border-line">
              <button
                onClick={() => setMode("speak")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  mode === "speak" ? "bg-forest text-paper" : "text-ink/50"
                }`}
              >
                <Mic className="h-4 w-4" /> Speak
              </button>
              <button
                onClick={() => setMode("type")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  mode === "type" ? "bg-forest text-paper" : "text-ink/50"
                }`}
              >
                <Type className="h-4 w-4" /> Type
              </button>
            </div>
            <select
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
              className="rounded-full border border-line bg-white px-3.5 py-2 font-plex text-xs font-medium text-ink/70 focus:outline-none focus:ring-2 focus:ring-forest/40"
            >
              {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Prompt card */}
        <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-12 shadow-sm">
          <div className="adire-pattern absolute inset-0 opacity-30" />
          <div className="relative flex min-h-[140px] items-center justify-center text-center">
            <p className="font-zilla text-3xl font-medium leading-relaxed text-ink sm:text-4xl">{prompt}</p>
          </div>
          <p className="relative mt-4 text-center font-plex text-[11px] font-medium uppercase tracking-wider text-ink/35">
            {mode === "speak" ? "Please read this aloud, clearly and naturally" : "Type how you'd actually say this in real life"}
          </p>
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col items-center">
          {mode === "speak" && (
            <>
              {phase === "idle" && (
                <button
                  onClick={startRecording}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-forest text-paper shadow-lg shadow-forest/30 transition hover:scale-105 hover:bg-forest-dark"
                >
                  <Mic className="h-10 w-10" />
                </button>
              )}
              {phase === "recording" && (
                <button
                  onClick={stopRecording}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-clay text-paper shadow-lg shadow-clay/30 transition hover:scale-105"
                >
                  <Square className="h-10 w-10" />
                </button>
              )}
              {phase === "recorded" && (
                <div className="flex items-center gap-6">
                  <button
                    onClick={startRecording}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-white text-ink/60 hover:bg-paper"
                  >
                    <Mic className="h-7 w-7" />
                  </button>
                  <button
                    onClick={submit}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-forest text-paper shadow-lg shadow-forest/30 transition hover:scale-105"
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </button>
                </div>
              )}
              {phase === "submitting" && (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-line text-ink/40">
                  <Loader2 className="h-10 w-10 animate-spin" />
                </div>
              )}
              {phase === "done" && (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-forest-light text-forest ring-1 ring-forest/40">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
              )}
            </>
          )}

          {mode === "type" && (
            <div className="w-full max-w-xl">
              <textarea
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder={`Type your response in ${selectedLang}\u2026`}
                rows={4}
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-center text-lg focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              />
              <div className="mt-6 flex justify-center">
                <button
                  onClick={submit}
                  disabled={!typed.trim() || phase === "submitting"}
                  className="flex items-center gap-2 rounded-xl bg-forest px-8 py-3 text-sm font-semibold text-paper shadow-lg shadow-forest/20 transition hover:bg-forest-dark disabled:opacity-40"
                >
                  {phase === "submitting" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Submitting&hellip;</>
                  ) : (
                    <><Send className="h-4 w-4" /> Submit</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {(phase === "idle" || phase === "recorded") && (
          <div className="mt-8 flex justify-center">
            <button onClick={nextPrompt} className="flex items-center gap-1 text-sm font-medium text-ink/40 hover:text-forest">
              <SkipForward className="h-4 w-4" /> Skip this sentence
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
