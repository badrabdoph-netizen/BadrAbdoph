import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, socialLinks, photographerInfo, ctaTexts } from "@/config/siteConfig";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        scrolled ? "bg-background/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-wider text-foreground hover:text-primary transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {photographerInfo.brandName.replace('.', '')}<span className="text-primary">.</span>PH
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 space-x-reverse">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary relative group",
                location === link.href ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full",
                location === link.href ? "w-full" : ""
              )}></span>
            </Link>
          ))}
        </div>

        {/* Social & CTA */}
        <div className="hidden md:flex items-center space-x-4 space-x-reverse">
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
            <Instagram size={20} />
          </a>
          <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
            <Facebook size={20} />
          </a>
          <Link href="/contact">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none px-6">
              {ctaTexts.bookNow}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center transition-all duration-500 md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
              style={{ fontFamily: "'Amiri', serif" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center space-x-6 space-x-reverse mt-8">
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
              <Instagram size={24} />
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
