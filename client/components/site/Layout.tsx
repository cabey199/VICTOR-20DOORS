import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { LangProvider } from "./LanguageContext";
import { MessageCircle } from "lucide-react";

export default function Layout() {
  return (
    <LangProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <a
          href="https://t.me/victordoorplc"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-primary-foreground shadow-lg transition hover:bg-brand-primary/90"
          aria-label="Open Telegram chat"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Chat</span>
        </a>
      </div>
    </LangProvider>
  );
}
