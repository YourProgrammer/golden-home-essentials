import { useSyncExternalStore } from "react";
import type { CartLine, Product } from "./products";

const STORAGE_KEY = "sgm.cart.v1";

let lines: CartLine[] = load();
const listeners = new Set<() => void>();

function load(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* ignore */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return lines;
}

function getServerSnapshot(): CartLine[] {
  return [];
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function addToCart(product: Product, quantity = 1) {
  const existing = lines.find((l) => l.product.id === product.id);
  if (existing) {
    lines = lines.map((l) =>
      l.product.id === product.id ? { ...l, quantity: l.quantity + quantity } : l,
    );
  } else {
    lines = [...lines, { product, quantity }];
  }
  emit();
}

export function setQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  lines = lines.map((l) => (l.product.id === productId ? { ...l, quantity } : l));
  emit();
}

export function removeFromCart(productId: string) {
  lines = lines.filter((l) => l.product.id !== productId);
  emit();
}

export function clearCart() {
  lines = [];
  emit();
}
