import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, Headphones, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import heroImg from "@/assets/hero.jpg";
import { CATEGORIES, CATEGORY_IMAGES, buildWhatsAppLink, type Category, type Product } from "@/lib/products";
import { getProducts } from "@/lib/products.functions";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sally Global Mart — Appliances, Solar & Electrical in Minna" },
      { name: "description", content: "Fridges, ACs, TVs, generators, solar and electrical installation in Minna, Niger State. Order easily on WhatsApp." },
      { property: "og:title", content: "Sally Global Mart — Appliances, Solar & Electrical" },
      { property: "og:description", content: "Quality home appliances and installation services. Order on WhatsApp." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 60_000,
  });
  const products: Product[] = data?.products ?? [];
  const featured: Product[] = products.slice(0, 8);

  // Build category cards from actual products so images and labels always match the sheet.
  const categoryCards = CATEGORIES
    .map((cat): { name: Category; image: string; count: number } | null => {
      const items = products.filter((p) => p.category === cat);
      const sample = items[0];
      return sample ? { name: cat, image: sample.image, count: items.length } : null;
    })
    .filter((c): c is { name: Category; image: string; count: number } => c !== null);

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground animate-fade-in-up">
              <span className="h-px w-8 bg-gold" /> Premium home appliances
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] animate-fade-in-up animate-delay-100">
              The appliances<br />your home <span className="text-gold">deserves.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md animate-fade-in-up animate-delay-200">
              Carefully selected refrigerators, washers, ACs and TVs — built to last, designed to delight. Order in seconds via WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up animate-delay-300">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Shop all products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-gold hover:bg-gold-soft/40 transition-colors"
              >
                Talk to us
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
              <img src={heroImg} alt="Premium home appliances" width={1600} height={1100} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden sm:block rounded-2xl bg-background border border-border px-5 py-4 shadow-elegant">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Free delivery</p>
              <p className="text-sm font-medium">On orders over ₦500,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container-page py-16 md:py-24 border-t border-border/60">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Shop by category</h2>
            <p className="mt-2 text-muted-foreground">Everything for the modern home.</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-foreground hover:text-gold transition-colors">
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categoryCards.map((cat) => (
            <Link
              key={cat.name}
              to="/products"
              search={{ category: cat.name } as never}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-gold transition-colors"
            >
              <div className="aspect-[5/4] overflow-hidden bg-muted">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium block">{cat.name}</span>
                  <span className="text-xs text-muted-foreground">{cat.count} item{cat.count === 1 ? "" : "s"}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* Featured Products */}
      <section className="container-page py-16 md:py-24 border-t border-border/60">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Featured products</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked favorites this season.</p>
          </div>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Trust */}
      <section className="container-page py-16 md:py-24 border-t border-border/60">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: "Genuine products", body: "Every appliance comes with a full manufacturer warranty and authentic serial numbers." },
            { icon: Truck, title: "Delivery & installation", body: "Fast delivery across Minna and Niger State, with professional installation by our technicians." },
            { icon: Headphones, title: "Open every day", body: "We're open 6:00 AM – 10:00 PM, every single day — including weekends and public holidays." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border p-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/60">
                <Icon className="h-5 w-5 text-gold-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="container-page pb-24">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Order in seconds — chat with us on WhatsApp.</h2>
            <p className="mt-4 text-background/70">Tell us what you need. We'll confirm availability, pricing and delivery — instantly.</p>
          </div>
          <a
            href={buildWhatsAppLink("Hi! I'd like help choosing an appliance.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-7 py-3.5 text-sm font-semibold hover:bg-gold/90 transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> Message us now
          </a>
        </div>
      </section>
    </>
  );
}
