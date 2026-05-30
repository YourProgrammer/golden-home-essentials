import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CATEGORIES, type Category, type Product } from "@/lib/products";
import { getProducts } from "@/lib/products.functions";
import { ProductCard } from "@/components/site/ProductCard";
import { z } from "zod";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/products")({
  validateSearch: searchSchema,
  loader: () => getProducts(),
  head: () => ({
    meta: [
      { title: "Products — Lumen Appliances" },
      { name: "description", content: "Browse premium home appliances: refrigerators, washers, ACs, TVs and more." },
      { property: "og:title", content: "Products — Lumen Appliances" },
      { property: "og:description", content: "Browse premium home appliances." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const search = Route.useSearch();
  const initialData = Route.useLoaderData();
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    initialData,
    staleTime: 60_000,
  });

  const products: Product[] = data?.products ?? [];
  const error = data?.error ?? null;

  const initial = (search.category as Category | undefined) ?? "All";
  const [active, setActive] = useState<Category | "All">(initial);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (active !== "All" && p.category !== active) return false;
      if (query && !`${p.name} ${p.description} ${p.category}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [products, active, query]);

  return (
    <div className="container-page py-16 md:py-24">
      <header className="max-w-2xl">
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-8 bg-gold" /> All products
        </span>
        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">Premium appliances, curated.</h1>
        <p className="mt-4 text-muted-foreground">Filter by category or search by name. Tap any product to order on WhatsApp.</p>
      </header>

      {error && (
        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="mt-10 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={
                "rounded-full border px-4 py-2 text-sm transition-colors " +
                (isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:border-gold hover:bg-gold-soft/40")
              }
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          {products.length === 0 && !error
            ? "No products yet. Add rows to your Google Sheet."
            : "No products match your search."}
        </p>
      ) : (
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
