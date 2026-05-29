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

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: "ref-01", name: "Side-by-Side Refrigerator 520L", category: "Refrigerators", price: 1899, description: "Frost-free dual cooling with smart inverter compressor.", image: refrigerator },
  { id: "ref-02", name: "Double Door Refrigerator 350L", category: "Refrigerators", price: 1199, description: "Energy efficient, fingerprint-resistant steel finish.", image: refrigerator },
  { id: "wm-01", name: "Front Load Washer 9kg", category: "Washing Machines", price: 1099, description: "Quiet inverter motor with steam care programs.", image: washingMachine },
  { id: "wm-02", name: "Top Load Washer 12kg", category: "Washing Machines", price: 849, description: "High capacity wash with smart sensor balancing.", image: washingMachine },
  { id: "tv-01", name: '65" 4K Ultra HD Smart TV', category: "Flat Screen TVs", price: 1299, description: "HDR10+ with slim bezel design and built-in apps.", image: tv },
  { id: "tv-02", name: '55" QLED Smart TV', category: "Flat Screen TVs", price: 999, description: "Quantum dot color with cinematic Dolby Audio.", image: tv },
  { id: "mw-01", name: "Stainless Microwave 30L", category: "Microwaves", price: 299, description: "Convection, grill and inverter for even cooking.", image: microwave },
  { id: "mw-02", name: "Compact Microwave 20L", category: "Microwaves", price: 179, description: "Quick-touch presets, perfect for small kitchens.", image: microwave },
  { id: "ac-01", name: "Split Inverter AC 1.5HP", category: "Air Conditioners", price: 749, description: "Whisper-quiet cooling with eco mode.", image: ac },
  { id: "ac-02", name: "Split Inverter AC 2.0HP", category: "Air Conditioners", price: 949, description: "Powerful cooling for large rooms, R32 refrigerant.", image: ac },
  { id: "fz-01", name: "Chest Freezer 300L", category: "Freezers", price: 699, description: "Deep freeze with energy-saving insulation.", image: freezer },
  { id: "fz-02", name: "Upright Freezer 220L", category: "Freezers", price: 599, description: "No-frost convenience with adjustable shelves.", image: freezer },
  { id: "gn-01", name: "Premium Blender Set", category: "General Home Appliances", price: 149, description: "Multi-jar blender, grinder, and juicer in one.", image: general },
  { id: "gn-02", name: "Electric Kettle 1.7L", category: "General Home Appliances", price: 59, description: "Fast boil with auto shut-off and cool-touch body.", image: general },
];

export const WHATSAPP_NUMBER = "1234567890";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(product: Product) {
  return `Hello! I'd like to order:\n\n• ${product.name}\n• Price: $${product.price.toLocaleString()}\n• Ref: ${product.id}\n\nIs this item available?`;
}
