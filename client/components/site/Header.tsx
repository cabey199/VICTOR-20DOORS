import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Phone, ShieldCheck, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" aria-hidden />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="px-4 py-6">
                <div className="mb-4 flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2Fdf279bbb46764701826c66a3a373d845?format=webp&width=256"
                    alt="Mona Go Elevator — Victory in Motion logo"
                    className="h-8 md:h-9 w-auto object-contain"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-2"
                >
                  {links.map((item) => (
                    <a
                      key={item.to}
                      href={item.to}
                      className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-6">
                  <a
                    href="tel:+251941183695"
                    aria-label="Call now +251 94 118 3695"
                  >
                    <Button className="w-full bg-brand-primary hover:bg-brand-primary/90">
                      <Phone className="h-4 w-4" aria-hidden />
                      <span className="ml-2">Call Now</span>
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <a
            href="/"
            className="flex items-center gap-2"
            aria-label="Mona Go Elevator — Victory in Motion home"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F2011eb17d4ef4e78b5785e909c9c2e55%2Fdf279bbb46764701826c66a3a373d845?format=webp&width=256"
              alt="Mona Go Elevator — Victory in Motion logo"
              className="h-8 md:h-9 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </a>
        </div>
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-6"
        >
          {links.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className={`text-sm font-medium transition-colors hover:text-primary text-muted-foreground`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="tel:+251941183695" aria-label="Call now +251 94 118 3695">
            <Button className="hidden sm:inline-flex bg-brand-primary hover:bg-brand-primary/90">
              <Phone className="h-4 w-4" aria-hidden />
              <span className="ml-2">Call Now</span>
            </Button>
          </a>
          <div className="ml-2 hidden md:flex items-center text-xs text-muted-foreground">
            <ShieldCheck
              className="h-4 w-4 mr-1 text-brand-metal"
              aria-hidden
            />
            KRC Authorized
          </div>
        </div>
      </div>
    </header>
  );
}
