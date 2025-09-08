import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Contact() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productType, setProductType] = useState("doors");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 0) {
      setStep(1);
      return;
    }
    const res = await fetch("https://formspree.io/f/mgvlrrrl", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form: "contact",
        name,
        email,
        phone,
        productType,
        message,
      }),
    });
    if (res.ok) {
      toast({ title: "Thank you!", description: "Your message was sent successfully." });
      setSubmitted(true);
    } else {
      toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
    }
  }

  return (
    <section className="container mx-auto py-16">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              {!submitted ? (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="h-2 w-full overflow-hidden rounded bg-muted">
                    <div
                      className="h-full bg-brand-primary transition-all"
                      style={{ width: step === 0 ? "50%" : "100%" }}
                    />
                  </div>
                  {step === 0 ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        aria-label="Name"
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-label="Email"
                      />
                      <Input
                        name="phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        aria-label="Phone"
                      />
                      <Select
                        defaultValue={productType}
                        onValueChange={(v) => setProductType(v)}
                      >
                        <SelectTrigger aria-label="Product type">
                          <SelectValue placeholder="Product type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doors">Doors</SelectItem>
                          <SelectItem value="elevators">Elevators</SelectItem>
                        </SelectContent>
                      </Select>
                      <input
                        type="hidden"
                        name="productType"
                        value={productType}
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Textarea
                        name="message"
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        aria-label="Message"
                      />
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(0)}
                        >
                          Back
                        </Button>
                        <Button type="submit">Submit</Button>
                      </div>
                    </div>
                  )}
                  {step === 0 && (
                    <div className="flex justify-end">
                      <Button type="submit">Continue</Button>
                    </div>
                  )}
                </form>
              ) : (
                <div className="flex items-center gap-3 text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                  <p>Your message was sent successfully.</p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="q1">
                  <AccordionTrigger>
                    What’s the delivery time for doors?
                  </AccordionTrigger>
                  <AccordionContent>
                    Typically 25–30 days depending on finish and size.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger>
                    Do elevators include ARD/UPS?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, KRC elevators support ARD/UPS options for safety.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger>
                    Do you offer installation?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, professional installation is available in Addis Ababa
                    and beyond.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4">
                  <AccordionTrigger>Are doors fire-resistant?</AccordionTrigger>
                  <AccordionContent>
                    Selected models include fire-resistant cores and seals.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q5">
                  <AccordionTrigger>How do I request a quote?</AccordionTrigger>
                  <AccordionContent>
                    Use the Request Quote buttons on products or the form above.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visit Our Showroom</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-md">
                <iframe
                  title="Addis Ababa showroom map"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.2555902481147!2d38.7578!3d9.0108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85d9a3a0b1cd%3A0x0!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1680000000000"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <strong>Address:</strong> Addis Ababa, Ethiopia (demo)
                </p>
                <p>
                  <strong>Hours:</strong> Mon–Fri 9AM–6PM
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a className="text-primary" href="tel:+251941183695">
                    +251 94 118 3695
                  </a>
                  ,{" "}
                  <a className="text-primary" href="tel:+251991227010">
                    +251 99 122 7010
                  </a>
                </p>
                <p>
                  <strong>Telegram:</strong>{" "}
                  <a
                    className="text-primary"
                    href="https://t.me/victordoorplc"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @victordoorplc
                  </a>
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Addis+Ababa+Ethiopia"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  Get Directions
                </a>
                <a
                  href="tel:+251941183695"
                  className="rounded-md border px-3 py-2 hover:bg-accent"
                >
                  Call +251 94 118 3695
                </a>
                <a
                  href="tel:+251991227010"
                  className="rounded-md border px-3 py-2 hover:bg-accent"
                >
                  Call +251 99 122 7010
                </a>
                <a
                  href="https://t.me/victordoorplc"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border px-3 py-2 hover:bg-accent"
                >
                  Telegram
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border px-3 py-2 hover:bg-accent"
                >
                  Facebook
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
