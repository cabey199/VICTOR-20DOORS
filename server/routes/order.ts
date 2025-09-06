import type { RequestHandler } from "express";
import { z } from "zod";
import type { OrderRequestBody, OrderRequestResponse } from "@shared/api";

const OrderSchema = z.object({
  productId: z.string().min(1),
  productTitle: z.string().min(1),
  productType: z.string().min(1),
  options: z
    .object({
      color: z.string().optional(),
      finish: z.string().optional(),
      size: z.string().optional(),
      capacityKg: z.number().optional(),
      floors: z.number().optional(),
      speedMs: z.number().optional(),
      quantity: z.number().int().positive().max(1000).optional(),
      other: z.string().optional(),
    })
    .default({}),
  customer: z.object({
    name: z.string().min(2),
    phone: z.string().min(7),
    email: z.string().email().optional(),
    preferredContact: z.enum(["phone", "telegram", "email"]).optional(),
    city: z.string().optional(),
    address: z.string().optional(),
  }),
  notes: z.string().optional(),
});

export const handleOrderRequest: RequestHandler = (req, res) => {
  const parse = OrderSchema.safeParse(req.body as OrderRequestBody);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid order request", issues: parse.error.issues });
  }

  const data = parse.data;
  // In a real app, persist to DB or send email/notification here.
  // For now, log and return a reference id.
  const reference = `ORD-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
  // eslint-disable-next-line no-console
  console.log("Order Request:", { reference, ...data });

  const response: OrderRequestResponse = { success: true, reference };
  res.status(200).json(response);
};
