import Link from "next/link";
import { Github } from "lucide-react";
import { SoundMark } from "./SoundMark";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper/70">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5 font-zilla text-xl font-bold text-paper">
              <SoundMark className="h-8 w-8" />
              nuji
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              An open, community-led dataset of everyday Nigerian speech &mdash; built by the people who actually speak it.
            </p>
          </div>

          <div>
            <p className="font-plex text-xs font-semibold uppercase tracking-wider text-gold">Platform</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/contribute" className="hover:text-paper">Contribute your voice</Link></li>
              <li><Link href="/leaderboard" className="hover:text-paper">State leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-plex text-xs font-semibold uppercase tracking-wider text-gold">Languages</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/contribute" className="hover:text-paper">Igbo</Link></li>
              <li><Link href="/contribute" className="hover:text-paper">Yoruba</Link></li>
              <li><Link href="/contribute" className="hover:text-paper">Hausa</Link></li>
              <li><Link href="/contribute" className="hover:text-paper">Nigerian Pidgin</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-plex text-xs font-semibold uppercase tracking-wider text-gold">Project</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/Kozino/nuji"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-paper"
                >
                  <Github className="h-3.5 w-3.5" /> Source on GitHub
                </a>
              </li>
              <li className="text-paper/40">Open dataset, open license</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-paper/10 pt-6 text-xs text-paper/40 sm:flex-row">
          <span>Built for the people. Powered by their voice.</span>
          <span>🇳🇬 Made for 200M+ Nigerian speakers</span>
        </div>
      </div>
    </footer>
  );
}
