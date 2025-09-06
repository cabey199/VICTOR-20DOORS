import { Facebook, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="container mx-auto py-10 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-bold text-lg">Victor Doors</p>
          <p className="text-xs text-muted-foreground">& Mona-Go Elevators PLC</p>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">Premium secure wood-like iron doors and KRC elevators for homes and businesses in Ethiopia.</p>
        </div>
        <div>
          <p className="font-semibold mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm" aria-label="Footer quick links">
            <li><a className="hover:text-primary" href="/products">Products</a></li>
            <li><a className="hover:text-primary" href="/about">About</a></li>
            <li><a className="hover:text-primary" href="/contact">Contact</a></li>
            <li><a className="hover:text-primary" href="/admin">Admin</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>Phone: <a className="text-primary" href="tel:+251941183695">+251 94 118 3695</a></li>
            <li>Phone: <a className="text-primary" href="tel:+251991227010">+251 99 122 7010</a></li>
            <li className="flex items-center gap-2"><Send className="h-4 w-4" aria-hidden /><a className="text-primary" href="https://t.me/victordoorplc" target="_blank" rel="noreferrer" aria-label="Telegram">Telegram</a></li>
            <li className="flex items-center gap-2"><Facebook className="h-4 w-4" aria-hidden /><a className="text-primary" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-xs text-center text-muted-foreground">
        © {new Date().getFullYear()} Victor Doors & Mona-Go Elevators PLC. All rights reserved.
      </div>
    </footer>
  );
}
