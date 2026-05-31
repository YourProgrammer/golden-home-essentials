import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sally Global Mart" },
      { name: "description", content: "Reach Sally Global Mart in Minna, Niger State via WhatsApp, phone, or email. Open every day 6am–10pm." },
      { property: "og:title", content: "Contact — Sally Global Mart" },
      { property: "og:description", content: "Get in touch with our team in Minna, Niger State." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <header className="max-w-2xl">
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-8 bg-gold" /> Contact
        </span>
        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">We're here to help.</h1>
        <p className="mt-4 text-muted-foreground">The fastest way to reach us is WhatsApp — usually a response in minutes.</p>
      </header>

      <div className="mt-12 grid lg:grid-cols-3 gap-8">
        {/* Primary CTA */}
        <a
          href={buildWhatsAppLink("Hi Sally Global Mart! I'd like some help.")}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:col-span-2 rounded-3xl bg-foreground text-background p-10 md:p-14 flex flex-col justify-between min-h-[280px] hover:bg-foreground/95 transition-colors"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-gold-foreground">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div className="mt-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Chat on WhatsApp</h2>
            <p className="mt-2 text-background/70 max-w-md">Tap to start a conversation. Tell us what you need — we'll handle the rest.</p>
            <p className="mt-6 text-sm font-medium text-gold">Open WhatsApp →</p>
          </div>
        </a>

        {/* Details */}
        <div className="rounded-3xl border border-border p-8 space-y-6">
          <Detail icon={Phone} label="Call us" value="+234 (0) 816 750 5201" />
          <Detail icon={Mail} label="Email" value="sallywise001globalenterprices@gmail.com" />
          <Detail icon={MapPin} label="Store address" value="Gidan Gwanu, Along Lapai-Gwari Road, Bosso, Minna, Niger State" />
          <Detail icon={Clock} label="Hours" value="Every day, 6:00 AM – 10:00 PM" />
        </div>
      </div>

      {/* Quick categories */}
      <section className="mt-16">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Order directly</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Fridges", "Air Conditioners", "Televisions", "Washing Machines", "Generators", "Freezers", "Solar installation"].map((c) => (
            <a
              key={c}
              href={buildWhatsAppLink(`Hi Sally Global Mart! I'm interested in ${c}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-2 text-sm hover:border-gold hover:bg-gold-soft/40 transition-colors"
            >
              {c}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-soft/60 shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-medium break-words">{value}</p>
      </div>
    </div>
  );
}
