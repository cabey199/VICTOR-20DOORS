import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ShieldCheck, DoorOpen } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Victor Doors and Mona-Go Elevators home">
          <div className="h-9 w-9 rounded-md bg-brand-wood/20 ring-1 ring-brand-wood/30 grid place-items-center">
            <DoorOpen className="h-5 w-5 text-brand-wood" aria-hidden />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-lg">Victor Doors</p>
            <p className="text-xs text-muted-foreground">& Mona-Go Elevators PLC</p>
          </div>
        </Link>
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/admin", label: "Admin" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <a href="tel:+251941183695" aria-label="Call now +251 94 118 3695">
            <Button className="hidden sm:inline-flex bg-brand-primary hover:bg-brand-primary/90">
              <Phone className="h-4 w-4" aria-hidden />
              <span className="ml-2">Call Now</span>
            </Button>
          </a>
          <div className="ml-2 hidden md:flex items-center text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 mr-1 text-brand-metal" aria-hidden />
            KRC Authorized
          </div>
        </div>
      </div>
    </header>
  );
}
