import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <img src={logo} alt="Sally Global Mart" className="h-8 w-8 rounded-full object-cover" />
            Sally Global Mart
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Home appliances, solar & electrical installations across Minna and Niger State.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Products</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 text-gold mt-0.5" /> +234 (0) 816 750 5201</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 text-gold mt-0.5 shrink-0" /> <span className="break-all">sallywise001globalenterprices@gmail.com</span></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" /> Gidan Gwanu, Along Lapai-Gwari Road, Bosso, Minna, Niger State</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Hours</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Open every day</li>
            <li>6:00 AM – 10:00 PM</li>
            <li>Including Saturday & Sunday</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-page py-6 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Sally Global Mart. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
