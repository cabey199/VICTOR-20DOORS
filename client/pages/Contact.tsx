import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <section className="container mx-auto py-16">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Name" required aria-label="Name" />
              <Input type="email" placeholder="Email" required aria-label="Email" />
              <Textarea placeholder="Message" aria-label="Message" />
              <Button type="submit">Send</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Addis Ababa showroom details and map will be embedded here.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
