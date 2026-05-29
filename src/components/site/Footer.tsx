import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            Lumen Appliances
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Premium home appliances, curated for modern living.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Products</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +1 (234) 567-890</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> hello@lumen.store</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> 12 Market Street</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Hours</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Mon – Fri: 9:00 – 19:00</li>
            <li>Saturday: 10:00 – 17:00</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-page py-6 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Lumen Appliances. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
