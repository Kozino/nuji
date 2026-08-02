const NIGERIA_PATH =
  "M70,60 L160,40 L260,35 L340,45 L400,60 L430,50 L460,90 L440,112 L462,150 " +
  "L446,190 L462,228 L430,258 L440,300 L400,330 L412,368 L372,398 L332,430 " +
  "L292,420 L250,436 L210,415 L170,400 L140,380 L108,360 L88,320 L68,280 " +
  "L58,230 L54,180 L60,130 L65,90 Z";

const CITIES = [
  { name: "Kano", x: 335, y: 108 },
  { name: "Abuja", x: 260, y: 218 },
  { name: "Lagos", x: 108, y: 362 },
  { name: "Enugu", x: 345, y: 328 },
];

const REGIONS = [
  { code: "ha", name: "Hausa", speakers: "63M+ speakers", color: "#B8562F", label: { x: 500, y: 90 }, anchor: { x: 400, y: 90 } },
  { code: "yo", name: "Yoruba", speakers: "45M+ speakers", color: "#0E6B49", label: { x: -10, y: 380 }, anchor: { x: 110, y: 370 } },
  { code: "ig", name: "Igbo", speakers: "44M+ speakers", color: "#D9A62E", label: { x: 500, y: 380 }, anchor: { x: 395, y: 350 } },
];

export function NigeriaMap() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <svg viewBox="-40 0 580 480" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="nigeriaClip">
            <path d={NIGERIA_PATH} />
          </clipPath>
        </defs>

        {/* base silhouette */}
        <path d={NIGERIA_PATH} fill="#FFFFFF" stroke="#181C19" strokeWidth="2" strokeLinejoin="round" />

        {/* three broad language regions, clipped to the silhouette */}
        <g clipPath="url(#nigeriaClip)">
          <rect x="0" y="0" width="600" height="245" fill="#B8562F" opacity="0.85" />
          <rect x="0" y="245" width="270" height="260" fill="#0E6B49" opacity="0.85" />
          <rect x="270" y="245" width="330" height="260" fill="#D9A62E" opacity="0.85" />
          {/* faint diagonal texture across the whole country representing Pidgin, spoken nationwide */}
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={i} x1={-100 + i * 30} y1="0" x2={-100 + i * 30 + 480} y2="480" stroke="#181C19" strokeWidth="1" opacity="0.08" />
          ))}
        </g>

        <path d={NIGERIA_PATH} fill="none" stroke="#181C19" strokeWidth="2.5" strokeLinejoin="round" />

        {/* city markers */}
        {CITIES.map((c) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r="4" fill="#F7F3E9" stroke="#181C19" strokeWidth="1.5" />
            <text x={c.x} y={c.y - 9} textAnchor="middle" fill="#181C19" style={{ font: "600 10px var(--font-plex-mono), monospace" }}>
              {c.name}
            </text>
          </g>
        ))}

        {/* region labels with leader lines */}
        {REGIONS.map((r) => (
          <g key={r.code}>
            <line x1={r.anchor.x} y1={r.anchor.y} x2={r.label.x} y2={r.label.y} stroke="#181C19" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
            <rect x={r.label.x - (r.code === "yo" ? 0 : 88)} y={r.label.y - 16} width="88" height="34" rx="8" fill="#FFFFFF" stroke="#E4DCC8" />
            <circle cx={r.label.x - (r.code === "yo" ? -12 : 76)} cy={r.label.y - 4} r="4" fill={r.color} />
            <text x={r.label.x - (r.code === "yo" ? -22 : 66)} y={r.label.y - 0.5} fill="#181C19" style={{ font: "700 11px var(--font-zilla), Georgia, serif" }}>
              {r.name}
            </text>
            <text x={r.label.x - (r.code === "yo" ? -22 : 66)} y={r.label.y + 12} fill="#181C19" opacity="0.5" style={{ font: "500 8px var(--font-plex-mono), monospace" }}>
              {r.speakers}
            </text>
          </g>
        ))}
      </svg>

      <p className="mx-auto mt-3 max-w-md text-center text-xs leading-5 text-ink/40">
        A simplified, illustrative view of where each language is historically rooted &mdash; Nigerian Pidgin (shown as the
        diagonal weave) is spoken and understood nationwide, cutting across every region.
      </p>
    </div>
  );
}
