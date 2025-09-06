import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type Language = "en" | "am";

type Dictionary = Record<string, { en: string; am: string }>;

const strings: Dictionary = {
  heroTitle: {
    en: "Secure Your Future with Ethiopia’s Trusted Doors & Elevators",
    am: "እንግዳ ደህንነትዎን በኢ��ዮጵያ የታማኝ ደረቶችና ኤሌቬተሮች ያግኙ",
  },
  exploreDoors: { en: "Explore Doors", am: "ደረቶችን ይመልከቱ" },
  discoverElevators: { en: "Discover Elevators", am: "ኤሌቬተሮችን ያግኙ" },
  requestQuote: { en: "Request Quote", am: "ጥራት ይጠይቁ" },
  featuredProducts: { en: "Featured Products", am: "የተለዩ ምርቶች" },
  trustTitle: {
    en: "Trusted by builders across Ethiopia",
    am: "በኢትዮጵያ ውስጥ በአብረተኛ ተቋማት የታመነ",
  },
  testimonials: { en: "What clients say", am: "የደንበኞች ምክር" },
  portfolio: { en: "Recent installations", am: "የቅርብ ጊዜ መጫኛዎች" },
};

type LangContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: keyof typeof strings) => string;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const t = useMemo(
    () => (key: keyof typeof strings) => {
      const entry = strings[key];
      return entry ? entry[lang] : "";
    },
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
