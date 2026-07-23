import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nuji - Teach AI to speak your language",
  description: "Not textbook Igbo. Not formal Yoruba. The way you actually talk. Every word you contribute helps build AI for 200M+ Nigerians.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Nav />
          <main className="min-h-screen bg-white font-sans text-slate-900 antialiased">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
