import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Products() {
  return (
    <section className="container mx-auto py-16">
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            This page will showcase doors and elevators with filters, comparisons, and more. Tell me to flesh this out next.
          </p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
