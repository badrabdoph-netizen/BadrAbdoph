import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Facebook, Sparkles, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, socialLinks, photographerInfo, ctaTexts, contactInfo } from "@/config/siteConfig";

const isExternal = (href: string) => /^https?:\/\//i.test(href);

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const setOffset = () => {
      const h = el.getBoundingClientRect().height;
      const extra = 16;
      document.documentElement.style.setProperty("--nav-offset", `${Math.ceil(h + extra)}px`);
    };

    setOffset();

    const ro = new ResizeObserver(() => setOffset());
    ro.observe(el);

    window.addEventListener("resize", setOffset);
    window.addEventListener("orientationchange", setOffset);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setOffset);
      window.removeEventListener("orientationchange", setOffset);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
    const b = photographerInfo.brandName?.replace(".", "") ?? "BADR";
    return `${b}.PH`;
  }, []);

  const telHref = `tel:${(contactInfo?.phone ?? "").replace(/\s/g, "")}`;

  return (
    <nav
      ref={navRef as any}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          : "bg-transparent"
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      aria-label="Main navigation"
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent pointer-events-none" />

      <div className={cn("container mx-auto px-4", scrolled ? "py-3" : "py-4")}>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold tracking-wider text-foreground hover:text-primary transition-colors flex items-center gap-2 tap-target"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span>{brandText.split(".")[0]}</span>
            <span className="text-primary">.</span>
            <span>PH</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-foreground/60 border border-white/10 px-2 py-1 ml-2">
              <Sparkles className="w-3 h-3 text-primary" />
              Luxury
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navLinks.map((link) => {
              const active = !isExternal(link.href) && location === link.href;

              if (isExternal(link.href)) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "text-sm font-medium tracking-wide transition-colors hover:text-primary relative group",
                      "text-foreground/80"
                    )}
                  >
                    {link.label}
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                );
              }

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

          {/* Desktop social + CTA */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors tap-target inline-flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors tap-target inline-flex items-center justify-center"
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

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            {telHref && telHref !== "tel:" ? (
              <a
                href={telHref}
                className="w-11 h-11 border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary transition-colors tap-target"
                aria-label="Call"
              >
                <Phone size={20} />
              </a>
            ) : null}

            <button
              className="w-11 h-11 border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary transition-colors tap-target"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0",
            "bg-background border-t border-white/10",
            "rounded-t-2xl",
            "transition-transform duration-300",
            isOpen ? "translate-y-0" : "translate-y-full"
          )}
          style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pt-3 pb-2 flex justify-center">
            <div className="w-12 h-1.5 rounded-full bg-white/10" />
          </div>

          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="text-right">
              <div className="text-sm text-foreground/80">القائمة</div>
              <div className="text-xs text-muted-foreground">اختر صفحة</div>
            </div>

            <button
              className="w-11 h-11 border border-white/10 bg-black/15 flex items-center justify-center text-foreground hover:text-primary transition-colors tap-target"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-4 pb-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = !isExternal(link.href) && location === link.href;

                if (isExternal(link.href)) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-4 border rounded-xl tap-target transition-colors",
                        "bg-black/10 border-white/10 text-foreground hover:border-primary/35 hover:text-primary"
                      )}
                    >
                      <span className="text-base font-semibold">{link.label}</span>
                      <ArrowLeft className="w-4 h-4 text-foreground/60" />
                    </a>
                  );
                }

                return (
                  <Link key={link.label} href={link.href}>
                    <a
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-4 border rounded-xl tap-target transition-colors",
                        active
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "bg-black/10 border-white/10 text-foreground hover:border-primary/35 hover:text-primary"
                      )}
                    >
                      <span className="text-base font-semibold">{link.label}</span>
                      <ArrowLeft className={cn("w-4 h-4", active ? "text-primary" : "text-foreground/60")} />
                    </a>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <Link href="/contact">
                <a className="w-full">
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-4 py-4 font-semibold tap-target">
                    {ctaTexts.bookNow}
                  </button>
                </a>
              </Link>
            </div>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              {photographerInfo.name} • {photographerInfo.title}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
