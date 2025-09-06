import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <section className="container mx-auto py-16">
      <Card>
        <CardHeader>
          <CardTitle>About Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A professional page with company story, team, values, and certifications will go here.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
