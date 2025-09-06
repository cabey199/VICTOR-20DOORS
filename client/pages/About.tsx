import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, ShieldCheck, Award, DoorOpen } from "lucide-react";

export default function About() {
  return (
    <section className="container mx-auto py-16 space-y-12">
      <div className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 animate-float rounded-xl bg-brand-wood/20 ring-1 ring-brand-wood/30 grid place-items-center">
          <DoorOpen className="h-8 w-8 text-brand-wood" aria-hidden />
        </div>
        <h1 className="text-3xl font-extrabold">Security Meets Style</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Since 2015, Victor Doors and Mona-Go Elevators PLC has transformed spaces in Ethiopia with innovative, secure doors and KRC elevators.</p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l md:block" />
        <div className="space-y-8">
          {[
            { year: "2015", text: "Founded in Addis Ababa focusing on secure, wood-like iron doors." },
            { year: "2018", text: "Partnered with KRC elevators to expand into vertical transport." },
            { year: "2022", text: "500+ doors installed and numerous elevator projects completed." },
          ].map((item, i) => (
            <div key={item.year} className={`md:grid md:grid-cols-2 md:items-center ${i % 2 ? "md:text-left" : "md:text-right"}`}>
              <div className={`${i % 2 ? "md:order-2" : ""} p-4`}>
                <h3 className="font-bold">{item.year}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
              <div className="hidden md:block" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[{ name: "Behailu", role: "Sales Manager" }, { name: "Mekdes", role: "Operations" }, { name: "Abel", role: "Engineer" }].map((m) => (
          <Card key={m.name} className="transition hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <img src="https://images.pexels.com/photos/2564866/pexels-photo-2564866.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" alt={m.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
              <p className="mt-3 font-medium">{m.name}</p>
              <p className="text-sm text-muted-foreground">{m.role}</p>
              <p className="mt-3 text-sm">Committed to quality, trust, and innovation.</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-brand-metal" /> Quality</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Premium materials, expert craftsmanship, and rigorous testing.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BadgeCheck className="text-brand-metal" /> Trust</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Transparent pricing, warranties, and dependable support.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award className="text-brand-metal" /> Innovation</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">KRC partnership for modern, efficient elevators.</CardContent>
        </Card>
      </div>
    </section>
  );
}
