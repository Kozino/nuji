import Link from "next/link";
import { Mic } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-10 text-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-500 text-white">
            <Mic className="h-4 w-4" />
          </span>
          nuji
        </Link>
        <p className="text-sm text-slate-500">Built for the people. Powered by their voice. 🇳🇬</p>
      </div>
    </footer>
  );
}
