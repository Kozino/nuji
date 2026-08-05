const WAVE_PATHS = {
  a: "M0,120 C240,180 480,60 720,120 C960,180 1200,60 1440,120 L1440,320 L0,320 Z",
  b: "M0,90 C180,150 360,30 540,90 C720,150 900,30 1080,90 C1260,150 1350,60 1440,100 L1440,320 L0,320 Z",
  c: "M0,60 C300,180 600,0 900,140 C1100,220 1300,80 1440,150 L1440,320 L0,320 Z",
} as const;

type WaveKey = keyof typeof WAVE_PATHS;

interface Layer {
  path: WaveKey;
  color: string;
  opacity: number;
  flip?: boolean;
  translateY?: number;
}

export type WaveMood = "hero" | "bold" | "calm" | "climax" | "minimal" | "showcase";

const MOODS: Record<WaveMood, Layer[]> = {
  // Homepage / About hero — widest amplitude, three interleaved colors
  hero: [
    { path: "a", color: "#0E6B49", opacity: 0.15 },
    { path: "b", color: "#1C8C74", opacity: 0.12, translateY: 34 },
    { path: "c", color: "#D9A62E", opacity: 0.09, translateY: 68 },
  ],
  // Stats band, "ways to contribute" — present but restrained, single dominant hue
  bold: [
    { path: "b", color: "#0E6B49", opacity: 0.14 },
    { path: "a", color: "#D9A62E", opacity: 0.07, translateY: 26, flip: true },
  ],
  // Language showcase — gold-forward, distinct curve from hero so the page doesn't repeat
  showcase: [
    { path: "c", color: "#D9A62E", opacity: 0.13, flip: true },
    { path: "a", color: "#1C8C74", opacity: 0.07, translateY: 40 },
  ],
  // Mission / reading-heavy sections — barely-there texture, protects legibility
  calm: [{ path: "a", color: "#0E6B49", opacity: 0.05 }],
  // Dark climax sections ("why this matters", data responsibility, admin) — highest contrast
  climax: [
    { path: "c", color: "#1C8C74", opacity: 0.22 },
    { path: "b", color: "#D9A62E", opacity: 0.14, translateY: 30, flip: true },
    { path: "a", color: "#0E6B49", opacity: 0.18, translateY: 55 },
  ],
  // Task-focused pages (Speak, Listen, Leaderboard) — quiet, single low layer
  minimal: [{ path: "b", color: "#0E6B49", opacity: 0.04 }],
};

export function WaveBackground({
  mood = "calm",
  className = "",
}: {
  mood?: WaveMood;
  className?: string;
}) {
  const layers = MOODS[mood];
  if (layers.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {layers.map((layer, i) => (
        <svg
          key={i}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="wave-layer absolute inset-x-0 bottom-0 h-full w-full"
          style={{
            transform: `${layer.flip ? "scaleY(-1) " : ""}translateY(${layer.translateY || 0}px)`,
            animationDelay: `${i * -7}s`,
          }}
        >
          <path d={WAVE_PATHS[layer.path]} fill={layer.color} opacity={layer.opacity} />
        </svg>
      ))}
    </div>
  );
}
