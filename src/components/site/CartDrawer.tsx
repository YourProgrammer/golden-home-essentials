import { useState } from "react";
import { ShoppingBag, X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import {
  buildWhatsAppLink,
  cartOrderMessage,
  cartTotal,
  formatPrice,
} from "@/lib/products";
import { clearCart, removeFromCart, setQuantity, useCart } from "@/lib/cart";

export function CartButton({ onClick }: { onClick: () => void }) {
  const lines = useCart();
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  return (
    <button
      onClick={onClick}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-gold hover:bg-gold-soft/40 transition-colors"
      aria-label={`Cart (${count})`}
    >
      <ShoppingBag className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-gold-foreground text-[10px] font-semibold inline-flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lines = useCart();
  const total = cartTotal(lines);

  return (
    <>
      <div
        className={
          "fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm transition-opacity " +
          (open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
        onClick={onClose}
      />
      <aside
        className={
          "fixed top-0 right-0 z-[70] h-full w-full sm:max-w-md bg-background border-l border-border flex flex-col transition-transform duration-300 " +
          (open ? "translate-x-0" : "translate-x-full")
        }
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-base font-semibold">Your cart ({lines.length})</h2>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {lines.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center mt-12">
              Your cart is empty. Browse products and add items to order on WhatsApp.
            </p>
          ) : (
            lines.map((l) => (
              <div key={l.product.id} className="flex gap-3 border-b border-border/60 pb-4">
                <img
                  src={l.product.image}
                  alt={l.product.name}
                  className="h-20 w-20 rounded-xl object-cover bg-muted shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2">{l.product.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatPrice(l.product.price)}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button
                        onClick={() => setQuantity(l.product.id, l.quantity - 1)}
                        className="h-7 w-7 inline-flex items-center justify-center hover:bg-muted rounded-l-full"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-sm">{l.quantity}</span>
                      <button
                        onClick={() => setQuantity(l.product.id, l.quantity + 1)}
                        className="h-7 w-7 inline-flex items-center justify-center hover:bg-muted rounded-r-full"
                        aria-label="Increase"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(l.product.id)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-border p-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="text-base font-semibold">{formatPrice(total)}</span>
            </div>
            <a
              href={buildWhatsAppLink(cartOrderMessage(lines))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Checkout on WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="block w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Clear cart
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}

export function useCartDrawer() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
