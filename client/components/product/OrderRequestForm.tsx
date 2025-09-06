import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/data/products";
import type { OrderRequestBody, OrderRequestResponse } from "@shared/api";
import { toast } from "@/components/ui/sonner";

export function OrderRequestForm({ product }: { product: Product }) {
  const [color, setColor] = useState<string>("");
  const [finish, setFinish] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [capacityKg, setCapacityKg] = useState<number | undefined>(
    product.capacityKg,
  );
  const [floors, setFloors] = useState<number | undefined>(product.floors);
  const [speedMs, setSpeedMs] = useState<number | undefined>(product.speedMs);
  const [quantity, setQuantity] = useState<number>(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferred, setPreferred] = useState<
    "phone" | "telegram" | "email" | undefined
  >("phone");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const isElevator = product.type === "elevator";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const body: OrderRequestBody = {
        productId: product.id,
        productTitle: product.title,
        productType: product.type,
        options: {
          color: color || undefined,
          finish: finish || undefined,
          size: size || undefined,
          capacityKg: isElevator ? capacityKg : undefined,
          floors: isElevator ? floors : undefined,
          speedMs: isElevator ? speedMs : undefined,
          quantity,
        },
        customer: {
          name,
          phone,
          email: email || undefined,
          preferredContact: preferred,
          city: city || undefined,
          address: address || undefined,
        },
        notes: notes || undefined,
      };

      const res = await fetch("/api/order-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to submit");
      const data: OrderRequestResponse = await res.json();
      toast.success("Request sent", {
        description: `Reference: ${data.reference}`,
      });
    } catch (err: any) {
      toast.error("Could not send request", {
        description: err?.message ?? "Please try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-3"
      aria-label="Order request form"
    >
      <div className="grid gap-3 md:grid-cols-2">
        {!isElevator && (
          <div>
            <Label htmlFor="color">Color</Label>
            <Select onValueChange={setColor}>
              <SelectTrigger id="color">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oak">Oak</SelectItem>
                <SelectItem value="walnut">Walnut</SelectItem>
                <SelectItem value="teak">Teak</SelectItem>
                <SelectItem value="black">Black</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {!isElevator && (
          <div>
            <Label htmlFor="finish">Finish</Label>
            <Select onValueChange={setFinish}>
              <SelectTrigger id="finish">
                <SelectValue placeholder="Select finish" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matte">Matte</SelectItem>
                <SelectItem value="glossy">Glossy</SelectItem>
                <SelectItem value="powder-coated">Powder-coated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {!isElevator && (
          <div className="md:col-span-2">
            <Label htmlFor="size">Size (e.g., 2.0 x 1.0 m)</Label>
            <Input
              id="size"
              placeholder="Enter custom size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
        )}
        {isElevator && (
          <>
            <div>
              <Label htmlFor="capacity">Capacity (kg)</Label>
              <Input
                id="capacity"
                type="number"
                value={capacityKg ?? ""}
                onChange={(e) =>
                  setCapacityKg(Number(e.target.value) || undefined)
                }
              />
            </div>
            <div>
              <Label htmlFor="floors">Floors</Label>
              <Input
                id="floors"
                type="number"
                value={floors ?? ""}
                onChange={(e) => setFloors(Number(e.target.value) || undefined)}
              />
            </div>
            <div>
              <Label htmlFor="speed">Speed (m/s)</Label>
              <Input
                id="speed"
                type="number"
                step="0.1"
                value={speedMs ?? ""}
                onChange={(e) =>
                  setSpeedMs(Number(e.target.value) || undefined)
                }
              />
            </div>
          </>
        )}
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value) || 1))
            }
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email (optional)</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="preferred">Preferred Contact</Label>
          <Select
            onValueChange={(v) => setPreferred(v as any)}
            value={preferred}
          >
            <SelectTrigger id="preferred">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="telegram">Telegram</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any special request"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Order Request"}
      </Button>
    </form>
  );
}
