"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Mic, Square, Type, CheckCircle2, SkipForward, Loader2, Volume2, ArrowLeft } from "lucide-react";

const PROMPTS: Record<string, string[]> = {
  ig: ["Kedu ka ị dị taa?", "Gwa m ihe ị na-eme taa.", "Ebee ka ị na-aga?"],
  yo: ["Bawo ni ọjọ́ rẹ?", "Sọ fún mi ní ẹ̀rín ìjàmbá rẹ.", "Níbo lo ń lọ?"],
  ha: ["Yaya ake yi yau?", "Faɗa min abin da kake yi yau.", "Ina za'a tafi?"],
  pi: ["How you dey today?", "Wetin you dey do?", "Where you dey go?"],
};

const NIGERIAN_STATES = ["Lagos", "Abuja FCT", "Kano", "Rivers", "Oyo", "Kaduna", "Enugu", "Delta"];

export default function ContributePage() {
  const { selectedLang } = useLanguage();
  const [mode, setMode] = useState<"speak" | "type">("speak");
  const [prompt, setPrompt] = useState<string>("");
  const [phase, setPhase] = useState<"idle" | "recording" | "recorded" | "submitting" | "done">("idle");
  const [typed, setTyped] = useState("");
  const [sessionPoints, setSessionPoints] = useState(0);
  const [userState, setUserState] = useState("Lagos");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!selectedLang) return;
    const prompts = PROMPTS[selectedLang];
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    setPhase("idle");
    setTyped("");
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
      setSessionPoints((p) => p + 10);
      setPhase("done");
      setTimeout(() => { setPhase("idle"); nextPrompt(); }, 1200);
    } catch {
      alert("Failed to submit. Is the backend running?");
      setPhase("idle");
    }
  };

  if (!selectedLang) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-slate-900">No language selected</h1>
        <p className="mt-2 text-slate-500">Please go back and select a language.</p>
        <Link href="/" className="mt-6 flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-4xl px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white" />
      
      <div className="relative">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Recording Booth</h1>
            <p className="text-sm text-slate-500">Read the sentence aloud, clearly and naturally.</p>
          </div>
          <select
            value={userState}
            onChange={(e) => setUserState(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl shadow-slate-200/50 backdrop-blur">
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex rounded-lg bg-slate-100 p-1">
              <button onClick={() => setMode("speak")} className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-semibold transition ${mode === "speak" ? "bg-white text-slate-900 shadow" : "text-slate-500"}`}>
                <Mic className="h-4 w-4" /> Speak
              </button>
              <button onClick={() => setMode("type")} className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-semibold transition ${mode === "type" ? "bg-white text-slate-900 shadow" : "text-slate-500"}`}>
                <Type className="h-4 w-4" /> Type
              </button>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {selectedLang.toUpperCase()} • +10 pts each
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-8 text-center">
            <p className="text-2xl font-medium leading-relaxed text-slate-900 md:text-3xl">{prompt}</p>
            <p className="mt-3 text-xs text-slate-400">
              {mode === "speak" ? "Read this aloud, clearly and naturally." : "Type how you'd actually say this in real life."}
            </p>
          </div>

          {mode === "speak" && (
            <div className="mt-6">
              <div className="flex h-16 items-center justify-center">
                {phase === "recording" ? (
                  <div className="flex h-16 items-center justify-center gap-[3px]">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <span key={i} className="w-[3px] rounded-full bg-gradient-to-t from-green-500 via-emerald-400 to-lime-300"
                        style={{ height: `${20 + Math.abs(Math.sin(i * 0.5)) * 60}%`, animation: `wave 1.1s ease-in-out ${i * 0.04}s infinite alternate` }} />
                    ))}
                    <style>{`@keyframes wave { 0% { transform: scaleY(0.3);} 100% { transform: scaleY(1);} }`}</style>
                  </div>
                ) : (
                  <div className="text-slate-300"><Mic className="h-8 w-8" /></div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-center gap-4">
                {phase === "idle" && (
                  <button onClick={startRecording} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:scale-105">
                    <Mic className="h-5 w-5" /> Record
                  </button>
                )}
                {phase === "recording" && (
                  <button onClick={stopRecording} className="flex items-center gap-2 rounded-full bg-red-500 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:scale-105">
                    <Square className="h-5 w-5" /> Stop
                  </button>
                )}
                {phase === "recorded" && (
                  <>
                    <button onClick={startRecording} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                      <Mic className="h-4 w-4" /> Re-record
                    </button>
                    <button onClick={submit} className="flex items-center gap-2 rounded-full bg-green-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:scale-105">
                      <CheckCircle2 className="h-5 w-5" /> Submit
                    </button>
                  </>
                )}
                {phase === "submitting" && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Loader2 className="h-5 w-5 animate-spin" /> Uploading…
                  </div>
                )}
                {phase === "done" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-6 w-6" /> +10 points!
                  </div>
                )}
                {(phase === "idle" || phase === "recorded") && (
                  <button onClick={nextPrompt} className="flex items-center gap-1 rounded-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-600">
                    <SkipForward className="h-4 w-4" /> Skip
                  </button>
                )}
              </div>

              {phase === "recorded" && chunksRef.current.length > 0 && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                  <Volume2 className="h-4 w-4" />
                  <audio controls src={URL.createObjectURL(new Blob(chunksRef.current, { type: "audio/webm" }))} className="h-8" />
                </div>
              )}
            </div>
          )}

          {mode === "type" && (
            <div className="mt-6">
              <textarea
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder={`Type your response in ${selectedLang}…`}
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={submit}
                  disabled={!typed.trim() || phase === "submitting"}
                  className="flex items-center gap-2 rounded-full bg-green-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                >
                  {phase === "submitting" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
                  ) : (
                    <><CheckCircle2 className="h-4 w-4" /> Submit</>
                  )}
                </button>
                <button onClick={nextPrompt} className="flex items-center gap-1 rounded-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-600">
                  <SkipForward className="h-4 w-4" /> Skip
                </button>
              </div>
            </div>
          )}

          {sessionPoints > 0 && (
            <p className="mt-6 text-center text-sm text-slate-500">
              You've earned <span className="font-bold text-emerald-600">{sessionPoints} points</span> this session.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
