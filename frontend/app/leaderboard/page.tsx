"use client";
import { useState, useEffect } from "react";
import { Trophy, MapPin } from "lucide-react";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/contributions/leaderboard`)
      .then(res => res.json())
      .then(data => setLeaders(data))
      .catch(() => {
        setLeaders([
          { rank: 1, state: "Lagos", points: 2840, contributors: 412 },
          { rank: 2, state: "Abuja FCT", points: 2105, contributors: 287 },
          { rank: 3, state: "Kano", points: 1872, contributors: 341 },
          { rank: 4, state: "Rivers", points: 1540, contributors: 198 },
        ]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <div className="relative isolate overflow-hidden bg-slate-900 py-24">
        <img 
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" 
          alt="Celebration" 
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Trophy className="mx-auto h-12 w-12 text-amber-400" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Live Leaderboard</h1>
          <p className="mt-4 text-lg text-slate-300">Represent your state. Climb the ranks. Build the future of Nigerian AI.</p>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {leaders.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-400">Loading leaderboard...</div>
          )}
          {leaders.map((row, i) => (
            <div key={row.state} className={`flex items-center justify-between px-6 py-5 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} border-b border-slate-100 last:border-b-0`}>
              <div className="flex items-center gap-4">
                <span className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${
                  row.rank === 1 ? "bg-amber-400 text-slate-900" :
                  row.rank === 2 ? "bg-slate-300 text-slate-900" :
                  row.rank === 3 ? "bg-amber-700 text-white" :
                  "bg-slate-100 text-slate-500"
                }`}>
                  {row.rank}
                </span>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-slate-400" />
                  <span className="text-lg font-semibold text-slate-900">{row.state}</span>
                </div>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <span className="hidden text-slate-500 sm:block">{row.contributors} clips</span>
                <span className="w-24 text-right text-lg font-bold text-violet-600">{row.points.toLocaleString()} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
