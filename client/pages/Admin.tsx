import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoProducts, Product } from "@/data/products";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Download,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
} from "lucide-react";

function useLocalProducts() {
  const [items, setItems] = useState<Product[]>(() => {
    const raw = localStorage.getItem("vdme.products");
    return raw ? (JSON.parse(raw) as Product[]) : demoProducts;
  });
  useEffect(() => {
    localStorage.setItem("vdme.products", JSON.stringify(items));
  }, [items]);
  return [items, setItems] as const;
}

function exportCSV(rows: Product[]) {
  const headers = [
    "id",
    "type",
    "title",
    "available",
    "priceETBPerM2",
    "capacityKg",
    "speedMs",
    "floors",
    "specs",
    "features",
  ];
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.id,
        r.type,
        r.title,
        r.available,
        r.priceETBPerM2 ?? "",
        r.capacityKg ?? "",
        r.speedMs ?? "",
        r.floors ?? "",
        JSON.stringify(r.specs),
        JSON.stringify(r.features),
      ].join(","),
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "inventory.csv";
  a.click();
}

export default function Admin() {
  const DEMO_USER = "admin";
  const DEMO_PASS = "admin123";
  const DEMO_2FA = "000000"; // optional

  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("vdme.authed") === "1",
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useLocalProducts();

  const stats = useMemo(() => {
    const total = items.length;
    const sold = items.filter((i) => !i.available).length;
    const available = total - sold;
    return { total, sold, available };
  }, [items]);

  if (!authed) {
    return (
      <section className="container mx-auto py-16 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  username === DEMO_USER &&
                  password === DEMO_PASS &&
                  (code === "" || code === DEMO_2FA)
                ) {
                  sessionStorage.setItem("vdme.authed", "1");
                  setAuthed(true);
                  setError(null);
                } else {
                  setError("Invalid credentials");
                }
              }}
            >
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                placeholder="2FA Code (000000 demo)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {error && <div className="text-sm text-red-600">{error}</div>}
              <div className="flex justify-between">
                <Button type="submit">Login</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setUsername("");
                    setPassword("");
                    setCode("");
                    setError(null);
                  }}
                >
                  Reset
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                Demo credentials — Username: <code>{DEMO_USER}</code>, Password:{" "}
                <code>{DEMO_PASS}</code>, 2FA: <code>{DEMO_2FA}</code>{" "}
                (optional)
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportCSV(items)}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              sessionStorage.removeItem("vdme.authed");
              location.reload();
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Products", value: stats.total },
          { label: "Available", value: stats.available },
          { label: "Sold Out", value: stats.sold },
        ].map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardTitle className="text-base">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{s.value}</CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="doors">Doors</TabsTrigger>
                <TabsTrigger value="elevators">Elevators</TabsTrigger>
              </TabsList>
              {["all", "door", "elevator"].map((t, idx) => (
                <TabsContent key={t} value={idx === 0 ? "all" : t + "s"}>
                  <div className="grid gap-4 md:grid-cols-2">
                    {items
                      .filter((i) => (idx === 0 ? true : i.type === t))
                      .map((i) => (
                        <div
                          key={i.id}
                          className="relative rounded-lg border p-4 transition hover:shadow-sm"
                        >
                          <div className="flex gap-4">
                            <img
                              src={i.images[0]}
                              alt={i.title}
                              className="h-24 w-24 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{i.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {i.specs.join(" · ")}
                              </p>
                              <div className="mt-2 flex items-center gap-3">
                                <Switch
                                  checked={i.available}
                                  onCheckedChange={(v) =>
                                    setItems(
                                      items.map((p) =>
                                        p.id === i.id
                                          ? { ...p, available: Boolean(v) }
                                          : p,
                                      ),
                                    )
                                  }
                                />
                                <span className="text-xs">
                                  {i.available ? "Available" : "Sold Out"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end gap-2">
                            <EditDialog
                              product={i}
                              onSave={(p) =>
                                setItems(
                                  items.map((it) => (it.id === p.id ? p : it)),
                                )
                              }
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                setItems(items.filter((p) => p.id !== i.id))
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateForm onCreate={(p) => setItems([p, ...items])} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Last 6 months activity (demo)</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { m: "Apr", v: 10 },
                { m: "May", v: 14 },
                { m: "Jun", v: 18 },
                { m: "Jul", v: 16 },
                { m: "Aug", v: 20 },
                { m: "Sep", v: 24 },
              ]}
            >
              <defs>
                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--brand-primary))"
                    stopOpacity={0.6}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--brand-primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="v"
                stroke="hsl(var(--brand-primary))"
                fill="url(#g)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
}

function CreateForm({ onCreate }: { onCreate: (p: Product) => void }) {
  const [type, setType] = useState<Product["type"]>("door");
  const [title, setTitle] = useState("");
  const [specs, setSpecs] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [speed, setSpeed] = useState<number | "">("");
  const [floors, setFloors] = useState<number | "">("");
  const [images, setImages] = useState<string[]>([]);
  const [available, setAvailable] = useState(true);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((f) => {
      const url = URL.createObjectURL(f);
      setImages((prev) => [...prev, url]);
    });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const p: Product = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      images: images.length
        ? images
        : [
            type === "door"
              ? "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop"
              : "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d39?q=80&w=1200&auto=format&fit=crop",
          ],
      specs: specs
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      features: features
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      priceETBPerM2:
        type === "door"
          ? typeof price === "number"
            ? price
            : undefined
          : undefined,
      capacityKg:
        type === "elevator"
          ? typeof capacity === "number"
            ? capacity
            : undefined
          : undefined,
      speedMs:
        type === "elevator"
          ? typeof speed === "number"
            ? speed
            : undefined
          : undefined,
      floors:
        type === "elevator"
          ? typeof floors === "number"
            ? floors
            : undefined
          : undefined,
      available,
    };
    onCreate(p);
    setTitle("");
    setSpecs("");
    setFeatures("");
    setImages([]);
    setPrice("");
    setCapacity("");
    setSpeed("");
    setFloors("");
  }

  return (
    <form className="space-y-3" onSubmit={submit}>
      <Label>Type</Label>
      <Select value={type} onValueChange={(v) => setType(v as Product["type"])}>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="door">Door</SelectItem>
          <SelectItem value="elevator">Elevator</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {type === "door" && (
        <Input
          type="number"
          placeholder="Price (ETB/m²)"
          value={price as any}
          onChange={(e) =>
            setPrice(e.target.value ? Number(e.target.value) : "")
          }
        />
      )}
      {type === "elevator" && (
        <div className="grid gap-2 md:grid-cols-3">
          <Input
            type="number"
            placeholder="Capacity (kg)"
            value={capacity as any}
            onChange={(e) =>
              setCapacity(e.target.value ? Number(e.target.value) : "")
            }
          />
          <Input
            type="number"
            step="0.1"
            placeholder="Speed (m/s)"
            value={speed as any}
            onChange={(e) =>
              setSpeed(e.target.value ? Number(e.target.value) : "")
            }
          />
          <Input
            type="number"
            placeholder="Floors"
            value={floors as any}
            onChange={(e) =>
              setFloors(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
      )}
      <Textarea
        placeholder="Specs (comma separated)"
        value={specs}
        onChange={(e) => setSpecs(e.target.value)}
      />
      <Textarea
        placeholder="Features (comma separated)"
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
      />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="rounded-md border p-4 text-center text-sm text-muted-foreground"
        aria-label="Drag images here"
      >
        <ImageIcon className="mx-auto mb-2 h-6 w-6 opacity-60" />
        Drag & drop images here, or use the file input
        <input
          className="mt-2 block w-full"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            files.forEach((f) =>
              setImages((prev) => [...prev, URL.createObjectURL(f)]),
            );
          }}
        />
        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Upload preview"
                className="h-16 w-full rounded object-cover"
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={available}
          onCheckedChange={(v) => setAvailable(Boolean(v))}
        />
        <span className="text-sm">Available</span>
      </div>
      <Button type="submit" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Product
      </Button>
    </form>
  );
}

function EditDialog({
  product,
  onSave,
}: {
  product: Product;
  onSave: (p: Product) => void;
}) {
  const [title, setTitle] = useState(product.title);
  const [available, setAvailable] = useState(product.available);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Edit3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="flex items-center gap-2">
            <Switch
              checked={available}
              onCheckedChange={(v) => setAvailable(Boolean(v))}
            />
            <span className="text-sm">Available</span>
          </div>
          <Button onClick={() => onSave({ ...product, title, available })}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
