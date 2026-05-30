import refrigerator from "@/assets/refrigerator.jpg";
import washingMachine from "@/assets/washing-machine.jpg";
import tv from "@/assets/tv.jpg";
import microwave from "@/assets/microwave.jpg";
import ac from "@/assets/ac.jpg";
import freezer from "@/assets/freezer.jpg";
import general from "@/assets/general.jpg";

export const CATEGORIES = [
  "Air Conditioner",
  "Air Fryer",
  "Bluetooth Speaker",
  "DC Standing Fan",
  "Freezer",
  "Fridge",
  "Gas Cylinder",
  "Generator",
  "Soundbar",
  "Standing Fan",
  "Television",
  "Washing Machine",
  "Water Dispenser",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_IMAGES: Record<Category, string> = {
  "Air Conditioner": ac,
  "Air Fryer": microwave,
  "Bluetooth Speaker": general,
  "DC Standing Fan": general,
  Freezer: freezer,
  Fridge: refrigerator,
  "Gas Cylinder": general,
  Generator: general,
  Soundbar: general,
  "Standing Fan": general,
  Television: tv,
  "Washing Machine": washingMachine,
  "Water Dispenser": general,
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
export const CURRENCY_SYMBOL = "₦";

export function formatPrice(price: number) {
  return `${CURRENCY_SYMBOL}${price.toLocaleString()}`;
}

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(product: Product) {
  return `Hello! I'd like to order:\n\n• ${product.name}\n• Price: ${formatPrice(product.price)}\n• Ref: ${product.id}\n\nIs this item available?`;
}
