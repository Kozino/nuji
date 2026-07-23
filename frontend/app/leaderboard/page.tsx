"use client";
import { useState, useEffect } from "react";
import { Trophy, MapPin } from "lucide-react";
import { WaveformDivider } from "@/components/SoundMark";

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
    <div className="min-h-[80vh] bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <Trophy className="mx-auto h-9 w-9 text-gold" />
          <h1 className="font-zilla mt-4 text-4xl font-bold tracking-tight text-ink">Live Leaderboard</h1>
          <p className="mt-2 text-ink/50">Represent your state. Climb the ranks. Build the future of Nigerian AI.</p>
          <WaveformDivider className="mx-auto mt-6 h-4 w-24 text-gold" />
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          {leaders.length === 0 && (
            <div className="px-6 py-12 text-center text-ink/35">Loading leaderboard&hellip;</div>
          )}
          {leaders.map((row, i) => (
            <div
              key={row.state}
              className={`flex items-center justify-between px-6 py-5 ${i % 2 === 0 ? "bg-white" : "bg-paper"} border-b border-line last:border-b-0`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full font-plex text-sm font-bold ${
                    row.rank === 1 ? "bg-gold text-ink" :
                    row.rank === 2 ? "bg-line text-ink/70" :
                    row.rank === 3 ? "bg-clay text-paper" :
                    "bg-paper text-ink/40 border border-line"
                  }`}
                >
                  {row.rank}
                </span>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-ink/35" />
                  <span className="font-semibold text-ink">{row.state}</span>
                </div>
              </div>
              <div className="flex items-center gap-8 font-plex text-sm">
                <span className="text-ink/45">{row.contributors} clips</span>
                <span className="w-24 text-right font-bold text-forest">{row.points.toLocaleString()} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
