"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Front-end only: wire this up to your real auth endpoint.
    setTimeout(() => setSubmitting(false), 900);
  };

  return (
    <div className="admin-bg relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-16">
      <div className="adire-pattern absolute inset-0 opacity-[0.06]" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-paper/40 transition hover:text-paper/70">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>

        <div className="rounded-2xl border border-paper/10 bg-white/[0.03] p-9 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col items-center text-center">
            <Image src="/brand/nuji-logo-transparent.png" alt="Nuji" width={124} height={112} className="h-16 w-auto" />
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-plex text-[11px] font-medium uppercase tracking-wider text-gold">
              <ShieldCheck className="h-3 w-3" /> Admin Console
            </span>
            <p className="mt-3 text-sm text-paper/45">Sign in to manage contributions, review data and moderate the leaderboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <label className="block">
              <span className="mb-1.5 block font-plex text-[11px] font-medium uppercase tracking-wider text-paper/40">
                Email
              </span>
              <div className="flex items-center gap-2.5 rounded-xl border border-paper/15 bg-paper/[0.04] px-4 py-3 transition focus-within:border-gold/50">
                <Mail className="h-4 w-4 shrink-0 text-paper/35" />
                <input
                  type="email"
                  required
                  placeholder="admin@nuji.app"
                  className="w-full bg-transparent text-sm text-paper placeholder:text-paper/25 focus:outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-plex text-[11px] font-medium uppercase tracking-wider text-paper/40">
                Password
              </span>
              <div className="flex items-center gap-2.5 rounded-xl border border-paper/15 bg-paper/[0.04] px-4 py-3 transition focus-within:border-gold/50">
                <Lock className="h-4 w-4 shrink-0 text-paper/35" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full bg-transparent text-sm text-paper placeholder:text-paper/25 focus:outline-none"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="shrink-0 text-paper/35 hover:text-paper/60">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 text-paper/45">
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-paper/30 bg-transparent accent-gold" />
                Remember me
              </label>
              <a href="#" className="font-medium text-gold hover:text-gold-dark">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#E9C77A] via-gold to-[#9C7530] px-6 py-3.5 text-sm font-bold text-ink shadow-lg shadow-gold/20 transition hover:brightness-105 disabled:opacity-60"
            >
              {submitting ? "Signing in\u2026" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center font-plex text-[11px] text-paper/25">
          Restricted access &middot; Nuji administrators only
        </p>
      </div>
    </div>
  );
}
