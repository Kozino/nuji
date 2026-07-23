"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Mic, Square, Type, CheckCircle2, SkipForward, Loader2, ArrowLeft, Send } from "lucide-react";

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
        <h1 className="text-2xl font-bold text-slate-900">No language selected</h1>
        <p className="mt-2 text-slate-500">Please go back and select a language.</p>
        <Link href="/" className="mt-6 flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-6">
        
        {/* Top Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-4">
            <div className="inline-flex rounded-lg bg-white p-1 shadow-sm border border-slate-200">
              <button onClick={() => setMode("speak")} className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-semibold transition ${mode === "speak" ? "bg-violet-600 text-white" : "text-slate-500"}`}>
                <Mic className="h-4 w-4" /> Speak
              </button>
              <button onClick={() => setMode("type")} className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-semibold transition ${mode === "type" ? "bg-violet-600 text-white" : "text-slate-500"}`}>
                <Type className="h-4 w-4" /> Type
              </button>
            </div>
            <select
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Main Prompt Card (Mozilla Style) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
          <div className="min-h-[150px] flex items-center justify-center text-center">
            <p className="text-3xl font-medium leading-relaxed text-slate-900">{prompt}</p>
          </div>
          
          <p className="mt-4 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
            {mode === "speak" ? "Read this aloud, clearly and naturally" : "Type how you'd actually say this in real life"}
          </p>
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col items-center">
          {mode === "speak" && (
            <>
              {phase === "idle" && (
                <button onClick={startRecording} className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-500/30 transition hover:scale-105">
                  <Mic className="h-8 w-8" />
                </button>
              )}
              {phase === "recording" && (
                <button onClick={stopRecording} className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 transition hover:scale-105">
                  <Square className="h-8 w-8" />
                </button>
              )}
              {phase === "recorded" && (
                <div className="flex items-center gap-4">
                  <button onClick={startRecording} className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 hover:bg-slate-50">
                    <Mic className="h-6 w-6" />
                  </button>
                  <button onClick={submit} className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition hover:scale-105">
                    <CheckCircle2 className="h-8 w-8" />
                  </button>
                </div>
              )}
              {phase === "submitting" && (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}
              {phase === "done" && (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-10 w-10" />
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
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-lg focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <div className="mt-6 flex justify-center">
                <button
                  onClick={submit}
                  disabled={!typed.trim() || phase === "submitting"}
                  className="flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-violet-700 disabled:opacity-40"
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
            <button onClick={nextPrompt} className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-slate-600">
              <SkipForward className="h-4 w-4" /> Skip this sentence
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
