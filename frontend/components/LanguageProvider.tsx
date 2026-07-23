"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  selectedLang: string | null;
  setSelectedLang: (lang: string | null) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  return (
    <LanguageContext.Provider value={{ selectedLang, setSelectedLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
