import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Leaf, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Lumen Appliances" },
      { name: "description", content: "We curate premium home appliances built to last — and back them with honest, friendly service." },
      { property: "og:title", content: "About — Lumen Appliances" },
      { property: "og:description", content: "Premium home appliances, honest service." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <header className="max-w-3xl">
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-8 bg-gold" /> About us
        </span>
        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">Appliances chosen with care, delivered with pride.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Lumen is a family-run home appliance store. We believe great appliances should be reliable, energy-efficient, and beautifully made — at a fair price. Every product on our shelf is one we'd put in our own home.
        </p>
      </header>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: Sparkles, title: "Curated quality", body: "We work only with brands proven to last. No clutter, no gimmicks — just the best in each category." },
          { icon: Leaf, title: "Energy-conscious", body: "We prioritize inverter and energy-rated models that lower bills and reduce impact." },
          { icon: HeartHandshake, title: "Honest service", body: "From advice to after-sales, we treat every customer like a neighbor — because most of them are." },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-border p-8">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/60">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <section className="mt-24 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Our story</h2>
        </div>
        <div className="space-y-5 text-muted-foreground">
          <p>What started as a small showroom has grown into a trusted destination for premium home appliances. We've kept the same simple promise: pick the right product, deliver it on time, and stand behind it.</p>
          <p>Our team helps you choose what actually fits your home and your life — not what we need to clear from the warehouse. If we wouldn't recommend it to family, we don't sell it.</p>
          <p>When you order, you reach a real person on WhatsApp who can answer questions, confirm stock and schedule delivery — usually within minutes.</p>
        </div>
      </section>
    </div>
  );
}
