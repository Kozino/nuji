"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Mic, Square, Type, CheckCircle2, SkipForward, Loader2, ArrowLeft, Send, Volume2 } from "lucide-react";

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
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-zilla text-2xl font-bold text-slate-900">No language selected</h1>
        <p className="mt-2 text-slate-500">Please go back and select a language.</p>
        <Link href="/" className="mt-6 flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-6">
        
        {/* Top Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-purple-700">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-4">
            {/* Mozilla Style Tabs */}
            <div className="inline-flex rounded-lg bg-white p-1 shadow-sm border border-slate-200">
              <button onClick={() => setMode("speak")} className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-semibold transition ${mode === "speak" ? "bg-purple-600 text-white" : "text-slate-500"}`}>
                <Mic className="h-4 w-4" /> Speak
              </button>
              <button onClick={() => setMode("type")} className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-semibold transition ${mode === "type" ? "bg-purple-600 text-white" : "text-slate-500"}`}>
                <Type className="h-4 w-4" /> Type
              </button>
            </div>
            <select
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Main Prompt Card (Mozilla Style) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-xl">
          <div className="min-h-[160px] flex items-center justify-center text-center">
            <p className="font-zilla text-3xl font-medium leading-relaxed text-slate-900 sm:text-4xl">{prompt}</p>
          </div>
          
          <p className="mt-4 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
            {mode === "speak" ? "Please read this aloud, clearly and naturally" : "Type how you'd actually say this in real life"}
          </p>
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col items-center">
          {mode === "speak" && (
            <>
              {/* Massive Mozilla Record Button */}
              {phase === "idle" && (
                <button onClick={startRecording} className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-500/40 transition hover:scale-105 hover:bg-purple-700">
                  <Mic className="h-10 w-10" />
                </button>
              )}
              {phase === "recording" && (
                <button onClick={stopRecording} className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/40 transition hover:scale-105">
                  <Square className="h-10 w-10" />
                </button>
              )}
              {phase === "recorded" && (
                <div className="flex items-center gap-6">
                  <button onClick={startRecording} className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 hover:bg-slate-50">
                    <Mic className="h-7 w-7" />
                  </button>
                  <button onClick={submit} className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 transition hover:scale-105">
                    <CheckCircle2 className="h-10 w-10" />
                  </button>
                </div>
              )}
              {phase === "submitting" && (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                  <Loader2 className="h-10 w-10 animate-spin" />
                </div>
              )}
              {phase === "done" && (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 ring-1 ring-green-500">
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
                placeholder={`Type your response in ${selectedLang}…`}
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <div className="mt-6 flex justify-center">
                <button
                  onClick={submit}
                  disabled={!typed.trim() || phase === "submitting"}
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700 disabled:opacity-40"
                >
                  {phase === "submitting" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
                  ) : (
                    <><Send className="h-4 w-4" /> Submit</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Skip Button */}
        {(phase === "idle" || phase === "recorded") && (
          <div className="mt-8 flex justify-center">
            <button onClick={nextPrompt} className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-purple-700">
              <SkipForward className="h-4 w-4" /> Skip this sentence
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
