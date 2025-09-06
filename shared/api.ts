/*
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface DemoResponse {
  message: string;
}

export type OrderRequestBody = {
  productId: string;
  productTitle: string;
  productType: "door" | "elevator" | string;
  options: {
    color?: string;
    finish?: string;
    size?: string;
    capacityKg?: number;
    floors?: number;
    speedMs?: number;
    quantity?: number;
    other?: string;
  };
  customer: {
    name: string;
    phone: string;
    email?: string;
    preferredContact?: "phone" | "telegram" | "email";
    city?: string;
    address?: string;
  };
  notes?: string;
};

export type OrderRequestResponse = {
  success: true;
  reference: string;
};
