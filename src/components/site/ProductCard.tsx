import { ArrowUpRight } from "lucide-react";
import { type Product, buildWhatsAppLink, formatPrice, orderMessage } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-muted aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 text-base font-medium text-foreground">{product.name}</h3>
        </div>
        <p className="text-base font-semibold whitespace-nowrap">{formatPrice(product.price)}</p>
      </div>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      <a
        href={buildWhatsAppLink(orderMessage(product))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-between rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold hover:bg-gold-soft/40"
      >
        Order on WhatsApp
        <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </article>
  );
}
