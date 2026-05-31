import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Sun, Battery, Wrench, Zap, Wind, ShieldCheck } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/products";
import solarImg from "@/assets/services-solar.jpg";
import acInstallImg from "@/assets/services-ac-install.jpg";
import batteryImg from "@/assets/services-battery.jpg";
import electricalImg from "@/assets/services-electrical.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Solar, Appliance & Electrical Installation | Sally Global Mart" },
      { name: "description", content: "Solar panel installation, inverter & battery setup, AC and appliance installation, and general electrical works across Minna and Niger State." },
      { property: "og:title", content: "Services — Sally Global Mart" },
      { property: "og:description", content: "Solar, inverter, appliance installation and electrical works in Niger State." },
      { property: "og:image", content: solarImg },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Sun,
    title: "Solar panel installation",
    body: "Rooftop and ground-mount solar systems sized to your home or business — from a few panels to full off-grid arrays. We handle survey, mounting, wiring and commissioning.",
  },
  {
    icon: Battery,
    title: "Inverters & batteries",
    body: "Inverter sizing, battery banks (lithium and tubular), charge controllers and changeover setup so you stay on through every outage.",
  },
  {
    icon: Wind,
    title: "Air conditioner installation",
    body: "Split-unit AC mounting, copper piping, vacuum & gas charge, and post-install testing — done cleanly so your warranty stays intact.",
  },
  {
    icon: Wrench,
    title: "Appliance installation",
    body: "Fridges, freezers, washing machines, water dispensers, gas cylinders and TVs — delivered, mounted and tested in your home.",
  },
  {
    icon: Zap,
    title: "General electrical works",
    body: "Home and shop wiring, distribution boards, sockets, lighting, surge protection and fault diagnosis by qualified electricians.",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & repairs",
    body: "Servicing, fault finding and repair for solar, inverter and appliances we sell — and most other brands too.",
  },
];

function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px w-8 bg-gold" /> Our services
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              Solar, electrical &<br />appliance <span className="text-gold">installation.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Beyond selling appliances, Sally Global Mart installs and services them — plus full solar, inverter, battery and electrical setups across Minna and Niger State.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLink("Hi Sally Global Mart! I'd like a quote for installation services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> Request a quote
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
              <img
                src={solarImg}
                alt="Solar panel installation on a rooftop"
                width={1600}
                height={1100}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="container-page py-16 md:py-24 border-t border-border/60">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">What we offer</h2>
        <p className="mt-2 text-muted-foreground max-w-xl">From a single ceiling fan to a complete solar backup — our technicians handle it end-to-end.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border p-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/60">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="container-page py-16 md:py-24 border-t border-border/60">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Our team at work</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <img src={acInstallImg} alt="Technician installing a split-unit AC" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <img src={batteryImg} alt="Inverter battery and charge controller installation" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <img src={electricalImg} alt="Electrician doing wiring on a residential building" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Need an installation or a survey?</h2>
            <p className="mt-4 text-background/70">Tell us where you are and what you need. We'll send a technician and a quote.</p>
          </div>
          <a
            href={buildWhatsAppLink("Hi Sally Global Mart! I'd like to book an installation.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-7 py-3.5 text-sm font-semibold hover:bg-gold/90 transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> Book on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
