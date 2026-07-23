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
    <section className="min-h-[80vh] bg-slate-900 text-white">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center">
          <Trophy className="mx-auto h-8 w-8 text-amber-400" />
          <h1 className="mt-3 text-3xl font-bold">Live Leaderboard</h1>
          <p className="mt-2 text-slate-300">Represent your state. Climb the ranks.</p>
        </div>
        
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
          {leaders.length === 0 && (
            <div className="bg-white/5 px-6 py-8 text-center text-slate-400">Loading leaderboard...</div>
          )}
          {leaders.map((row, i) => (
            <div key={row.state} className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? "bg-white/5" : "bg-white/0"}`}>
              <div className="flex items-center gap-4">
                <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${
                  row.rank === 1 ? "bg-amber-400 text-slate-900" :
                  row.rank === 2 ? "bg-slate-300 text-slate-900" :
                  row.rank === 3 ? "bg-amber-700 text-white" :
                  "bg-white/10 text-white"
                }`}>
                  {row.rank}
                </span>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="font-semibold">{row.state}</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-slate-400">{row.contributors} contributors</span>
                <span className="font-bold text-amber-400">{row.points.toLocaleString()} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
