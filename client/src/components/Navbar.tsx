import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Facebook, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, socialLinks, photographerInfo, ctaTexts } from "@/config/siteConfig";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // smooth scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // lock body scroll when menu open (mobile)
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const brandText = useMemo(() => {
    // keep your style, but ensure consistent output
    const b = photographerInfo.brandName?.replace(".", "") ?? "BADR";
    return `${b}.PH`;
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        scrolled
          ? "bg-background/80 backdrop-blur-md py-4 border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          : "bg-transparent py-6"
      )}
      aria-label="Main navigation"
    >
      {/* subtle bottom glow line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-wider text-foreground hover:text-primary transition-colors flex items-center gap-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span>{brandText.split(".")[0]}</span>
          <span className="text-primary">.</span>
          <span>PH</span>

          {/* tiny premium mark */}
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-foreground/60 border border-white/10 px-2 py-1 ml-2">
            <Sparkles className="w-3 h-3 text-primary" />
            Luxury
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 space-x-reverse">
          {navLinks.map((link) => {
            const active = location === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-primary relative group",
                  active ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full",
                    active ? "w-full" : ""
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Social & CTA */}
        <div className="hidden md:flex items-center space-x-4 space-x-reverse">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>

          <Link href="/contact">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none px-6"
            >
              {ctaTexts.bookNow}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        {/* background */}
        <div
          className={cn(
            "absolute inset-0 bg-background/95 backdrop-blur-xl",
            "transition-opacity duration-500"
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* panel */}
        <div
          className={cn(
            "relative h-full w-full flex flex-col justify-center items-center",
            "transition-transform duration-500",
            isOpen ? "translate-y-0" : "translate-y-6"
          )}
        >
          <div className="absolute top-6 right-6">
            <button
              className="w-11 h-11 border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-2xl font-medium transition-colors font-heading",
                    active ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-6 h-px w-52 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="flex items-center space-x-6 space-x-reverse mt-8">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-foreground/70 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-foreground/70 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
            </div>

            <Link href="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-6 text-lg mt-4">
                {ctaTexts.bookNow}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
