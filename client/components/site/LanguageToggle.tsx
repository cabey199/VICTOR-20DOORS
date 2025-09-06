import { Button } from "@/components/ui/button";
import { useLang } from "./LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language selection"
      className="inline-flex rounded-md border border-input overflow-hidden"
    >
      <Button
        variant={lang === "en" ? "default" : "ghost"}
        className="px-3"
        onClick={() => setLang("en")}
      >
        EN
      </Button>
      <Button
        variant={lang === "am" ? "default" : "ghost"}
        className="px-3"
        onClick={() => setLang("am")}
      >
        አማ
      </Button>
    </div>
  );
}
