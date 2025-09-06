import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Admin() {
  return (
    <section className="container mx-auto py-16">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Secure dashboard with authentication, product management, image uploads, validation, and reports will be implemented next.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
