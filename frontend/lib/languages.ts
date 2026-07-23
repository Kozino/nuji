export function SoundMark({ className = "h-5 w-5", animated = false }: { className?: string; animated?: boolean }) {
  const bars = [0.4, 0.85, 1, 0.6, 0.3];
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="40" height="40" rx="10" fill="currentColor" className="text-forest" />
      <g>
        {bars.map((h, i) => {
          const barW = 3.4;
          const gap = 2.4;
          const totalW = bars.length * barW + (bars.length - 1) * gap;
          const startX = (40 - totalW) / 2 + i * (barW + gap);
          const barH = h * 20;
          return (
            <rect
              key={i}
              x={startX}
              y={20 - barH / 2}
              width={barW}
              height={barH}
              rx={1.7}
              fill="#F7F3E9"
              className={animated ? "wave-bar" : ""}
              style={animated ? { animationDelay: `${i * 0.12}s` } : undefined}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function WaveformDivider({ className = "h-4 w-24 text-gold" }: { className?: string }) {
  const bars = [0.3, 0.6, 1, 0.7, 0.45, 0.9, 0.5, 0.25];
  return (
    <svg viewBox="0 0 100 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {bars.map((h, i) => {
        const barW = 5;
        const gap = 6.4;
        const x = i * (barW + gap);
        const barH = h * 16;
        return <rect key={i} x={x} y={10 - barH / 2} width={barW} height={barH} rx={2} fill="currentColor" />;
      })}
    </svg>
  );
}
