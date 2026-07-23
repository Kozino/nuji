import type { Metadata } from "next";
import { Inter, Zilla_Slab } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const zillaSlab = Zilla_Slab({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-zilla" });

export const metadata: Metadata = {
  title: "Nuji - Teach AI to speak your language",
  description: "A free, open platform for community-led data creation. Contribute your voice to build AI for 200M+ Nigerians.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${zillaSlab.variable}`}>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased">
        <LanguageProvider>
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
