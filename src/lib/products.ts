import refrigerator from "@/assets/refrigerator.jpg";
import washingMachine from "@/assets/washing-machine.jpg";
import tv from "@/assets/tv.jpg";
import microwave from "@/assets/microwave.jpg";
import ac from "@/assets/ac.jpg";
import freezer from "@/assets/freezer.jpg";
import general from "@/assets/general.jpg";

export const CATEGORIES = [
  "Freezers",
  "Air Conditioners",
  "Flat Screen TVs",
  "Microwaves",
  "Washing Machines",
  "Refrigerators",
  "General Home Appliances",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_IMAGES: Record<Category, string> = {
  Freezers: freezer,
  "Air Conditioners": ac,
  "Flat Screen TVs": tv,
  Microwaves: microwave,
  "Washing Machines": washingMachine,
  Refrigerators: refrigerator,
  "General Home Appliances": general,
};

// Fallback image used when a sheet row has no image URL.
export const FALLBACK_PRODUCT_IMAGE = general;

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export const WHATSAPP_NUMBER = "1234567890";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(product: Product) {
  return `Hello! I'd like to order:\n\n• ${product.name}\n• Price: $${product.price.toLocaleString()}\n• Ref: ${product.id}\n\nIs this item available?`;
}
