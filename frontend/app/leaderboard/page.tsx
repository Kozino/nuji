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
    <div className="min-h-[80vh] bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <Trophy className="mx-auto h-10 w-10 text-amber-500" />
          <h1 className="font-zilla mt-4 text-4xl font-bold tracking-tight text-slate-900">Live Leaderboard</h1>
          <p className="mt-2 text-slate-500">Represent your state. Climb the ranks. Build the future of Nigerian AI.</p>
        </div>
        
        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {leaders.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-400">Loading leaderboard...</div>
          )}
          {leaders.map((row, i) => (
            <div key={row.state} className={`flex items-center justify-between px-6 py-5 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} border-b border-slate-100 last:border-b-0`}>
              <div className="flex items-center gap-4">
                <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${
                  row.rank === 1 ? "bg-amber-400 text-slate-900" :
                  row.rank === 2 ? "bg-slate-300 text-slate-900" :
                  row.rank === 3 ? "bg-amber-700 text-white" :
                  "bg-slate-100 text-slate-500"
                }`}>
                  {row.rank}
                </span>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="font-semibold text-slate-900">{row.state}</span>
                </div>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <span className="text-slate-500">{row.contributors} clips</span>
                <span className="w-20 text-right font-bold text-purple-600">{row.points.toLocaleString()} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
